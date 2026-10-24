/**
 * Moteur principal : niveau de vérification, coût total, Update Service, délai.
 * TypeScript pur, sans dépendance ; toutes les valeurs viennent de data/*.json (sources OGL v3).
 * Le site affiche un niveau « indicatif » : l'organisme recruteur décide (guide d'éligibilité DBS).
 */
import FEES from '../../data/fees.json';
import PERF from '../../data/performance.json';
import POLICE from '../../data/police-performance.json';
import ROLES from '../../data/roles.json';

export type Nation = 'england' | 'wales' | 'scotland' | 'northern-ireland';
export type Level = 'basic' | 'standard' | 'enhanced' | 'enhanced-cbl' | 'enhanced-abl' | 'enhanced-both';
export type Workforce = 'child' | 'adult' | 'both' | 'other';

export const VAT = FEES.vatRate;
const ew = Object.fromEntries(FEES.englandWales.products.map((p) => [p.id, p]));
const sc = Object.fromEntries(FEES.scotland.products.map((p) => [p.id, p]));
const ni = Object.fromEntries(FEES.northernIreland.products.map((p) => [p.id, p]));

/** Organisme compétent selon la nation (lieu du poste). */
export function body(n: Nation): string {
  return n === 'scotland' ? FEES.scotland.body : n === 'northern-ireland' ? FEES.northernIreland.body : FEES.englandWales.body;
}

export interface FeeQuery {
  nation: Nation;
  level: Level;
  volunteer?: boolean;
  /** Date de la demande (AAAA-MM-JJ) : le barème E&W change le 2026-10-05. */
  date?: string;
  /** Écosse : demande d'adhésion PVG (première fois) ou membre existant. */
  pvg?: 'join' | 'existing' | 'none';
  /** Écosse : nouveau poste en soins sociaux commissionnés (dérogation 1/8/2026 – 31/7/2027). */
  socialCareNewRole?: boolean;
  /** E&W : service Adult First (ajouté à un enhanced avec liste des adultes). */
  adultFirst?: boolean;
}

export interface Fee { fee: number; product: string; body: string; source: string; note?: string }

/** Barème E&W en vigueur à une date donnée. */
export function ewSchedule(date = '2026-10-24') {
  if (date >= FEES.englandWales.effectiveFrom)
    return { basic: ew.basic.fee, standard: ew.standard.fee, enhanced: ew.enhanced.fee, updateService: FEES.englandWales.updateService.feePerYear, legalBasis: FEES.englandWales.legalBasis };
  const h = FEES.englandWales.history.find((x) => (x.from === null || date >= x.from) && date <= x.to);
  if (!h) throw new Error('date hors barème : ' + date);
  return { basic: h.basic, standard: h.standard, enhanced: h.enhanced, updateService: h.updateService, legalBasis: h.legalBasis };
}

export function officialFee(q: FeeQuery): Fee {
  const enhanced = q.level.startsWith('enhanced');
  if (q.nation === 'scotland') {
    if (q.level === 'basic') return { fee: sc['level-1'].fee, product: 'Level 1 disclosure', body: body(q.nation), source: FEES.scotland.source };
    const pvg = q.pvg ?? (q.level === 'enhanced-cbl' || q.level === 'enhanced-abl' || q.level === 'enhanced-both' ? 'join' : 'none');
    if (pvg !== 'none') {
      const d = q.date ?? '2026-10-24';
      const w = FEES.scotland.socialCareWaiver;
      if (q.volunteer) return { fee: 0, product: 'PVG scheme (volunteer)', body: body(q.nation), source: FEES.scotland.source, note: 'qualifying voluntary organisation' };
      if (q.socialCareNewRole && d >= w.from && d <= w.to) return { fee: 0, product: 'PVG scheme (social care waiver)', body: body(q.nation), source: w.source };
      const p = pvg === 'join' ? sc['pvg-join'] : sc['pvg-existing'];
      return { fee: p.fee, product: p.label!, body: body(q.nation), source: FEES.scotland.source };
    }
    return { fee: sc['level-2'].fee, product: 'Level 2 disclosure', body: body(q.nation), source: FEES.scotland.source };
  }
  if (q.nation === 'northern-ireland') {
    const p = q.level === 'basic' ? ni.basic : q.level === 'standard' ? ni.standard : ni.enhanced;
    const free = q.volunteer && p.volunteerFree;
    return { fee: free ? 0 : p.fee, product: `AccessNI ${p.id} check`, body: body(q.nation), source: FEES.northernIreland.source };
  }
  const s = ewSchedule(q.date);
  const base = q.level === 'basic' ? s.basic : q.level === 'standard' ? s.standard : s.enhanced;
  const free = q.volunteer && q.level !== 'basic';
  let fee = free ? 0 : base;
  if (q.adultFirst && (q.level === 'enhanced-abl' || q.level === 'enhanced-both')) fee += ew['adult-first'].fee;
  return { fee, product: enhanced ? 'Enhanced DBS check' : q.level === 'standard' ? 'Standard DBS check' : 'Basic DBS check', body: body(q.nation), source: FEES.englandWales.source };
}

