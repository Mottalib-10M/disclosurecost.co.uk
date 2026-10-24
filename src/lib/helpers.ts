/**
 * Writing helpers handed to every page: links, every fee and wait read from the data files, tables,
 * sources. A page never types a fee, a date or a percentage: it reads it here, so a fee change in
 * fees.json flows into every sentence.
 */
import { route, ROUTES } from '../i18n/routes';
import { P, type SourceKey } from './engine/params';
import * as D from './engine/dbs';
import FEES from '../data/fees.json';
import PERF from '../data/performance.json';
import POLICE from '../data/police-performance.json';
import ROLES from '../data/roles.json';
import { formatNumber, formatPercent, displayDate } from './format';
import { FEE, LEVEL_NAME, gbp, monthLabel } from './labels';
export { FEE, LEVEL_NAME, gbp, monthLabel };

const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
export function table(headers: string[], rows: Array<Array<string | number>>, caption?: string, align: Array<'l' | 'r'> = []) {
  const al = (i: number) => (align[i] === 'r' ? 'text-right' : 'text-left');
  return `<div class="not-prose my-6 overflow-x-auto"><table class="journal w-full text-sm">${caption ? `<caption class="mb-2 text-left text-sm text-navy-600">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-navy-700 ${al(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800 ${al(i)}">${typeof c === 'number' ? esc(formatNumber(c, 0)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
export function helpers(strict = false) {
  const pc = (x: number | null | undefined, d = 1) => (x == null ? 'n/a' : formatPercent(x, d));
  const num = (n: number, d = 0) => formatNumber(n, d);
  const days = (n: number) => `${formatNumber(n, Number.isInteger(n) ? 0 : 1)} day${n === 1 ? '' : 's'}`;
  const a = (id: string, text: string) => {
    if (!ROUTES.some((r) => r.id === id)) { if (strict) throw new Error(`Unknown page id in a link: ${id}`); return text; }
    return `<a href="${route(id, 'en')}">${text}</a>`;
  };
  const date = (iso: string) => displayDate(iso, 'en-GB');
  const lastMonth = D.latestMonth();
  const on = (l: 'basic' | 'standard' | 'enhanced') => D.onTimeShare(l)!;
  const avg = (l: 'basic' | 'standard' | 'enhanced') => D.averageDays(l);
  const police = POLICE.reports[0];
  const q = (m: string) => (PERF.months as Record<string, Record<string, { despatched: number; withinTarget: number; share: number; targetDays: number; targetShare: number }>>)[m];
  /** Quarter totals of the DBS dataset (three months summed). */
  const quarter = (l: 'basic' | 'standard' | 'enhanced') => {
    const ms = Object.keys(PERF.months).sort();
    const t = ms.reduce((s, m) => s + q(m)[l].despatched, 0), w = ms.reduce((s, m) => s + q(m)[l].withinTarget, 0);
    return { months: ms, despatched: t, within: w, share: w / t, targetDays: q(ms[0])[l].targetDays, targetShare: q(ms[0])[l].targetShare };
  };
  const upd = PERF.updateService as Record<string, { newPaid: number; newVolunteer: number; active: number }>;
  return {
    P, D, FEES, PERF, POLICE, ROLES, FEE, a, pc, num, days, date, gbp,
    m: gbp,
    month: monthLabel, lastMonth, on, avg, police, quarter,
    update: { last: upd[lastMonth], months: Object.keys(upd).sort(), all: upd },
    effective: date(FEES.englandWales.effectiveFrom), announced: date(FEES.englandWales.announcementDate),
    table,
    /** Link to an official source of the parameter file. */
    src: (key: SourceKey, text?: string) => { const s = P.sources[key]; return `<a href="${s.url}" target="_blank" rel="nofollow noopener noreferrer">${text ?? s.label.en}</a>`; },
    /** Boxed note. */
    box: (title: string, html: string, kind: 'info' | 'tip' | 'warning' | 'example' = 'info') => `<div class="callout callout-${kind}"><span class="callout-title">${title}</span>${html}</div>`,
    /** Roles of roles.json at one level. */
    rolesAt: (level: string) => ROLES.roles.filter((r) => r.level === level),
    levelName: (l: D.Level) => LEVEL_NAME[l],
  };
}
export type Helpers = ReturnType<typeof helpers>;
