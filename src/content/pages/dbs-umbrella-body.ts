import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'dbs-umbrella-body',
  group: 'cost',
  order: 13,
  tool: { kind: 'mini:cost', props: { level: 2, nation: 0, admin: 10, exvat: 1 } },
  related: ['dbs-check-cost', 'enhanced-dbs-check-cost', 'dbs-check-online', 'dbs-check-for-self-employed'],
  sources: ['gov_employer', 'gov_umbrella', 'vat_700', 'vat_rates', 'gov_self_employed'],
  slug: 'dbs-umbrella-body',
  nav: 'DBS umbrella bodies',
  card: 'What an umbrella body does, when you must use one, and how its admin fee and VAT add up.',
  title: 'DBS Umbrella Body: Admin Fees, VAT and When You Need One',
  description: 'DBS umbrella body explained: required under 100 checks a year, sets its own admin fee, VAT on that fee but not on the DBS fee passed on. Add up your real total.',
  h1: 'DBS umbrella bodies and what they charge',
  intro: 'Enter the admin fee you were quoted: the total with the DBS fee and any VAT.',
  resume: (h) => `An umbrella body is an organisation registered with DBS that submits standard and enhanced applications for employers, charities and self-employed people who are not registered themselves. GOV.UK says an organisation making fewer than ${h.num(h.P.rules.umbrellaThreshold)} checks a year must use one; above that it can register with DBS directly. The umbrella body checks the applicant's identity documents, makes sure the role is eligible for the level asked and sends the application. It passes on the DBS fee, ${h.m(h.FEE.standard)} for a standard check and ${h.m(h.FEE.enhanced)} for an enhanced check since ${h.effective}, and adds an admin fee that it sets freely. HMRC rules on disbursements mean the DBS fee can be passed on without VAT when it is the applicant's or employer's own cost, while the admin fee is the umbrella body's service and carries VAT at ${h.pc(h.FEE.vat, 0)} if it is VAT-registered. A quote "from £10 + VAT" is therefore ${h.m(h.D.withAdmin(h.FEE.enhanced, 10, true).total)} for an enhanced check.`,
  faqs: (h) => [
    { q: 'Do I have to use an umbrella body for a DBS check?', a: `For a basic check, no: you can apply yourself on GOV.UK for ${h.m(h.FEE.basic)}. For standard and enhanced checks, an employer making fewer than ${h.num(h.P.rules.umbrellaThreshold)} a year must use one, and a self-employed person in an eligible role applies through one. Larger employers can register with DBS instead.` },
    { q: 'How do I find an umbrella body?', a: 'GOV.UK has a search of registered umbrella bodies, with filters such as the area covered and whether they process checks for self-employed people or volunteers. Use it to confirm that a company is registered before sharing identity documents, and ask each one for its admin fee in writing.' },
    { q: 'Why do umbrella body admin fees vary so much?', a: 'DBS does not set them. They pay for identity checking, the online form, support and the umbrella body\'s margin. Some charge more for a check done entirely online or for faster identity checks, and some offer reduced or no fees for volunteer applications. Compare what the fee includes, not only the price.' },
    { q: 'Does the umbrella body speed up my DBS check?', a: 'Only for its own part: checking documents and submitting the form without errors. Once the application reaches DBS and the police, the time is the same through any route. The latest averages are on the waiting time page of this site.' },
  ],
  body: (h) => `
<h2>Totals for a quoted admin fee</h2>
${h.table(['Admin fee quoted', 'Basic', 'Standard', 'Enhanced'], [[0, false], [10, true], [20, true], [30, true]].map(([a, ex]) => [a === 0 ? 'No admin fee' : `${h.m(a as number)} + VAT`, h.m(h.D.withAdmin(h.FEE.basic, a as number, ex as boolean).total), h.m(h.D.withAdmin(h.FEE.standard, a as number, ex as boolean).total), h.m(h.D.withAdmin(h.FEE.enhanced, a as number, ex as boolean).total)]), `Illustrative admin fees, not quotes from any company. DBS fees from 5 October 2026; VAT at ${h.pc(h.FEE.vat, 0)} on the admin fee only.`, ['l', 'r', 'r', 'r'])}
<p>The admin fees in this table and the ${h.m(10)} in the calculator are examples to show the arithmetic, not a market price: the GOV.UK search does not publish fees, so enter the figure you were quoted.</p>
<h2>What the rules say</h2>
<p>The ${h.src('gov_employer', 'GOV.UK employer guidance')} sets the threshold: under ${h.num(h.P.rules.umbrellaThreshold)} standard or enhanced checks a year, use an umbrella body; for basic checks, an employer making more than ${h.num(h.P.rules.responsibleOrgThreshold)} a year can become a responsible organisation, and below that uses one. The umbrella body must check that the role is eligible for the level, and the ${h.src('gov_self_employed', 'self-employed guidance')} of January 2026 relies on it to do so for people who apply for themselves.</p>
<h2>VAT, line by line</h2>
<p>Section 25 of ${h.src('vat_700', 'VAT Notice 700')} treats a payment made on behalf of a customer as a disbursement, outside the scope of VAT, when the customer receives and uses what is paid for and the cost is passed on at its exact amount. That is how most umbrella bodies show the DBS fee: at ${h.m(h.FEE.enhanced)} with no VAT. Their admin fee is a supply of their own service, so it carries the standard rate of ${h.pc(h.FEE.vat, 0)} (${h.src('vat_rates', 'GOV.UK VAT rates')}) if the business is VAT-registered. An invoice that shows VAT on the whole amount, DBS fee included, is worth querying.</p>
<h2>Checks before you choose</h2>
<p>Ask for the admin fee per level and whether VAT is included, whether volunteer applications are charged, how identity is checked (in person, by post or online) and whether the fee covers a resubmission if the form is rejected. Confirm the company in the ${h.src('gov_umbrella', 'GOV.UK search')}.</p>
<h2>What an umbrella body cannot change</h2>
<p>An umbrella body cannot raise the level of check beyond what the eligibility guidance allows for the role, and it cannot shorten the time DBS and the police take. It cannot change the DBS fee either: ${h.m(h.FEE.enhanced)} for an enhanced check is the same through every umbrella body. What differs from one to the next is the admin fee, the way identity is checked and the help given when a form is rejected.</p>
`,
});