export interface CostQuery extends FeeQuery {
  /** Frais de l'intermédiaire saisis par l'utilisateur (£). */
  adminFee?: number;
  /** Le montant saisi est-il hors TVA ? (TVA 20 % ajoutée sur les seuls frais). */
  adminFeeExVat?: boolean;
  /** Ajouter l'abonnement Update Service pour n années (E&W, standard/enhanced). */
  updateYears?: number;
}

export interface Cost { official: number; admin: number; vat: number; update: number; total: number; lines: { label: string; amount: number }[] }

const r2 = (x: number) => Math.round(x * 100) / 100;

export function totalCost(q: CostQuery): Cost {
  if ((q.adminFee ?? 0) < 0) throw new RangeError('frais négatifs');
  const f = officialFee(q);
  const admin = q.adminFee ?? 0;
  const vat = q.adminFeeExVat ? r2(admin * VAT) : 0;
  const update = updateServiceCost(q.nation, q.level, q.updateYears ?? 0, q.volunteer);
  const lines = [{ label: f.product, amount: f.fee }];
  if (admin) lines.push({ label: 'Intermediary admin fee', amount: admin });
  if (vat) lines.push({ label: 'VAT on the admin fee (20%)', amount: vat });
  if (update) lines.push({ label: 'Update Service subscription', amount: update });
  return { official: f.fee, admin, vat, update, total: r2(f.fee + admin + vat + update), lines };
}

/** Update Service : Angleterre et pays de Galles seulement, certificats standard ou enhanced. */
export function updateServiceCost(n: Nation, level: Level, years: number, volunteer = false): number {
  if (!years || n === 'scotland' || n === 'northern-ireland' || level === 'basic') return 0;
  if (!Number.isInteger(years) || years < 0) throw new RangeError('années entières');
  return volunteer ? 0 : years * FEES.englandWales.updateService.feePerYear;
}

/**
 * « Abonnement ou nouvelle vérification ? » : coût sur `years` années selon le nombre de nouvelles
 * vérifications qu'on aurait payées (changement d'employeur, de client), frais d'intermédiaire compris.
 */
export function updateVsNewChecks(level: Level, years: number, newChecksPerYear: number, adminFee = 0) {
  const per = officialFee({ nation: 'england', level }).fee + adminFee;
  if (newChecksPerYear < 0 || years < 0) throw new RangeError('valeurs négatives');
  const withUpdate = per + updateServiceCost('england', level, years);
  const withoutUpdate = per + per * Math.round(newChecksPerYear * years);
  return { withUpdate: r2(withUpdate), withoutUpdate: r2(withoutUpdate), saving: r2(withoutUpdate - withUpdate) };
}

/** Délai de l'abonnement : inscription possible dans les 30 jours suivant la date du certificat. */
export function updateDeadline(issueDate: string): string {
  const d = new Date(issueDate + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + FEES.englandWales.updateService.joinWithinDaysOfIssue);
  return d.toISOString().slice(0, 10);
}

// ---------------------------------------------------------------- éligibilité

