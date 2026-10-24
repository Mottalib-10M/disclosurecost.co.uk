import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'dbs-check-for-volunteers',
  group: 'situations',
  order: 52,
  tool: { kind: 'mini:volunteer', props: { paid: 0, placement: 0, foster: 0, level: 3 } },
  related: ['dbs-check-cost', 'dbs-eligibility', 'pvg-scheme', 'access-ni-check'],
  sources: ['gov_update', 'gov_employer', 'gov_fee_news', 'ds_fees', 'ani_fees'],
  slug: 'dbs-check-for-volunteers',
  nav: 'DBS check for volunteers',
  card: 'The five conditions for a free check, and what volunteers still pay.',
  title: 'DBS Check for Volunteers: Free Standard and Enhanced Checks',
  description: 'DBS check for volunteers: standard and enhanced are free, basic costs £20. The five GOV.UK conditions, the free Update Service, and the Scotland and NI rules.',
  h1: 'DBS checks for volunteers: what is free and what is not',
  intro: 'Answer three questions: whether you count as a volunteer for DBS, and what you pay.',
  resume: (h) => `Standard and enhanced DBS checks are free for volunteers, and so is the Update Service, while a basic check costs ${h.m(h.FEE.basic)} for everyone. The ${h.effective} fee change kept that rule: "volunteer checks remain free of charge", said DBS. To count as a volunteer, GOV.UK sets five conditions: you are not paid for the role beyond approved travel and out-of-pocket expenses; you do not benefit financially from it; you are not on a work placement; you are not a trainee or studying for a qualification that leads to a full-time role; and you are not a paid foster or kinship carer, or a member of their household. Eligibility for the level does not change: an unpaid role must meet the same tests as a paid one. The DBS fee being zero does not stop an umbrella body charging its own admin fee, although many volunteer organisations negotiate it away. In Scotland, PVG membership is free for volunteers in a qualifying organisation; in Northern Ireland, AccessNI does not charge qualifying volunteers for standard and enhanced checks.`,
  faqs: (h) => [
    { q: 'Do volunteers pay for a DBS check?', a: `Not the DBS fee for a standard or enhanced check, which is ${h.m(0)} for a volunteer meeting the five GOV.UK conditions. A basic check costs ${h.m(h.FEE.basic)} even for volunteers. An umbrella body may still charge an admin fee, so ask the organisation whether it covers it.` },
    { q: 'Is a student on placement a volunteer for DBS?', a: 'No. Someone on a work placement, or a trainee or student whose course leads to a full-time role, does not meet the volunteer definition, even when unpaid. Their standard or enhanced check is charged at the normal fee, often paid by the university, college or placement provider.' },
    { q: 'Can I use a free volunteer DBS check for a paid job?', a: 'A certificate issued for a volunteer role is a normal certificate, but the paid employer will usually want one for its own role. The new employer can do a free status check if you are on the Update Service and the role needs the same level and workforce, unless it asks for a new check, which is then charged at the normal fee.' },
    { q: 'Are expenses payments a problem for the volunteer status?', a: 'Not if they are approved travel and out-of-pocket expenses only. Anything beyond that, such as an honorarium, a payment per session or a benefit in kind with real value, can count as being paid or benefiting financially, and then the role no longer qualifies for a free check.' },
  ],
  body: (h) => `
<h2>Volunteer fees in the four nations</h2>
${h.table(['Nation', 'Basic', 'Standard or Level 2', 'Enhanced or PVG', 'Update Service'], [
    ['England and Wales', h.m(h.FEE.basic), h.m(0), h.m(0), h.m(0)],
    ['Scotland', h.m(h.FEE.scLevel1), `${h.m(h.FEE.scLevel2)} (Level 2)`, 'PVG free in a qualifying organisation', 'No equivalent'],
    ['Northern Ireland', h.m(h.FEE.niBasic), 'Free if qualifying', 'Free if qualifying', 'No equivalent'],
  ], 'Official volunteer rules read on 24 October 2026. Admin fees of intermediaries are separate.', ['l', 'r', 'l', 'l', 'l'])}
<p>The ${h.src('gov_update', 'GOV.UK Update Service page')} carries the five conditions of the volunteer definition, which DBS also applies to the fee of the check. ${h.src('ani_fees', 'AccessNI')} adds a limit of its own: a volunteer who works directly for a statutory organisation, or for a non-profit delivering statutory services under contract, is charged. ${h.src('ds_fees', 'Disclosure Scotland')} keeps PVG membership free for volunteers in a qualifying voluntary organisation.</p>
<h2>Same rules on eligibility</h2>
<p>Being unpaid does not open a higher level. A volunteer who helps at a children's club once a month is in the same position as a paid worker doing the same: eligible for an enhanced check without the barred list, because the period condition of more than three days in 30 is not met. A volunteer driver taking older people to hospital appointments reaches the adults' barred list, as the guidance example of a patient transport volunteer shows. The ${h.a('dbs-eligibility', 'eligibility page')} runs the tests.</p>
<h2>For the organisation</h2>
<p>A charity, club or church with fewer than ${h.num(h.P.rules.umbrellaThreshold)} checks a year goes through an umbrella body. Ask its admin fee for volunteer applications before choosing: the DBS part is free, so the admin fee is the whole cost. Ask volunteers to join the free Update Service: the next organisation they help can check their certificate online.</p>
<h2>Volunteers in the Update Service</h2>
<p>The ${h.src('gov_update', 'Update Service page')} says there is no charge for the subscription if you are a volunteer, using the same five conditions. A volunteer who later takes a paid role in the same workforce and at the same level can let the new employer check the certificate's status, unless that employer asks for a new check. The page does not say how a free subscription is treated once the role is paid, so ask DBS customer services before relying on it.</p>
<p>Volunteer organisations can confirm the rules with DBS customer services.</p>
`,
});
