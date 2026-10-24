/** Contrôles du moteur sur les montants officiels lus le 2026-10-24 (SI 2026/985, Disclosure Scotland, AccessNI). */
import { describe, it, expect } from 'vitest';
import * as D from '../src/lib/engine/dbs';

describe('official fees', () => {
  it('England and Wales from 5 October 2026 (SI 2026/985)', () => {
    expect(D.officialFee({ nation: 'england', level: 'basic' }).fee).toBe(20);
    expect(D.officialFee({ nation: 'wales', level: 'standard' }).fee).toBe(20);
    expect(D.officialFee({ nation: 'england', level: 'enhanced' }).fee).toBe(41);
    expect(D.officialFee({ nation: 'england', level: 'enhanced-both' }).fee).toBe(41);
  });
  it('the previous schedule applies up to 4 October 2026 (SI 2024/1111)', () => {
    expect(D.officialFee({ nation: 'england', level: 'enhanced', date: '2026-10-04' }).fee).toBe(49.5);
    expect(D.officialFee({ nation: 'england', level: 'basic', date: '2025-01-10' }).fee).toBe(21.5);
    expect(D.officialFee({ nation: 'england', level: 'enhanced', date: '2024-11-30' }).fee).toBe(38);
  });
  it('volunteers: standard and enhanced free, basic paid', () => {
    expect(D.officialFee({ nation: 'england', level: 'enhanced-cbl', volunteer: true }).fee).toBe(0);
    expect(D.officialFee({ nation: 'england', level: 'basic', volunteer: true }).fee).toBe(20);
  });
  it('Adult First adds £6 only to an adults’ barred list check', () => {
    expect(D.officialFee({ nation: 'england', level: 'enhanced-abl', adultFirst: true }).fee).toBe(47);
    expect(D.officialFee({ nation: 'england', level: 'enhanced-cbl', adultFirst: true }).fee).toBe(41);
  });
  it('Scotland: Level 1 and 2 £25, PVG £59 / £18, waivers', () => {
    expect(D.officialFee({ nation: 'scotland', level: 'basic' }).fee).toBe(25);
    expect(D.officialFee({ nation: 'scotland', level: 'standard' }).fee).toBe(25);
    expect(D.officialFee({ nation: 'scotland', level: 'enhanced-cbl' }).fee).toBe(59);
    expect(D.officialFee({ nation: 'scotland', level: 'enhanced-cbl', pvg: 'existing' }).fee).toBe(18);
    expect(D.officialFee({ nation: 'scotland', level: 'enhanced-abl', volunteer: true }).fee).toBe(0);
    expect(D.officialFee({ nation: 'scotland', level: 'enhanced-abl', socialCareNewRole: true, date: '2026-10-24' }).fee).toBe(0);
    expect(D.officialFee({ nation: 'scotland', level: 'enhanced-abl', socialCareNewRole: true, date: '2027-08-01' }).fee).toBe(59);
  });
  it('Northern Ireland: AccessNI £16 / £16 / £32', () => {
    expect(D.officialFee({ nation: 'northern-ireland', level: 'basic' }).fee).toBe(16);
    expect(D.officialFee({ nation: 'northern-ireland', level: 'enhanced-both' }).fee).toBe(32);
    expect(D.officialFee({ nation: 'northern-ireland', level: 'standard', volunteer: true }).fee).toBe(0);
    expect(D.officialFee({ nation: 'northern-ireland', level: 'basic', volunteer: true }).fee).toBe(16);
  });
});

describe('total cost', () => {
  it('BCP Council example: £41 + £12.50 + VAT = £56', () => {
    const c = D.totalCost({ nation: 'england', level: 'enhanced', adminFee: 12.5, adminFeeExVat: true });
    expect(c.vat).toBe(2.5);
    expect(c.total).toBe(56);
  });
  it('VAT never applies to the statutory fee', () => {
    expect(D.totalCost({ nation: 'england', level: 'basic', adminFee: 0, adminFeeExVat: true }).total).toBe(20);
  });
  it('Update Service: £15 a year, E&W standard/enhanced only, free for volunteers', () => {
    expect(D.totalCost({ nation: 'england', level: 'enhanced', updateYears: 3 }).total).toBe(41 + 45);
    expect(D.updateServiceCost('scotland', 'enhanced', 3)).toBe(0);
    expect(D.updateServiceCost('england', 'basic', 3)).toBe(0);
    expect(D.updateServiceCost('england', 'enhanced', 3, true)).toBe(0);
  });
  it('rejects negative fees', () => {
    expect(() => D.totalCost({ nation: 'england', level: 'basic', adminFee: -1 })).toThrow();
  });
  it('subscription pays off from the first extra check', () => {
    const r = D.updateVsNewChecks('enhanced', 1, 1, 10);
    expect(r.withUpdate).toBe(51 + 15);
    expect(r.withoutUpdate).toBe(102);
    expect(r.saving).toBe(36);
  });
  it('30-day window to join the Update Service', () => {
    expect(D.updateDeadline('2026-10-05')).toBe('2026-11-04');
  });
});

