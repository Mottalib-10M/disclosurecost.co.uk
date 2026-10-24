import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'enhanced-dbs-check-cost',
  group: 'cost',
  order: 11,
  tool: { kind: 'mini:cost', props: { level: 3, nation: 0 } },
  related: ['dbs-check-cost', 'enhanced-dbs-check', 'dbs-umbrella-body', 'dbs-update-service'],
  sources: ['si_2026_985', 'gov_fee_news', 'gov_employer', 'vat_700', 'gov_update'],
  slug: 'enhanced-dbs-check-cost',
  nav: 'Enhanced DBS check cost',
  card: '£41 since 5 October 2026, the same with barred lists, plus the umbrella body fee.',
  title: 'Enhanced DBS Check Cost: £41 From 5 October 2026, Was £49.50',
  description: 'Enhanced DBS check cost: £41 with or without barred lists since 5 October 2026, down £8.50. Free for volunteers, £6 for Adult First. Add umbrella fee and VAT.',
  h1: 'What an enhanced DBS check costs now',
  intro: 'The enhanced fee, the admin fee of the umbrella body and VAT, added up.',
  resume: (h) => `An enhanced DBS check costs ${h.m(h.FEE.enhanced)} for applications received by DBS from ${h.effective}, whether or not it includes a search of the children's barred list, the adults' barred list or both. Until 4 October 2026 the fee was ${h.m(h.FEE.oldEnhanced)}: the cut of ${h.m(h.FEE.oldEnhanced - h.FEE.enhanced)} is the largest of the October 2026 change, since DBS sets each fee at the cost of delivering it. The check is free for a volunteer who is not paid, not on a placement or course leading to a job and not a paid foster carer. Two additions are common. An umbrella body or other registered body may charge an administration fee for checking your identity and sending the form, with VAT on that fee if it is VAT registered. A care provider may add the Adult First service for ${h.m(h.FEE.adultFirst)}, which can clear a worker to start under supervision. The calculator above sets the enhanced check with barred list by default: change the level or add the fee you were quoted.`,
  faqs: (h) => [
    { q: 'Is the £41 enhanced DBS fee the same with the barred lists?', a: `Yes. DBS charges ${h.m(h.FEE.enhanced)} for an enhanced check, whether it searches no barred list, one or both. Before ${h.effective} the fee was ${h.m(h.FEE.oldEnhanced)} for all of them. What changes the total is the admin fee of the body that applies, and the optional Adult First service at ${h.m(h.FEE.adultFirst)}.` },
    { q: 'My umbrella body still charges £49.50 for the DBS part: is that right?', a: `Not for an application DBS receives on or after ${h.effective}: the DBS fee is then ${h.m(h.FEE.enhanced)}. DBS asked registered bodies to update their prices before that date. Ask for an invoice showing the DBS fee and the admin fee separately, and query any DBS line above ${h.m(h.FEE.enhanced)}.` },
    { q: 'What is DBS Adult First and what does it cost?', a: `A service for adult social care providers. Alongside an enhanced check with the adults' barred list, it confirms, usually within ${h.days(h.P.rules.adultFirstDays)}, whether the person can start work under supervision or should wait for the full certificate. It costs an extra ${h.m(h.FEE.adultFirst)} on top of the ${h.m(h.FEE.enhanced)} fee.` },
    { q: 'Will the enhanced DBS fee go down again?', a: 'DBS reviews its fees every year and sets them at the cost of each service, as Managing Public Money requires. A new fee needs a statutory instrument. Nothing has been announced after the change of 5 October 2026; this page will show any new fee from the date it is laid before Parliament.' },
  ],
  body: (h) => `
<h2>Enhanced check totals for common quotes</h2>
${h.table(['Admin fee quoted', 'VAT on it', 'Total, paid role', 'Total, volunteer'], [0, 5, 10, 15, 20].map((a) => {
    const t = h.D.withAdmin(h.FEE.enhanced, a, true); const v = h.D.withAdmin(0, a, true);
    return [a ? `${h.m(a)} before VAT` : 'None', h.m(t.vat), h.m(t.total), h.m(v.total)];
  }), `Enhanced check at ${h.m(h.FEE.enhanced)}, with or without barred lists. The admin fee amounts are examples, not quotes from any body.`, ['l', 'r', 'r', 'r'])}
<p>Volunteers pay no DBS fee, but an umbrella body may still charge them its own fee: some waive it for charities, others do not. The ${h.a('dbs-check-for-volunteers', 'volunteer page')} lists the conditions.</p>
<h2>What changed on 5 October 2026</h2>
<p>The ${h.src('gov_fee_news', 'DBS announcement')} of ${h.announced} set out the new fees and the ${h.src('si_2026_985', 'SI 2026/985')} made them law. An employer paying for ${h.num(50)} enhanced checks a year saves ${h.m((h.FEE.oldEnhanced - h.FEE.enhanced) * 50)} in DBS fees. The Update Service subscription fell from ${h.m(h.FEE.oldUpdate)} to ${h.m(h.FEE.update)} a year at the same time.</p>
<h2>Paying once with the Update Service</h2>
<p>If you join the ${h.src('gov_update', 'Update Service')} within 30 days of the certificate date, each later employer in the same workforce and at the same level can check your certificate online for free. A care worker moving between two agencies in a year therefore pays one ${h.m(h.FEE.enhanced)} check and ${h.m(h.FEE.update)} of subscription, instead of two checks and two admin fees. The ${h.a('dbs-update-service', 'Update Service calculator')} does the sum over several years.</p>
<h2>In Scotland and Northern Ireland</h2>
<p>The nearest equivalents are a PVG application with Disclosure Scotland at ${h.m(h.FEE.pvgJoin)} (or ${h.m(h.FEE.scLevel2)} for a Level 2 disclosure outside regulated roles), and an AccessNI enhanced check at ${h.m(h.FEE.niEnhanced)}. Both have their own volunteer rules, set out on the ${h.a('pvg-scheme', 'PVG page')} and the ${h.a('access-ni-check', 'AccessNI page')}.</p>
<h2>What the cut saves an employer</h2>
${h.table(['Enhanced checks a year', 'Before 5 October 2026', 'From 5 October 2026', 'Saving'], [1, 10, 50, 250].map((n) => [h.num(n), h.m(n * h.FEE.oldEnhanced), h.m(n * h.FEE.enhanced), h.m(n * (h.FEE.oldEnhanced - h.FEE.enhanced))]), 'DBS fees only, paid applications. Volunteer checks were and remain free.', ['r', 'r', 'r', 'r'])}
<p>An employer paying for its own staff checks saves ${h.m(h.FEE.oldEnhanced - h.FEE.enhanced)} on every paid enhanced application. The admin fee of an umbrella body is not set by the regulations, so whether the full saving reaches the employer or the applicant depends on how that body has updated its prices.</p>
<p>For a care home recruiting 50 staff a year, the DBS part falls from ${h.m(50 * h.FEE.oldEnhanced)} to ${h.m(50 * h.FEE.enhanced)}. The barred list options do not change the fee: an enhanced check with the children's list, the adults' list or both costs the same ${h.m(h.FEE.enhanced)}. If a quote you receive after 5 October 2026 still shows ${h.m(h.FEE.oldEnhanced)} for the DBS part, ask the intermediary to correct it.</p>
`,
});
