/**
 * Mini-calculators, one per subject (RECETTE §9.3). Each one calls the tested engine of
 * `lib/engine/dbs.ts`; none holds a fee of its own. A page sets its defaults through the `props` of its
 * ToolDef (same ids as the inputs, numbers only; a select is set by the index of its option).
 */
import type { MiniSpec } from './mini-types';
import * as D from './engine/dbs';
import FEES from '../data/fees.json';
import ROLES from '../data/roles.json';
import { P } from './engine/params';
import { LEVEL_NAME, FEE, monthLabel } from './labels';
import { formatMoney, formatNumber, formatPercent, displayDate } from './format';

const m = (n: number) => formatMoney(n, Number.isInteger(n) ? 0 : 2);
const pc = (x: number, d = 1) => formatPercent(x, d);
const dd = (n: number) => `${formatNumber(n, Number.isInteger(n) ? 0 : 1)} day${n === 1 ? '' : 's'}`;
const date = (iso: string) => displayDate(iso, 'en-GB');
const yesNo = [{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }];

const LEVELS: D.Level[] = ['basic', 'standard', 'enhanced', 'enhanced-cbl', 'enhanced-abl', 'enhanced-both'];
const LEVEL_OPTS = LEVELS.map((l, i) => ({ value: String(i), label: LEVEL_NAME[l] }));
const L = (v: number) => LEVELS[Math.max(0, Math.min(LEVELS.length - 1, Math.round(v)))];
const NAT_OPTS = D.NATIONS.map((n, i) => ({ value: String(i), label: D.NATION_LABEL[n] }));
const N = (v: number) => D.NATIONS[Math.max(0, Math.min(3, Math.round(v)))];
const level = (def = 2, label = 'Level of check') => ({ id: 'level', label, def, options: LEVEL_OPTS });
const nation = (def = 0) => ({ id: 'nation', label: 'Where the job is', def, options: NAT_OPTS });

/** Roles in the order of roles.json; the select value is the index. */
export const ROLE_LIST = ROLES.roles;
export const roleIndex = (id: string) => { const i = ROLE_LIST.findIndex((r) => r.id === id); if (i < 0) throw new Error(`Unknown role ${id}`); return i; };
const ROLE_OPTS = ROLE_LIST.map((r, i) => ({ value: String(i), label: r.label }));
const R = (v: number) => ROLE_LIST[Math.max(0, Math.min(ROLE_LIST.length - 1, Math.round(v)))];
const FORCE_OPTS = D.FORCES.map((f, i) => ({ value: String(i), label: f }));
export const forceIndex = (name: string) => { const i = D.FORCES.indexOf(name); if (i < 0) throw new Error(`Unknown force ${name}`); return i; };
const PERF_LEVEL = (l: D.Level): 'basic' | 'standard' | 'enhanced' => (l === 'basic' ? 'basic' : l === 'standard' ? 'standard' : 'enhanced');
const SC = FEES.scotland, NI = FEES.northernIreland;

