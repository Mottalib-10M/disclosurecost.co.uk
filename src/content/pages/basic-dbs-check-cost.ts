import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'basic-dbs-check-cost',
  group: 'cost',
  order: 12,
  tool: { kind: 'mini:cost', props: { level: 0, nation: 0 } },
  related: ['basic-dbs-check', 'dbs-check-cost', 'dbs-check-online', 'basic-disclosure-scotland'],
  sources: ['si_2026_985', 'gov_basic', 'gov_employer', 'ds_basic', 'ani_fees'],
  slug: 'basic-dbs-check-cost',
  nav: 'Basic DBS check cost',
  card: '£20 direct, more through a company: the basic check price in the four nations.',
  title: 'Basic DBS Check Cost: £20 Since October 2026, Scotland £25',
  description: 'Basic DBS check cost: £20 since 5 October 2026 (was £21.50), £25 for a Level 1 disclosure in Scotland, £16 with AccessNI. What an online company adds on top.',
  h1: 'What a basic DBS check costs',
  intro: 'Set the nation and any fee charged by the company that applies for you.',
  resume: (h) => `A basic DBS check costs ${h.m(h.FEE.basic)} when the job is in England or Wales, down from ${h.m(h.FEE.oldBasic)} for applications received from ${h.effective}. That is the whole price if you apply yourself on the GOV.UK service: there is no admin fee, no VAT and no charge for the online account that shows the certificate. The price rises only when a company sits between you and DBS. An employer who uses a responsible organisation, or a website that applies on your behalf, pays the ${h.m(h.FEE.basic)} plus that organisation's own fee, and VAT on that fee if it is registered. Volunteers pay the full price too: unlike standard and enhanced checks, a basic check is never free. In Scotland the equivalent Level 1 disclosure costs ${h.m(h.FEE.scLevel1)}, and in Northern Ireland an AccessNI basic check costs ${h.m(h.FEE.niBasic)}. Use the calculator above to add the fee you were quoted and see the total.`,
  faqs: (h) => [
    { q: 'Why do some websites charge £40 or more for a basic check?', a: `They are not DBS. A company that applies for you charges the ${h.m(h.FEE.basic)} DBS fee plus its own service fee, sometimes for faster identity checks or handling. That can suit an employer with many staff, but an individual can apply directly on GOV.UK and pay ${h.m(h.FEE.basic)} only.` },
    { q: 'Are basic DBS checks free for volunteers?', a: `No. The volunteer exemption covers standard and enhanced checks and the Update Service only. A volunteer who needs a basic check pays ${h.m(h.FEE.basic)} like anyone else, unless the organisation covers it. In Northern Ireland AccessNI also charges volunteers for basic checks.` },
    { q: 'Did the price of a basic DBS check go down?', a: `Yes, from ${h.m(h.FEE.oldBasic)} to ${h.m(h.FEE.basic)} for applications received from ${h.effective}, under SI 2026/985. The previous fee had applied since 2 December 2024. The cut was smaller than for enhanced checks, which fell by ${h.m(h.FEE.oldEnhanced - h.FEE.enhanced)}. Applications received before that date kept the old fee.` },
    { q: 'Can I pay for a basic DBS check by card?', a: 'On the GOV.UK service you pay online during the application, by debit or credit card. When an employer or a responsible organisation applies, payment is arranged between you and them: some invoice the employer, others ask the applicant to pay the organisation directly.' },
  ],
  body: (h) => `
<h2>The price in each nation</h2>
${h.table(['Nation', 'Body', 'Product', 'Fee', 'Average wait'], ['england', 'scotland', 'northern-ireland'].map((n) => {
    const f = h.D.officialFee({ nation: n as 'england', level: 'basic' }); const w = h.D.publishedWait(n as 'england', 'basic');
    return [n === 'england' ? 'England and Wales' : h.D.NATION_LABEL[n as 'england'], f.body, f.product, h.m(f.fee), h.days(w.days)];
  }), 'Official basic check fees read on 24 October 2026. Waits: DBS police performance report, Disclosure Scotland quarter one 2026, AccessNI weekly figures.', ['l', 'l', 'l', 'r', 'r'])}
<h2>When the fee is not the whole cost</h2>
<p>An employer that wants basic checks for its staff cannot use the GOV.UK service for them: the applicant applies there for themselves. Instead it chooses a responsible organisation, which runs the identity check and the form, and receives the result. The ${h.src('gov_employer', 'GOV.UK employer page')} says the organisation may charge an administration fee. Whether you or the employer pays it depends on the employer's policy.</p>
<p>The calculator adds that fee and, if it is quoted before VAT, ${h.pc(h.FEE.vat, 0)} on the fee only. A quote of ${h.m(15)} plus VAT on a basic check comes to ${h.m(h.FEE.basic + 15 * 1.2)}, of which ${h.m(h.FEE.basic)} goes to DBS.</p>
<h2>Repeat checks add up</h2>
<p>A basic certificate cannot go on the Update Service, so a worker whose agency asks for a fresh check every year pays ${h.m(h.FEE.basic)} each time, plus any admin fee. Over five years that is ${h.m(h.FEE.basic * 5)} in DBS fees alone. If you are asked for a new certificate for a role that could lawfully get a standard or enhanced check, that higher level comes with the option of the ${h.a('dbs-update-service', 'Update Service')}, which can work out cheaper; the ${h.a('dbs-check-renewal', 'renewal page')} sets out when a new check is really needed.</p>
<h2>Scotland's Level 1 and the AccessNI basic check</h2>
<p>Since the ${h.src('ds_basic', 'Level 1 disclosure')} replaced the basic disclosure in Scotland, it costs ${h.m(h.FEE.scLevel1)} and is applied for on mygov.scot. AccessNI's basic check costs ${h.m(h.FEE.niBasic)} on ${h.src('ani_fees', 'nidirect')}, the lowest of the three. The rule is the same everywhere: apply to the body of the nation where the job is.</p>
<h2>Basic checks paid by an employer</h2>
<p>An employer asking new staff for a basic check goes through a responsible organisation; one that requests more than ${h.num(h.P.rules.responsibleOrgThreshold)} basic checks a year can become one itself, as the ${h.src('gov_employer', 'GOV.UK employer guidance')} explains. The DBS part is ${h.m(h.FEE.basic)} per check: for 25 new starters a year that is ${h.m(25 * h.FEE.basic)}, against ${h.m(25 * h.FEE.oldBasic)} before the October 2026 cut, plus any admin fee.</p>
<p>Volunteers pay the same basic fee as everyone else.</p>
`,
});