describe('eligibility', () => {
  it('known roles', () => {
    expect(D.eligibility({ workforce: 'other', roleId: 'taxi-driver' }).level).toBe('enhanced-both');
    expect(D.eligibility({ workforce: 'other', roleId: 'solicitor' }).level).toBe('standard');
    expect(D.eligibility({ workforce: 'child', roleId: 'teacher' }).level).toBe('enhanced-cbl');
    expect(D.eligibility({ workforce: 'adult', roleId: 'care-worker' }).level).toBe('enhanced-abl');
    expect(() => D.eligibility({ workforce: 'other', roleId: 'astronaut' })).toThrow();
  });
  it('questions: frequency matters for children, not for adults', () => {
    expect(D.eligibility({ workforce: 'child', childActivity: true, childFrequent: true }).level).toBe('enhanced-cbl');
    expect(D.eligibility({ workforce: 'child', childActivity: true, childFrequent: false }).level).toBe('enhanced');
    expect(D.eligibility({ workforce: 'adult', adultActivity: true }).level).toBe('enhanced-abl');
    expect(D.eligibility({ workforce: 'both', childCare: true, adultActivity: true }).level).toBe('enhanced-both');
    expect(D.eligibility({ workforce: 'other' }).level).toBe('basic');
  });
  it('every role has a level, a workforce and a guidance reference', () => {
    expect(D.ROLE_IDS.length).toBeGreaterThanOrEqual(35);
    for (const id of D.ROLE_IDS) {
      const r = D.role(id)!;
      expect(['basic', 'standard', 'enhanced', 'enhanced-cbl', 'enhanced-abl', 'enhanced-both']).toContain(r.level);
      expect(r.ref, id).toBeTruthy();
    }
  });
});

describe('turnaround', () => {
  it('DBS dataset 1, June 2026: 74.9% of enhanced checks within 14 days', () => {
    const t = D.onTimeShare('enhanced', '2026-06')!;
    expect(t.share).toBeCloseTo(0.7494, 4);
    expect(t.targetDays).toBe(14);
  });
  it('July 2026 averages and delayed forces', () => {
    expect(D.averageDays('enhanced').days).toBe(13.1);
    expect(D.forceDelayed('Avon & Somerset').delayed).toBe(true);
    expect(D.forceDelayed('Metropolitan Police').delayed).toBe(false);
  });
});

describe('filtering, volunteers, nations, repeat cost', () => {
  it('filtering rules from 28 October 2023', () => {
    expect(D.shows({ kind: 'adult-conviction', years: 10 }).standard).toBe(true);
    expect(D.shows({ kind: 'adult-conviction', years: 11 }).standard).toBe(false);
    expect(D.shows({ kind: 'adult-conviction', years: 30, custodial: true }).standard).toBe(true);
    expect(D.shows({ kind: 'youth-conviction', years: 5 }).standard).toBe(true);
    expect(D.shows({ kind: 'youth-conviction', years: 6 }).standard).toBe(false);
    expect(D.shows({ kind: 'adult-caution', years: 7 }).standard).toBe(false);
    expect(D.shows({ kind: 'adult-caution', years: 7, specified: true }).standard).toBe(true);
    expect(D.shows({ kind: 'youth-caution', years: 0, specified: true }).standard).toBe(false);
    expect(D.shows({ kind: 'adult-conviction', years: 2, unspent: true }).basic).toBe(true);
    expect(D.shows({ kind: 'adult-conviction', years: 2 }).basic).toBe(false);
  });
  it('volunteer test of GOV.UK', () => {
    expect(D.isVolunteer({ paid: false, benefit: false, placement: false, trainee: false, fosterCarer: false })).toBe(true);
    expect(D.isVolunteer({ paid: false, benefit: false, placement: true, trainee: false, fosterCarer: false })).toBe(false);
  });
  it('four nations for an enhanced check with barred lists', () => {
    const c = D.compareNations('enhanced-cbl');
    expect(c.map((x) => x.fee)).toEqual([41, 59, 32]);
  });
  it('taxi licence renewed every 3 years over 9 years', () => {
    const r = D.repeatCost('enhanced-both', 9, 3, 10);
    expect(r.per).toBe(51);
    expect(r.checks).toBe(3);
    expect(r.without).toBe(153);
    expect(r.withUpdate).toBe(51 + 9 * 15);
  });
  it('admin fee with VAT', () => {
    expect(D.withAdmin(41, 10, true).total).toBe(53);
    expect(D.withAdmin(41, 10, false).total).toBe(51);
  });
  it('every delayed force is in the force list', () => {
    for (const f of ['Thames Valley', 'Police Scotland', 'Dyfed-Powys']) expect(D.FORCES).toContain(f);
  });
});
