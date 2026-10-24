/**
 * Main tool (home and the role pages): role + nation + volunteer + admin fee → level of check, official
 * fee, admin fee and VAT, Update Service, total and the latest published wait. Every figure comes from
 * the tested engine (lib/engine/dbs.ts). First render = build defaults (RECETTE §17.5).
 */
import { useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import * as D from '../../lib/engine/dbs';
import ROLES from '../../data/roles.json';
import FEES from '../../data/fees.json';
import { LEVEL_NAME, monthLabel } from '../../lib/labels';
import { formatMoney, formatNumber, displayDate } from '../../lib/format';

const m = (n: number) => formatMoney(n, Number.isInteger(n) ? 0 : 2);
const dd = (n: number) => `${formatNumber(n, Number.isInteger(n) ? 0 : 1)} day${n === 1 ? '' : 's'}`;
const ROLE_OPTS = ROLES.roles.map((r) => ({ value: r.id, label: r.label }));
const NAT_OPTS = D.NATIONS.map((n) => ({ value: n, label: D.NATION_LABEL[n] }));
const YES_NO = [{ value: '0', label: 'No, paid role' }, { value: '1', label: 'Yes, unpaid volunteer' }];
const VAT_OPTS = [{ value: '0', label: 'VAT included or none' }, { value: '1', label: 'Before VAT (add 20%)' }];

interface Props { role?: string; nation?: D.Nation; idPrefix?: string; methodHref?: string; pages?: Record<string, string> }

export default function CheckFinder({ role = 'teacher', nation = 'england', idPrefix = 'f', methodHref, pages = {} }: Props) {
  const [roleId, setRole] = useState(role);
  const [nat, setNat] = useState<D.Nation>(nation);
  const [vol, setVol] = useState('0');
  const [admin, setAdmin] = useState(0);
  const [exVat, setExVat] = useState('0');
  const [years, setYears] = useState(0);
  const out = useMemo(() => {
    const r = D.role(roleId)!;
    const level = r.level as D.Level;
    const volunteer = vol === '1';
    const cost = D.totalCost({ nation: nat, level, volunteer, adminFee: admin, adminFeeExVat: exVat === '1', updateYears: years });
    const fee = D.officialFee({ nation: nat, level, volunteer });
    const wait = D.publishedWait(nat, level);
    return { r, level, cost, fee, wait, volunteer };
  }, [roleId, nat, vol, admin, exVat, years]);
  const ew = nat === 'england' || nat === 'wales';
  const fid = (s: string) => `${idPrefix}-${s}`;
  const page = pages[out.level];
  return (
    <div data-chrome className="not-prose rechner border border-navy-300 bg-white p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <form className="grid content-start gap-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <SelectField id={fid('role')} label="Role or activity" value={roleId} onChange={setRole} options={ROLE_OPTS} className="sm:col-span-2" />
          <SelectField id={fid('nation')} label="Where the job is" value={nat} onChange={(x) => setNat(x as D.Nation)} options={NAT_OPTS} />
          <SelectField id={fid('vol')} label="Volunteer?" value={vol} onChange={setVol} options={YES_NO} />
          <NumberField id={fid('admin')} label="Admin fee you were quoted" value={admin} onChange={setAdmin} unit="£" max={200} decimals={2} />
          <SelectField id={fid('vat')} label="That fee is" value={exVat} onChange={setExVat} options={VAT_OPTS} />
          <NumberField id={fid('years')} label="Years of Update Service" value={years} onChange={(x) => setYears(Math.round(x))} max={40} help={ew ? `${m(FEES.englandWales.updateService.feePerYear)} a year, standard and enhanced` : 'England and Wales only'} />
        </form>
        <div aria-live="polite" data-resultat className="self-start border-l-4 border-accent-500 bg-accent-50 p-4">
          <p className="text-sm font-medium text-navy-700">Level for this role</p>
          <p className="mt-1 text-xl font-bold text-navy-900">{ew ? LEVEL_NAME[out.level] : out.fee.product}</p>
          <p className="mt-3 text-sm font-medium text-navy-700">Total you pay</p>
          <p className="tabular-nums text-4xl font-bold text-navy-900">{m(out.cost.total)}</p>
          <table className="ledger mt-3 w-full text-sm"><tbody>
            {out.cost.lines.map((l) => <tr key={l.label}><td className="pr-3 text-navy-700">{l.label}</td><td className="tabular-nums text-right text-navy-900">{m(l.amount)}</td></tr>)}
            <tr><td className="pr-3 text-navy-700">Average wait ({out.wait.period.length === 7 ? monthLabel(out.wait.period) : out.wait.period})</td><td className="tabular-nums text-right text-navy-900">{dd(out.wait.days)}</td></tr>
          </tbody></table>
          <p className="mt-2 text-xs text-navy-600">{out.r.note ? `${out.r.note} ` : ''}Guidance: {out.r.ref}.{ew ? ` Fees since ${displayDate(FEES.englandWales.effectiveFrom, 'en-GB')}.` : ' Level mapped to the equivalent product; Scottish and NI eligibility rules have their own wording.'} The recruiting organisation decides.</p>
          <p className="mt-2 text-xs">{page && <a href={page} className="font-medium text-accent-700 underline underline-offset-2">About this level</a>}{page && methodHref && ' · '}{methodHref && <a href={methodHref} className="font-medium text-accent-700 underline underline-offset-2">How this is worked out</a>}</p>
        </div>
      </div>
    </div>
  );
}
