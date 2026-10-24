/** Labels and fees safe to import from a client component (no routes, no page registry). */
import type * as D from './engine/dbs';
import FEES from '../data/fees.json';
import { formatMoney } from './format';
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
/** "2026-06" → "June 2026". */
export const monthLabel = (k: string) => { const [y, m] = k.split('-'); return `${MONTHS[Number(m) - 1]} ${y}`; };

/** A fee in pounds: whole pounds without pence, else two decimals (£20, £21.50). */
export const gbp = (n: number) => formatMoney(n, Number.isInteger(n) ? 0 : 2);

const ew = Object.fromEntries(FEES.englandWales.products.map((p) => [p.id, p]));
const sc = Object.fromEntries(FEES.scotland.products.map((p) => [p.id, p]));
const ni = Object.fromEntries(FEES.northernIreland.products.map((p) => [p.id, p]));

/** Every fee as a ready-made string, and as a number when a sentence computes with it. */
export const FEE = {
  basic: ew.basic.fee, standard: ew.standard.fee, enhanced: ew.enhanced.fee, adultFirst: ew['adult-first'].fee,
  oldBasic: ew.basic.previousFee as number, oldStandard: ew.standard.previousFee as number, oldEnhanced: ew.enhanced.previousFee as number,
  update: FEES.englandWales.updateService.feePerYear, oldUpdate: FEES.englandWales.updateService.previousFeePerYear,
  scLevel1: sc['level-1'].fee, scLevel2: sc['level-2'].fee, pvgJoin: sc['pvg-join'].fee, pvgExisting: sc['pvg-existing'].fee,
  niBasic: ni.basic.fee, niStandard: ni.standard.fee, niEnhanced: ni.enhanced.fee,
  vat: FEES.vatRate,
};

export const LEVEL_NAME: Record<D.Level, string> = {
  basic: 'Basic DBS check', standard: 'Standard DBS check', enhanced: 'Enhanced DBS check (no barred list)',
  'enhanced-cbl': "Enhanced with children's barred list", 'enhanced-abl': "Enhanced with adults' barred list", 'enhanced-both': 'Enhanced with both barred lists',
};
