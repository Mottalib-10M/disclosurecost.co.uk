import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'dbs-check-cost',
  group: 'cost',
  order: 10,
  tool: { kind: 'mini:cost', props: { level: 2, nation: 0 } },
  related: ['enhanced-dbs-check-cost', 'basic-dbs-check-cost', 'dbs-umbrella-body', 'dbs-update-service'],
  sources: ['si_2026_985', 'gov_fee_news', 'gov_employer', 'vat_700', 'ds_fees', 'ani_fees'],
  slug: 'dbs-check-cost',
  nav: 'DBS check cost',
  card: 'Fee of each level since 5 October 2026, with the admin fee and VAT added.',
  title: 'DBS Check Cost 2026: £20 Basic, £41 Enhanced, Admin Fees',
  description: 'DBS check cost since 5 October 2026: £20 basic or standard, £41 enhanced, £0 for volunteers. Add the admin fee and VAT you were quoted to see what you pay.',
  h1: 'How much is a DBS check?',
  intro: 'Pick the level and the nation, type the admin fee you were quoted: the total, line by line.',
  resume: (h) => `A DBS check costs ${h.m(h.FEE.basic)} at basic or standard level and ${h.m(h.FEE.enhanced)} at enhanced level in England and Wales, the enhanced price being the same with or without a search of the barred lists. These fees apply to applications received from ${h.effective}, under SI 2026/985; before that the prices were ${h.m(h.FEE.oldBasic)} and ${h.m(h.FEE.oldEnhanced)}. Standard and enhanced checks are free for volunteers who meet the GOV.UK test, while a basic check is always paid. Most people do not pay the DBS fee alone: a responsible organisation or umbrella body handles the form and may add an administration fee, which DBS neither sets nor caps, plus VAT on that fee if the body is VAT registered. In Scotland a Level 1 disclosure costs ${h.m(h.FEE.scLevel1)} and joining the PVG scheme ${h.m(h.FEE.pvgJoin)}; in Northern Ireland AccessNI charges ${h.m(h.FEE.niBasic)} or ${h.m(h.FEE.niEnhanced)}.`,
  faqs: (h) => [
    { q: 'Why was I charged more than £41 for an enhanced check?', a: `The ${h.m(h.FEE.enhanced)} is only the DBS part. An umbrella body or registered body that checks your identity and sends the form can add its own fee, and VAT on it if registered. An application received before ${h.effective} also paid the old fee of ${h.m(h.FEE.oldEnhanced)}. Ask for the split between the DBS fee and the admin fee.` },
    { q: 'Is there VAT on a DBS check?', a: `Not on the DBS fee itself, which an intermediary passes on at cost. Its own admin fee is a charge for its service: a VAT-registered body adds ${h.pc(h.FEE.vat, 0)} to that part only. Check whether a quote is before or after VAT, and set the calculator accordingly.` },
    { q: 'Can my employer make me pay for my DBS check?', a: 'Practice varies and GOV.UK sets no rule on who pays. Some employers cover every check they ask for and others pass the fee on to the person they recruit. Ask before you apply, get the answer in writing, and ask for the split between the DBS fee and any admin fee so you know what you are paying for.' },
    { q: 'Is the barred list check extra?', a: `No. An enhanced check costs ${h.m(h.FEE.enhanced)} whether or not it includes a search of the children's list, the adults' list or both. Only the Adult First service, which can clear a care worker to start under supervision within about ${h.days(h.P.rules.adultFirstDays)}, costs an extra ${h.m(h.FEE.adultFirst)}.` },
  ],
  body: (h) => `
<h2>Every fee in one table</h2>
${h.table(['Check', 'From 5 October 2026', 'Until 4 October 2026', 'Volunteer'], [
    ['Basic', h.m(h.FEE.basic), h.m(h.FEE.oldBasic), h.m(h.FEE.basic)],
    ['Standard', h.m(h.FEE.standard), h.m(h.FEE.oldStandard), h.m(0)],
    ['Enhanced', h.m(h.FEE.enhanced), h.m(h.FEE.oldEnhanced), h.m(0)],
    ['Enhanced with barred lists', h.m(h.FEE.enhanced), h.m(h.FEE.oldEnhanced), h.m(0)],
    ['Adult First (on top)', h.m(h.FEE.adultFirst), h.m(h.FEE.adultFirst), h.m(h.FEE.adultFirst)],
    ['Update Service, a year', h.m(h.FEE.update), h.m(h.FEE.oldUpdate), h.m(0)],
  ], 'England and Wales. Fees of SI 2026/985 and SI 2024/1111, before any admin fee.', ['l', 'r', 'r', 'r'])}
<p>The fee that counts is the one in force when DBS receives the application. A form started in September and submitted after ${h.effective} pays the lower fee. The ${h.src('gov_fee_news', 'DBS announcement')} asked registered bodies and responsible organisations to update their systems and customer information before that date.</p>
<h2>What the admin fee pays for</h2>
<p>An employer asking for fewer than ${h.num(h.P.rules.umbrellaThreshold)} standard or enhanced checks a year cannot apply to DBS directly: it uses an umbrella body. The same goes for anyone self-employed. The umbrella body verifies your identity documents, checks the form, answers DBS queries and sends the result to the employer. That work is what its admin fee pays for. Fees differ a lot from one body to another, and some charge more for a paper application than an online one. The calculator takes the figure you were quoted because no official list of these fees can be read automatically.</p>
<p>Under ${h.src('vat_700', 'HMRC VAT Notice 700, section 25')}, a fee paid to a third party as your agent can stay outside VAT when the conditions are met, while the agent's own charge follows its VAT status. That is why you can see a total such as ${h.m(h.FEE.enhanced)} + ${h.m(10)} + ${h.m(2)} on an invoice: DBS fee, admin fee, VAT on the admin fee alone.</p>
<!--tool:mini:oldnew|{"level":2,"n":12}-->
<h2>Scotland and Northern Ireland</h2>
<p>If the job is in Scotland, the check comes from ${h.src('ds_fees', 'Disclosure Scotland')}: ${h.m(h.FEE.scLevel1)} for a Level 1 disclosure, ${h.m(h.FEE.scLevel2)} for Level 2, ${h.m(h.FEE.pvgJoin)} to join the PVG scheme and ${h.m(h.FEE.pvgExisting)} for an existing member. If it is in Northern Ireland, ${h.src('ani_fees', 'AccessNI')} charges ${h.m(h.FEE.niBasic)} for basic and standard checks and ${h.m(h.FEE.niEnhanced)} for enhanced ones. What matters is where the work is done, not where you live. The ${h.a('criminal-record-check-uk', 'four-nation page')} sets the same role side by side.</p>
<h2>Keeping the cost down</h2>
<p>Three things lower the bill without cutting corners. Ask whether the role really needs the level requested: a role that does not meet the eligibility guidance cannot lawfully get a higher check. If you volunteer, check the five conditions of the ${h.a('dbs-check-for-volunteers', 'volunteer test')}. And if you expect to change employer, agency or client, subscribe to the ${h.a('dbs-update-service', 'Update Service')} within 30 days of your certificate: one ${h.m(h.FEE.update)} subscription can replace several new checks.</p>
`,
});
