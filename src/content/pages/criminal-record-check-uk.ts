import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'criminal-record-check-uk',
  group: 'nations',
  order: 64,
  tool: { kind: 'mini:nations', props: { level: 3 } },
  related: ['access-ni-check', 'pvg-scheme', 'basic-disclosure-scotland', 'dbs-check-cost'],
  sources: ['gov_fee_news', 'ds_fees', 'ds_levels', 'ani_fees', 'gov_apply_role'],
  slug: 'criminal-record-check-uk',
  nav: 'Criminal record checks by nation',
  card: 'DBS, Disclosure Scotland and AccessNI side by side, level by level.',
  title: 'Criminal Record Check in the UK: DBS, Scotland and AccessNI',
  description: 'Criminal record check across the UK: DBS in England and Wales, Disclosure Scotland and AccessNI compared. Fees, names of levels, waits and where to apply.',
  h1: 'Criminal record checks across the four UK nations',
  intro: 'Pick a level: the fee and the latest wait for the same check in each nation.',
  resume: (h) => `The UK has three bodies for criminal record checks, and the one you use depends on where the job is, not where you live. DBS covers England and Wales, Disclosure Scotland covers Scotland and AccessNI covers Northern Ireland. The levels broadly match. A basic check, showing unspent convictions, costs ${h.m(h.FEE.basic)} from DBS since ${h.effective}, ${h.m(h.FEE.scLevel1)} for a Level 1 disclosure in Scotland and ${h.m(h.FEE.niBasic)} from AccessNI. A standard check costs ${h.m(h.FEE.standard)} from DBS, ${h.m(h.FEE.scLevel2)} for a Scottish Level 2 and ${h.m(h.FEE.niStandard)} in Northern Ireland. An enhanced check costs ${h.m(h.FEE.enhanced)} from DBS and ${h.m(h.FEE.niEnhanced)} from AccessNI, while Scotland uses Level 2 with a barred list check for specific activities and the PVG scheme, at ${h.m(h.FEE.pvgJoin)} to join, for regulated roles. Volunteers pay nothing for most checks above basic in all three systems. Only DBS has a subscription, the Update Service, at ${h.m(h.FEE.update)} a year; only PVG is a membership that keeps checking you for five years.`,
  faqs: (h) => [
    { q: 'Does a DBS check cover Scotland and Northern Ireland?', a: 'A DBS check is for roles in England and Wales. A Scottish employer asks for a Disclosure Scotland check and a Northern Ireland employer for an AccessNI check, each under its own law. Someone working in two nations may need two checks, one from each body, even for the same type of work.' },
    { q: 'Which UK criminal record check is the cheapest?', a: `AccessNI, at ${h.m(h.FEE.niBasic)} for basic and standard checks and ${h.m(h.FEE.niEnhanced)} for enhanced ones. The DBS basic and standard fees are ${h.m(h.FEE.basic)} since the October 2026 cut. Scotland charges ${h.m(h.FEE.scLevel1)} for Level 1 and Level 2. But you cannot choose: the check depends on where the job is.` },
    { q: 'Is Wales covered by DBS?', a: `Yes. DBS covers England and Wales together, with the same levels, the same fees (${h.m(h.FEE.basic)} basic, ${h.m(h.FEE.enhanced)} enhanced since October 2026) and the same Update Service. A role in Wales uses the DBS eligibility guidance, the GOV.UK basic service or an umbrella body, exactly as in England.` },
    { q: 'Can I use a check from another UK nation for a job abroad?', a: 'It depends on the country asking. A basic-level check is the one an individual can request alone, and mygov.scot mentions verifying a Level 1 disclosure for a visa application. Ask the embassy or the employer abroad which check it accepts and what form of verification it wants before you pay.' },
  ],
  body: (h) => `
<h2>The levels nation by nation</h2>
${h.table(['Level', 'England and Wales (DBS)', 'Scotland', 'Northern Ireland (AccessNI)'], [
    ['Basic', `Basic, ${h.m(h.FEE.basic)}`, `Level 1, ${h.m(h.FEE.scLevel1)}`, `Basic, ${h.m(h.FEE.niBasic)}`],
    ['Standard', `Standard, ${h.m(h.FEE.standard)}`, `Level 2, ${h.m(h.FEE.scLevel2)}`, `Standard, ${h.m(h.FEE.niStandard)}`],
    ['Enhanced', `Enhanced, ${h.m(h.FEE.enhanced)}`, `Level 2, ${h.m(h.FEE.scLevel2)}`, `Enhanced, ${h.m(h.FEE.niEnhanced)}`],
    ['Enhanced with barred lists', `Same ${h.m(h.FEE.enhanced)}`, `PVG, ${h.m(h.FEE.pvgJoin)} to join, ${h.m(h.FEE.pvgExisting)} for a member`, `Enhanced, ${h.m(h.FEE.niEnhanced)}`],
    ['Keeping it current', `Update Service, ${h.m(h.FEE.update)} a year`, 'PVG membership, five years', 'New check per role'],
  ], 'Official fee pages read on 24 October 2026. Scotland: Level 2 covers the former standard and enhanced disclosures, with or without a barred list check.', ['l', 'l', 'l', 'l'])}
<h2>Where to apply</h2>
<p>The rule is the location of the role. For England or Wales, the ${h.src('gov_apply_role', 'GOV.UK guidance')} applies, whatever your address. For Scotland, the ${h.src('ds_levels', 'mygov.scot disclosure levels')} apply, and an employer in Scotland cannot ask for a DBS certificate instead of PVG for a regulated role. For Northern Ireland, ${h.src('ani_fees', 'AccessNI')} applies. Someone with jobs in two nations may need two checks.</p>
<h2>Fees and waits compared</h2>
<p>DBS cut its fees on ${h.effective}, as its ${h.src('gov_fee_news', 'announcement')} set out, so England and Wales are no longer the most expensive for an enhanced check: AccessNI charges ${h.m(h.FEE.niEnhanced)} and Scotland ${h.m(h.FEE.pvgJoin)} for joining PVG (${h.src('ds_fees', 'Disclosure Scotland fees')}). On waits, the latest published averages are ${h.days(h.avg('enhanced').days)} for an enhanced DBS check in ${h.month(h.police.dataMonth)}, ${h.days(h.FEES.scotland.processing.averageDays)} across Disclosure Scotland from April to June 2026 and ${h.days(h.FEES.northernIreland.turnaround.averageDays.enhanced)} for an AccessNI enhanced check in the week of ${h.date(h.FEES.northernIreland.turnaround.week)}. The calculator above gives the figures for each level.</p>
<h2>Who starts the application</h2>
${h.table(['Level', 'England and Wales', 'Scotland', 'Northern Ireland'], [
    ['Basic', 'You, on GOV.UK', 'You, on mygov.scot', 'You, on nidirect'],
    ['Standard', 'Employer, registered or umbrella body', 'The organisation (Level 2)', 'Registered body'],
    ['Enhanced or PVG', 'Employer, registered or umbrella body', 'The organisation (PVG)', 'Registered body'],
    ['Self-employed in an eligible role', 'You, through an umbrella body', 'You, for PVG', 'You, through an umbrella body'],
  ], 'Official routes read on 24 October 2026.', ['l', 'l', 'l', 'l'])}
<p>Only the basic level is open to anyone in all three systems, from age 16 in England, Wales and Northern Ireland. Above it, the organisation recruiting you decides and applies, which is why a site promising an enhanced check to anyone who asks is not following the rules.</p>
<h2>What moves between nations</h2>
<p>Very little. A DBS certificate on the Update Service can be checked by another employer in England or Wales, but a Scottish employer recruiting for a regulated role needs PVG membership, and an employer in Northern Ireland asks AccessNI, whose certificates are valid only for the recruitment to one role. In the other direction, PVG membership means nothing to an English employer, which asks for a DBS check. Someone who works across a border, such as a locum, an agency worker or a coach travelling to events, should expect one check per nation where they work, and should budget for each fee.</p>
<h2>Fees in context</h2>
<p>Since the October 2026 cut, the DBS basic and standard fees are ${h.m(h.FEE.basic)}, between the ${h.m(h.FEE.niBasic)} of AccessNI and the ${h.m(h.FEE.scLevel1)} of Disclosure Scotland. At enhanced level, AccessNI is still the cheapest at ${h.m(h.FEE.niEnhanced)}. Volunteers pay nothing for most checks above basic in all three systems, under each body's own definition.</p>
`,
});