const SPECS: Record<string, MiniSpec> = {
  cost: {
    title: 'What the check costs you, admin fee and VAT included', cta: 'Find the level for your role', ctaPage: 'home',
    inputs: [level(2), nation(0), { id: 'admin', label: 'Admin fee quoted by the umbrella body', def: 0, unit: '£', max: 200, decimals: 2, help: 'Leave empty if you apply directly or your employer pays' }, { id: 'exvat', label: 'Is that fee quoted before VAT?', def: 0, options: yesNo }],
    run: (v) => {
      const l = L(v.level), n = N(v.nation);
      const f = D.officialFee({ nation: n, level: l });
      const t = D.withAdmin(f.fee, v.admin, v.exvat === 1);
      return {
        head: [`Total for a ${f.product.toLowerCase()}`, m(t.total)],
        rows: [[`Official fee (${f.body})`, m(f.fee)], ['Admin fee', m(t.admin)], ['VAT on the admin fee', m(t.vat)]],
        note: n === 'england' || n === 'wales' ? `DBS fee in force since ${date(FEES.englandWales.effectiveFrom)}. The admin fee is set by the intermediary, not by DBS.` : `Fee published by ${f.body}. Volunteers in a qualifying organisation pay nothing for most levels.`,
      };
    },
  },
  oldnew: {
    title: 'The 5 October 2026 fee cut on your check', cta: 'Work out the full cost with an admin fee', ctaPage: 'dbs-check-cost',
    inputs: [level(2), { id: 'n', label: 'Checks paid in a year', def: 1, max: 100000, help: 'One for yourself, or the number an employer pays for' }],
    run: (v) => {
      const l = L(v.level);
      const now = D.officialFee({ nation: 'england', level: l, date: '2026-10-24' }).fee;
      const before = D.officialFee({ nation: 'england', level: l, date: '2026-10-04' }).fee;
      const n = Math.max(0, Math.round(v.n));
      return {
        head: [`Saved on ${formatNumber(n)} check${n === 1 ? '' : 's'}`, m(Math.round((before - now) * n * 100) / 100)],
        rows: [['Fee until 4 October 2026', m(before)], ['Fee from 5 October 2026', m(now)], [`Total at the new fee`, m(now * n)]],
        note: 'England and Wales, SI 2026/985. Volunteer standard and enhanced checks stay free.',
      };
    },
  },
  update: {
    title: 'Update Service or a new check each time?', cta: 'How the Update Service works', ctaPage: 'dbs-update-service',
    inputs: [level(2, 'Level on your certificate'), { id: 'years', label: 'Years you will need it', def: 3, max: 40 }, { id: 'per', label: 'New checks a year without it', def: 1, max: 50, decimals: 1, help: 'Change of employer, agency or client asking for its own check' }, { id: 'admin', label: 'Admin fee per new check', def: 0, unit: '£', max: 200, decimals: 2 }],
    run: (v) => {
      const l = L(v.level) === 'basic' ? 'standard' : L(v.level);
      const years = Math.max(1, Math.round(v.years));
      const r = D.updateVsNewChecks(l, years, Math.max(0, v.per), Math.max(0, v.admin));
      return {
        head: [r.saving >= 0 ? `Saved with the Update Service over ${years} year${years === 1 ? '' : 's'}` : 'Extra cost of the Update Service', m(Math.abs(r.saving))],
        rows: [['With the Update Service', m(r.withUpdate)], ['Without it', m(r.withoutUpdate)], ['Subscription', `${m(FEE.update)} a year`]],
        note: `Standard and enhanced certificates only; free for volunteers. Join within ${FEES.englandWales.updateService.joinWithinDaysOfIssue} days of the certificate date.`,
      };
    },
  },
  deadline: {
    title: 'Can you still join the Update Service with your certificate?', cta: 'Update Service or a new check', ctaPage: 'dbs-update-service',
    inputs: [{ id: 'days', label: 'Days since the date printed on the certificate', def: 12, max: 4000 }, level(2, 'Level on the certificate')],
    run: (v) => {
      const lim = FEES.englandWales.updateService.joinWithinDaysOfIssue;
      const d = Math.max(0, Math.round(v.days));
      const basic = L(v.level) === 'basic';
      const ok = !basic && d <= lim;
      return {
        head: [basic ? 'Basic certificates cannot join' : ok ? 'Yes, days left to subscribe' : 'Too late for this certificate', basic ? 'No' : ok ? String(lim - d) : 'New check'],
        rows: [['Limit after the certificate date', dd(lim)], ['Subscription', `${m(FEE.update)} a year`], ['Status checks by employers', 'Free']],
        note: basic ? 'Basic certificates use a DBS online account instead of the Update Service.' : ok ? 'Subscribe with the certificate number on GOV.UK.' : 'Apply for a new check and join with its application reference, or within 30 days of the new certificate.',
      };
    },
  },
  wait: {
    title: 'How long the check is likely to take', cta: 'Is your police force on the delayed list?', ctaPage: 'how-long-does-a-dbs-check-take',
    inputs: [level(2), nation(0)],
    run: (v) => {
      const l = L(v.level), n = N(v.nation), w = D.publishedWait(n, l);
      const rows: Array<[string, string]> = [[`Average (${w.period.length === 7 ? monthLabel(w.period) : w.period})`, dd(w.days)]];
      if (n === 'england' || n === 'wales') {
        const o = D.onTimeShare(PERF_LEVEL(l))!;
        rows.push([`Done within ${dd(o.targetDays)} (${monthLabel(o.month)})`, pc(o.share)]);
        rows.push(['Police return, average', dd(D.forceDelayed('').policeAvgDays)]);
      } else if (n === 'scotland') rows.push(['Done within 14 days', pc(SC.processing.shareWithin14Days)]);
      else rows.push(['AccessNI target', NI.turnaround.targets[l === 'basic' ? 'basic-rb' : l === 'standard' ? 'standard' : 'enhanced'] ?? '']);
      return { head: [`Average for ${D.NATION_LABEL[n] === 'Wales' ? 'England and Wales' : D.NATION_LABEL[n]}`, dd(w.days)], rows, note: 'An average hides long waits: enhanced checks that go to a slow police force can take weeks.' };
    },
  },
  force: {
    title: 'Your police force and the wait for an enhanced check', cta: 'All waiting times', ctaPage: 'how-long-does-a-dbs-check-take',
    inputs: [{ id: 'force', label: 'Police force where you lived in the last years', def: forceIndex('Thames Valley'), options: FORCE_OPTS, help: 'Every force covering an address you gave may be asked' }],
    run: (v) => {
      const f = D.FORCES[Math.max(0, Math.min(D.FORCES.length - 1, Math.round(v.force)))];
      const r = D.forceDelayed(f);
      const o = D.onTimeShare('enhanced')!;
      return {
        head: [`${f}, ${monthLabel(r.dataMonth)}`, r.delayed ? 'On the delayed list' : 'Not on the delayed list'],
        rows: [['Police return, all forces, average', dd(r.policeAvgDays)], [`Enhanced within ${dd(o.targetDays)}, ${monthLabel(o.month)}`, pc(o.share)], ['Enhanced average, all checks', dd(D.averageDays('enhanced').days)]],
        note: 'DBS names the forces outside their target but publishes no wait per force: no number of days is invented here.',
      };
    },
  },
  volunteer: {
    title: 'Is your check free as a volunteer?', cta: 'All the costs', ctaPage: 'dbs-check-cost',
    inputs: [{ id: 'paid', label: 'Are you paid for the role (beyond expenses)?', def: 0, options: yesNo }, { id: 'placement', label: 'Is it a work placement or a course leading to a job?', def: 0, options: yesNo }, { id: 'foster', label: 'Paid foster or kinship carer, or in their household?', def: 0, options: yesNo }, level(3)],
    run: (v) => {
      const vol = D.isVolunteer({ paid: v.paid === 1, benefit: v.paid === 1, placement: v.placement === 1, trainee: v.placement === 1, fosterCarer: v.foster === 1 });
      const l = L(v.level);
      const f = D.officialFee({ nation: 'england', level: l, volunteer: vol });
      return {
        head: [vol ? 'You count as a volunteer: the fee is' : 'Not a volunteer for DBS: the fee is', m(f.fee)],
        rows: [['Level', LEVEL_NAME[l]], ['Update Service', vol && l !== 'basic' ? 'Free' : l === 'basic' ? 'Not available' : `${m(FEE.update)} a year`], ['Admin fee', 'Set by the umbrella body']],
        note: l === 'basic' ? 'Basic checks are never free, even for volunteers.' : 'Free for standard and enhanced checks in England and Wales; Scotland and NI have their own volunteer rules.',
      };
    },
  },
  eligibility: {
    title: 'Which level the role can get', cta: 'Check a named role in the finder', ctaPage: 'home',
    inputs: [
      { id: 'children', label: 'Work with children (under 18)', def: 2, options: [{ value: '0', label: 'No' }, { value: '1', label: 'Yes, now and then' }, { value: '2', label: 'Yes, more than 3 days in 30, or overnight' }] },
      { id: 'care', label: 'Health or personal care, to a child or an adult', def: 0, options: yesNo },
      { id: 'adults', label: 'Regulated activity with adults', def: 0, options: [{ value: '0', label: 'No' }, { value: '1', label: 'Yes (care, social work, money, transport)' }] },
      { id: 'listed', label: 'A listed profession or licence (solicitor, SIA, taxi…)', def: 0, options: [{ value: '0', label: 'No' }, { value: '1', label: 'Yes, a standard-level role' }, { value: '2', label: 'Yes, an enhanced-level licence' }] },
    ],
    run: (v) => {
      let r: { level: D.Level; reason: string };
      const childReg = v.children === 2 || v.care === 1;
      const adultReg = v.adults === 1 || (v.care === 1 && v.children === 0);
      if (childReg && adultReg) r = { level: 'enhanced-both', reason: 'Regulated activity with children and adults' };
      else if (childReg) r = { level: 'enhanced-cbl', reason: 'Regulated activity with children' };
      else if (adultReg) r = { level: 'enhanced-abl', reason: 'Regulated activity with adults' };
      else if (v.children === 1 || v.listed === 2) r = { level: 'enhanced', reason: v.listed === 2 ? 'Listed licence or appointment' : 'Work with children below the frequency condition' };
      else if (v.listed === 1) r = { level: 'standard', reason: 'Listed in the standard eligibility guidance' };
      else r = D.eligibility({ workforce: 'other' });
      const f = D.officialFee({ nation: 'england', level: r.level });
      return { head: ['Highest level the role can get', LEVEL_NAME[r.level]], rows: [['Why', r.reason], ['DBS fee', m(f.fee)], ['Free for volunteers', r.level === 'basic' ? 'No' : 'Yes']], note: 'Indicative, from the DBS eligibility guidance (England and Wales). The recruiting organisation decides.' };
    },
  },
  roles: {
    title: 'The level a named role usually gets', cta: 'Cost with the admin fee', ctaPage: 'dbs-check-cost',
    inputs: [{ id: 'role', label: 'Role', def: roleIndex('teacher'), options: ROLE_OPTS }],
    run: (v) => {
      const r = R(v.role), l = r.level as D.Level, f = D.officialFee({ nation: 'england', level: l });
      return { head: ['Level in the DBS guidance', LEVEL_NAME[l]], rows: [['DBS fee', m(f.fee)], ['Guidance section', r.ref], ['Workforce', r.workforce === 'child' ? 'Child' : r.workforce === 'adult' ? 'Adult' : 'Other']], note: r.note || 'The recruiting organisation decides which check it asks for.' };
    },
  },
  pvg: {
    title: 'What your PVG application costs', cta: 'Compare the four nations', ctaPage: 'criminal-record-check-uk',
    inputs: [{ id: 'status', label: 'Your situation', def: 0, options: [{ value: '0', label: 'Joining the PVG scheme' }, { value: '1', label: 'Already a member, same type of role' }, { value: '2', label: 'Volunteer, qualifying organisation' }, { value: '3', label: 'New role in commissioned social care' }] }],
    run: (v) => {
      const s = Math.round(v.status);
      const f = D.officialFee({ nation: 'scotland', level: 'enhanced-both', pvg: s === 1 ? 'existing' : 'join', volunteer: s === 2, socialCareNewRole: s === 3, date: P.retrieved_at });
      return { head: [f.product, m(f.fee)], rows: [['Join the scheme', m(FEE.pvgJoin)], ['Existing member', m(FEE.pvgExisting)], ['Social care waiver', `${date(SC.socialCareWaiver.from)} to ${date(SC.socialCareWaiver.to)}`]], note: `Membership lasts five years from ${date(SC.pvgFiveYearMembershipFrom)} onwards. Fees from Disclosure Scotland.` };
    },
  },
  basicwhere: {
    title: 'Who issues your basic check, and its price', cta: 'Cost of a basic check', ctaPage: 'basic-dbs-check-cost',
    inputs: [nation(0)],
    run: (v) => {
      const n = N(v.nation), f = D.officialFee({ nation: n, level: 'basic' }), w = D.publishedWait(n, 'basic');
      return { head: [`${f.product} from ${f.body}`, m(f.fee)], rows: [['Average wait', dd(w.days)], ['Apply yourself online', 'Yes'], ['Minimum age', `${P.rules.basicMinAge}`]], note: n === 'scotland' ? 'In Scotland the basic check is called a Level 1 disclosure.' : n === 'northern-ireland' ? 'AccessNI basic checks are applied for on nidirect.' : 'Apply on GOV.UK if the job is in England or Wales, wherever you live.' };
    },
  },
  ni: {
    title: 'What an AccessNI check costs', cta: 'Compare with England and Wales', ctaPage: 'criminal-record-check-uk',
    inputs: [level(3), { id: 'vol', label: 'Volunteer in a qualifying organisation?', def: 0, options: yesNo }],
    run: (v) => {
      const l = L(v.level), f = D.officialFee({ nation: 'northern-ireland', level: l, volunteer: v.vol === 1 }), w = D.publishedWait('northern-ireland', l);
      return { head: [f.product, m(f.fee)], rows: [[`Average, week of ${date(NI.turnaround.week)}`, dd(w.days)], ['Same level in England and Wales', m(D.officialFee({ nation: 'england', level: l }).fee)]], note: 'AccessNI adds a barred list check to an enhanced check only for regulated activity, under the Northern Ireland safeguarding law.' };
    },
  },
  nations: {
    title: 'The same check in the four nations', cta: 'Which level does my role need?', ctaPage: 'which-dbs-check-do-i-need',
    inputs: [level(3)],
    run: (v) => {
      const l = L(v.level), c = D.compareNations(l);
      const cheapest = [...c].sort((a, b) => a.fee - b.fee)[0];
      return { head: [`${LEVEL_NAME[l]}, England and Wales`, m(c[0].fee)], rows: c.map((x) => [`${D.NATION_LABEL[x.nation]}${x.nation === 'england' ? ' and Wales' : ''}: ${x.product}`, `${m(x.fee)}, ${dd(x.wait.days)}`] as [string, string]), note: `You apply where the job is, not where you live. Lowest fee: ${D.NATION_LABEL[cheapest.nation]}.` };
    },
  },
  taxi: {
    title: 'DBS cost over your taxi or private hire licences', cta: 'Update Service in detail', ctaPage: 'dbs-update-service',
    inputs: [{ id: 'years', label: 'Years you expect to drive', def: 9, max: 50 }, { id: 'every', label: 'New check required every (years)', def: 3, max: 10, help: 'Set by your licensing council' }, { id: 'admin', label: 'Council or umbrella admin fee', def: 0, unit: '£', max: 200, decimals: 2 }],
    run: (v) => {
      const r = D.repeatCost('enhanced-both', Math.max(1, Math.round(v.years)), Math.max(1, Math.round(v.every)), Math.max(0, v.admin));
      return { head: [r.saving >= 0 ? 'Saved with the Update Service' : 'Cheaper without the Update Service', m(Math.abs(r.saving))], rows: [[`${r.checks} new checks at ${m(r.per)}`, m(r.without)], ['One check + Update Service', m(r.withUpdate)]], note: 'Only if your council accepts Update Service status checks; some ask for a new certificate anyway.' };
    },
  },
  shows: {
    title: 'Would this record show on a standard or enhanced check?', cta: 'What each level shows', ctaPage: 'what-shows-on-a-dbs-check',
    inputs: [
      { id: 'kind', label: 'Record', def: 0, options: [{ value: '0', label: 'Conviction, aged 18 or over' }, { value: '1', label: 'Caution, aged 18 or over' }, { value: '2', label: 'Conviction, aged under 18' }, { value: '3', label: 'Caution, reprimand or warning under 18' }] },
      { id: 'years', label: 'Years since the conviction or caution', def: 8, max: 80, decimals: 1 },
      { id: 'custodial', label: 'Prison or custodial sentence?', def: 0, options: yesNo },
      { id: 'specified', label: 'Offence on the specified list?', def: 0, options: [{ value: '0', label: 'No or not sure' }, { value: '1', label: 'Yes' }] },
    ],
    run: (v) => {
      const kinds: D.RecordKind[] = ['adult-conviction', 'adult-caution', 'youth-conviction', 'youth-caution'];
      const k = kinds[Math.max(0, Math.min(3, Math.round(v.kind)))];
      const s = D.shows({ kind: k, years: Math.max(0, v.years), custodial: v.custodial === 1, specified: v.specified === 1 });
      return { head: ['Shown automatically on standard and enhanced', s.standard ? 'Yes' : 'No, filtered'], rows: [['Basic check', 'Only if still unspent'], ['Police may add it to an enhanced', s.policeMayAdd ? 'Possible if relevant' : 'Already shown']], note: `DBS filtering rules for certificates issued from ${date(P.rules.filtering.from)}. Not legal advice.` };
    },
  },
  selfemp: {
    title: 'Self-employed: your level, route and yearly cost', cta: 'Update Service or new checks', ctaPage: 'dbs-update-service',
    inputs: [{ id: 'work', label: 'What you do', def: 0, options: [{ value: '0', label: 'Tutoring or coaching children' }, { value: '1', label: 'Personal care for adults' }, { value: '2', label: 'Trade in people’s homes' }] }, { id: 'clients', label: 'Clients a year asking to see a check', def: 4, max: 500 }, { id: 'admin', label: 'Umbrella body admin fee', def: 0, unit: '£', max: 200, decimals: 2 }],
    run: (v) => {
      const w = Math.round(v.work);
      const l: D.Level = w === 0 ? 'enhanced-cbl' : w === 1 ? 'enhanced-abl' : 'basic';
      const fee = D.officialFee({ nation: 'england', level: l }).fee + Math.max(0, v.admin);
      const upd = l === 'basic' ? 0 : FEE.update;
      return { head: [LEVEL_NAME[l], m(fee)], rows: [['Route', l === 'basic' ? 'Apply yourself on GOV.UK' : 'Through an umbrella body'], ['Update Service a year', l === 'basic' ? 'Not available' : m(upd)], [`First year for ${formatNumber(Math.round(v.clients))} clients`, m(fee + upd)]], note: l === 'basic' ? 'A trade in homes is not eligible for more than a basic check (GOV.UK example of a plumber).' : 'With the Update Service every client can check the same certificate for free.' };
    },
  },
  route: {
    title: 'Who applies, and how', cta: 'Cost with an admin fee', ctaPage: 'dbs-check-cost',
    inputs: [{ id: 'who', label: 'Who needs the check', def: 0, options: [{ value: '0', label: 'Me, a basic check for a job' }, { value: '1', label: 'An employer, under 100 checks a year' }, { value: '2', label: 'An employer, 100 or more a year' }, { value: '3', label: 'Me, self-employed in an eligible role' }] }],
    run: (v) => {
      const w = Math.round(v.who);
      const rows: Array<[string, string, string]> = [
        ['Online on GOV.UK, GOV.UK One Login', m(FEE.basic), 'Applicant'],
        ['Umbrella body', `${m(FEE.standard)} to ${m(FEE.enhanced)} + admin fee`, 'Employer, sometimes passed on'],
        ['Register with DBS, or umbrella body', `${m(FEE.standard)} to ${m(FEE.enhanced)}`, 'Employer'],
        ['Umbrella body for self-employed', `${m(FEE.enhanced)} + admin fee`, 'Applicant'],
      ];
      const r = rows[Math.max(0, Math.min(3, w))];
      return { head: ['Route', r[0]], rows: [['Fee', r[1]], ['Who pays', r[2]]], note: w === 0 ? `Usually processed within ${P.rules.basicDirectDays} days, then posted.` : 'Standard and enhanced checks go through a registered body or an umbrella body, never through the GOV.UK basic service.' };
    },
  },
};

export function getSpec(kind: string): MiniSpec {
  const s = SPECS[kind];
  if (!s) throw new Error(`Unknown mini-calculator: ${kind}`);
  return s;
}
export const SPEC_IDS = Object.keys(SPECS);
