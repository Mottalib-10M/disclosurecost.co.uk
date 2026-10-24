/** The parameter file, typed: every source key and rule a page cites. Fees live in ../../data/fees.json. */
import RAW from '../../data/params-2026.json';
export type SourceKey = keyof typeof RAW.sources;
export const P = RAW;