export interface Answers {
  workforce: Workforce;
  /** Activité réglementée avec des enfants (enseigner, encadrer, conseiller, conduire, modérer). */
  childActivity?: boolean;
  /** Plus de 3 jours sur 30, ou une nuit entre 2 h et 6 h. */
  childFrequent?: boolean;
  /** Soins de santé ou personnels à un enfant (une fois suffit). */
  childCare?: boolean;
  /** Établissement spécifié (école, crèche, foyer…) avec contact, non temporaire. */
  childEstablishment?: boolean;
  /** Activité réglementée avec des adultes (soins, soins personnels, travail social, argent, transport). */
  adultActivity?: boolean;
  /** Rôle listé (identifiant de data/roles.json). */
  roleId?: string;
}

export interface LevelResult { level: Level; reason: string; ref: string }

export function role(id: string) {
  return ROLES.roles.find((r) => r.id === id);
}
export const ROLE_IDS = ROLES.roles.map((r) => r.id);

export function eligibility(a: Answers): LevelResult {
  if (a.roleId) {
    const r = role(a.roleId);
    if (!r) throw new Error('rôle inconnu : ' + a.roleId);
    return { level: r.level as Level, reason: r.note || r.label, ref: r.ref };
  }
  const child = (a.workforce === 'child' || a.workforce === 'both') && ((a.childActivity && a.childFrequent) || a.childCare || a.childEstablishment);
  const adult = (a.workforce === 'adult' || a.workforce === 'both') && !!a.adultActivity;
  if (child && adult) return { level: 'enhanced-both', reason: 'Regulated activity with children and with adults', ref: 'children-barred §2 + adults-barred §2' };
  if (child) return { level: 'enhanced-cbl', reason: 'Regulated activity with children', ref: 'children-barred §2–3' };
  if (adult) return { level: 'enhanced-abl', reason: 'Regulated activity with adults (once is enough)', ref: 'adults-barred §2' };
  if ((a.workforce === 'child' || a.workforce === 'both') && a.childActivity)
    return { level: 'enhanced', reason: 'Work with children below the frequency condition', ref: 'children-enhanced' };
  return { level: 'basic', reason: 'No listed activity: any employer can ask for a basic check', ref: 'children §3' };
}

// ---------------------------------------------------------------- délais

export function latestMonth(): string {
  return Object.keys(PERF.months).sort().at(-1)!;
}

/** Part des certificats délivrés dans le délai cible, dernier mois publié (DBS dataset 1). */
export function onTimeShare(level: 'basic' | 'standard' | 'enhanced', month = latestMonth()) {
  const m = (PERF.months as Record<string, Record<string, { share: number; targetDays: number; despatched: number }>>)[month]?.[level];
  if (!m) return null;
  return { month, share: m.share, targetDays: m.targetDays, despatched: m.despatched };
}

export function averageDays(level: 'basic' | 'standard' | 'enhanced') {
  const r = POLICE.reports[0];
  return { days: r.avgDays[level], dataMonth: r.dataMonth, source: POLICE.url };
}

/** La force de police figure-t-elle dans la liste des forces en retard du dernier rapport ? */
export function forceDelayed(force: string) {
  const r = POLICE.reports[0];
  const norm = (s: string) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z]/g, '');
  return { delayed: (r.delayedForces ?? []).some((f) => norm(f) === norm(force)), dataMonth: r.dataMonth, policeAvgDays: r.policeReturnAvgDays };
}

// ---------------------------------------------------------------- ce que montre un certificat

import PARAMS from '../../data/params-2026.json';

export type RecordKind = 'adult-conviction' | 'adult-caution' | 'youth-conviction' | 'youth-caution';

export interface ShowQuery {
  kind: RecordKind;
  /** Années écoulées depuis la condamnation ou l'avertissement. */
  years: number;
  /** Infraction de la liste « specified » (jamais filtrée pour une condamnation ou un avertissement adulte). */
  specified?: boolean;
  /** Peine privative de liberté (toujours divulguée sur standard et enhanced). */
  custodial?: boolean;
  /** Condamnation encore non « spent » au sens du Rehabilitation of Offenders Act 1974. */
  unspent?: boolean;
}

/**
 * Standard / enhanced : règles de filtrage DBS en vigueur depuis le 28 octobre 2023 (GOV.UK).
 * Basic : seules les condamnations non « spent » et les avertissements conditionnels non « spent » paraissent.
 * Renvoie `police` = la police peut encore ajouter une information sur un enhanced (statutory guidance).
 */
