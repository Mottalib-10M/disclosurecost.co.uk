import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'dbs-check-for-taxi-drivers',
  group: 'situations',
  order: 53,
  tool: { kind: 'mini:taxi', props: { years: 9, every: 3, admin: 0 } },
  related: ['dbs-update-service', 'dbs-barred-list', 'enhanced-dbs-check-cost', 'dbs-check-renewal'],
  sources: ['gov_elig_other', 'gov_update', 'si_2026_985', 'gov_elig_adults_barred'],
  slug: 'dbs-check-for-taxi-drivers',
  nav: 'DBS check for taxi drivers',
  card: 'Enhanced with both lists for a taxi or private hire licence, and the cost over years.',
  title: 'DBS Check for Taxi Drivers: Both Barred Lists, Licence Cost',
  description: 'DBS check for taxi and private hire drivers: enhanced with both barred lists, £41 since 5 October 2026, asked by the council. Cost over several licences.',
  h1: 'DBS check for taxi and private hire drivers',
  intro: 'Set how long you will drive and how often your council wants a new check: the total.',
  resume: (h) => `A taxi or private hire driver applying for or renewing a licence can be asked by the licensing authority for an enhanced DBS check with both the children's and the adults' barred lists. The DBS guidance for the "other" workforce lists taxi and private hire licences among the few roles that reach both lists without being regulated activity, and the application must be submitted by the licensing authority or organisation in the Other workforce. The DBS fee is ${h.m(h.FEE.enhanced)} since ${h.effective}, down from ${h.m(h.FEE.oldEnhanced)}; a council or its chosen umbrella body may add an admin fee. How often a new check is needed is set by each council, often at each licence renewal or on a fixed cycle, and many accept the Update Service between checks. At ${h.m(h.FEE.update)} a year, the subscription lets the council check your certificate online. The calculator above compares a new check at each renewal with one check plus the subscription. Driving adults who cannot travel alone to hospital is a different case: patient transport drivers reach the adults' list, but the guidance excludes taxi drivers from that activity.`,
  faqs: (h) => [
    { q: 'Do taxi drivers need an enhanced DBS check?', a: 'Not by national law alone: the law allows a licensing authority to ask for an enhanced check with both barred lists when it decides whether to grant or renew a taxi or private hire licence. In practice councils do ask. The council sets the frequency and whether it accepts the Update Service.' },
    { q: 'Who pays for a taxi driver DBS check?', a: `Usually the driver, as part of the licence application. The DBS fee is ${h.m(h.FEE.enhanced)}; the council or the umbrella body it uses may add an admin fee, and the licence fee itself is separate. Some private hire operators reimburse their drivers, but nothing obliges them to.` },
    { q: 'Can I use a DBS certificate from my care job for a taxi licence?', a: 'Generally not: a taxi licence check is submitted in the Other workforce with both barred lists, while a care job certificate is in the adult workforce. The Update Service only helps when the new role needs the same level and workforce, so the council will usually ask for its own application.' },
    { q: 'Does a private hire operator need a DBS check?', a: 'Operator licences are set by each council. The national guidance used here names drivers of taxis and private hire vehicles for an enhanced check with both lists; for an operator or a dispatcher, a council may ask for a basic check. Check the licensing policy of the council where you apply.' },
  ],
  body: (h) => `
<h2>Cost over several licences</h2>
${h.table(['Years driving', 'New check every', 'Checks without Update Service', 'Without', 'With Update Service'], [[3, 1], [6, 3], [9, 3], [12, 3], [10, 1]].map(([y, e]) => { const r = h.D.repeatCost('enhanced-both', y, e); return [h.num(y), `${h.num(e)} year${e === 1 ? '' : 's'}`, h.num(r.checks), h.m(r.without), h.m(r.withUpdate)]; }), `DBS fee ${h.m(h.FEE.enhanced)} and Update Service ${h.m(h.FEE.update)} a year, no admin fee. Only if the council accepts status checks between applications.`, ['r', 'l', 'r', 'r', 'r'])}
<p>The subscription is cheaper when the council would otherwise ask for a new check more often than every ${h.num(Math.floor(h.FEE.enhanced / h.FEE.update))} years or so: ${h.num(Math.floor(h.FEE.enhanced / h.FEE.update))} years of subscription cost ${h.m(Math.floor(h.FEE.enhanced / h.FEE.update) * h.FEE.update)}, against ${h.m(h.FEE.enhanced)} for one check before any admin fee. If your council insists on a new certificate at every renewal whatever your status, the subscription saves nothing.</p>
<h2>The rule in the guidance</h2>
<p>The ${h.src('gov_elig_other', 'DBS guidance for the "other" workforce')} says that when renewing or applying for a taxi or private hire vehicle licence, the licensing organisation can ask applicants to apply for an enhanced check with both barred lists, submitted in the Other workforce. The same section covers pedicab licences in London. It is the licensing authority, not the driver, that is entitled to the check.</p>
<h2>Patient transport and school runs</h2>
<p>Two driving jobs follow other rules. Driving adults who cannot travel alone to or from health care, personal care or social work is regulated activity with adults, so drivers and assistants of patient transport services reach the adults' barred list, but the ${h.src('gov_elig_adults_barred', 'adults guidance')} expressly leaves taxi and private hire drivers out of that activity. Driving children for a school or an organisation on more than three days in 30 days is regulated activity with children. A taxi driver doing contracted school runs can therefore be asked for a check by both the council and the contracting authority. The ${h.a('dbs-barred-list', 'barred list page')} explains both lists.</p>
<h2>Before you apply</h2>
<p>Ask your council three things: which umbrella body or route it uses, whether it accepts the Update Service between checks, and how often it wants a new certificate. Those answers, not the national fee, decide your total. A driver licensed by two councils may be asked for a check by each of them.</p>
<p>Keep each council's answer in writing.</p>
`,
});