export function shows(q: ShowQuery) {
  if (q.years < 0) throw new RangeError('années négatives');
  const F = PARAMS.rules.filtering;
  let standard: boolean;
  if (q.kind === 'youth-caution') standard = false;
  else if (q.kind === 'adult-caution') standard = !!q.specified || q.years < F.adultCautionYears;
  else if (q.custodial || q.specified) standard = true;
  else standard = q.years < (q.kind === 'adult-conviction' ? F.adultConvictionYears : F.youthConvictionYears);
  if (q.unspent) standard = true;
  return { basic: !!q.unspent, standard, enhanced: standard, policeMayAdd: !standard };
}

// ---------------------------------------------------------------- bénévole

export interface VolunteerAnswers { paid: boolean; benefit: boolean; placement: boolean; trainee: boolean; fosterCarer: boolean }

/** Les cinq conditions de GOV.UK (Update Service) : bénévole au sens DBS seulement si aucune ne s'applique. */
export function isVolunteer(a: VolunteerAnswers): boolean {
  return !a.paid && !a.benefit && !a.placement && !a.trainee && !a.fosterCarer;
}

// ---------------------------------------------------------------- quatre nations

export const NATIONS: Nation[] = ['england', 'wales', 'scotland', 'northern-ireland'];
export const NATION_LABEL: Record<Nation, string> = { england: 'England', wales: 'Wales', scotland: 'Scotland', 'northern-ireland': 'Northern Ireland' };

/** Même niveau de poste, quatre organismes : produit, prix, délai publié. */
export function compareNations(level: Level, volunteer = false) {
  return NATIONS.filter((n) => n !== 'wales').map((n) => {
    const f = officialFee({ nation: n, level, volunteer });
    return { nation: n, body: f.body, product: f.product, fee: f.fee, wait: publishedWait(n, level) };
  });
}

/** Délai publié par l'organisme compétent, en jours (moyenne la plus récente). */
export function publishedWait(n: Nation, level: Level): { days: number; label: string; period: string } {
  if (n === 'scotland') return { days: FEES.scotland.processing.averageDays, label: 'average, all Disclosure Scotland checks', period: 'April to June 2026' };
  if (n === 'northern-ireland') {
    const k = level === 'basic' ? 'basic' : level === 'standard' ? 'standard' : 'enhanced';
    return { days: FEES.northernIreland.turnaround.averageDays[k], label: `average, AccessNI ${k}`, period: `week of ${FEES.northernIreland.turnaround.week}` };
  }
  const k = level === 'basic' ? 'basic' : level === 'standard' ? 'standard' : 'enhanced';
  const a = averageDays(k);
  return { days: a.days, label: `average, DBS ${k}`, period: a.dataMonth };
}

// ---------------------------------------------------------------- coût sur plusieurs années

/**
 * Coût d'une vérification renouvelée à chaque licence ou contrat (taxi, travailleur indépendant) sur `years`
 * années : sans abonnement, une vérification par période ; avec, une seule vérification + l'abonnement annuel.
 */
export function repeatCost(level: Level, years: number, everyYears: number, adminFee = 0) {
  if (years <= 0 || everyYears <= 0) throw new RangeError('durées positives');
  const per = r2(officialFee({ nation: 'england', level }).fee + adminFee);
  const checks = Math.ceil(years / everyYears);
  const without = r2(per * checks);
  const withUpdate = r2(per + updateServiceCost('england', level, Math.ceil(years)));
  return { per, checks, without, withUpdate, saving: r2(without - withUpdate) };
}

/** Coût total pour qui paie lui-même un intermédiaire : DBS + frais + TVA éventuelle sur les frais. */
export function withAdmin(fee: number, adminFee: number, exVat: boolean) {
  if (adminFee < 0) throw new RangeError('frais négatifs');
  const vat = exVat ? r2(adminFee * VAT) : 0;
  return { fee, admin: adminFee, vat, total: r2(fee + adminFee + vat) };
}

export const FORCES: string[] = POLICE.forces;
