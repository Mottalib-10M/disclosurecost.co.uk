import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'enhanced-dbs-check',
  group: 'levels',
  order: 22,
  tool: { kind: 'mini:eligibility', props: { children: 1, care: 0, adults: 0, listed: 0 } },
  related: ['dbs-barred-list', 'enhanced-dbs-check-cost', 'how-long-does-a-dbs-check-take', 'dbs-eligibility'],
  sources: ['gov_elig_children_enhanced', 'gov_elig_adults_enhanced', 'gov_elig_other', 'gov_apply_role', 'police_perf'],
  slug: 'enhanced-dbs-check',
  nav: 'Enhanced DBS check',
  card: 'Who gets an enhanced check, with or without barred lists, and why it takes longer.',
  title: 'Enhanced DBS Check: Who Qualifies, £41 Fee, Police Info',
  description: 'Enhanced DBS check: adds relevant local police information to a standard check, with or without the barred lists. Who qualifies, £41, free for volunteers.',
  h1: 'Enhanced DBS check: what it adds and who can get one',
  intro: 'Answer four questions about the role: the level the guidance allows and its fee.',
  resume: (h) => `An enhanced DBS check shows everything a standard check shows, the convictions and cautions not removed by filtering, plus any information a local police force reasonably believes is relevant to the role and ought to be included. It can be issued with or without a search of the children's barred list, the adults' barred list or both. The price is the same in every case: ${h.m(h.FEE.enhanced)} since ${h.effective}, down from ${h.m(h.FEE.oldEnhanced)}, and nothing for a volunteer. An enhanced check without barred lists is for work with children or adults that does not reach regulated activity, for example teaching children once a month, any work in a children's hospital, therapy for children, or occasional work in a school, and for some licences in the "other" workforce, such as gambling, judicial appointments and immigration advice. With barred lists, it is reserved for regulated activity. The organisation recruiting you applies; a self-employed person in an eligible role applies through an umbrella body.`,
  faqs: (h) => [
    { q: 'What does an enhanced DBS check show that a standard one does not?', a: 'Information held by local police forces, not only by the Police National Computer. A chief officer can include it when they reasonably believe it is relevant to the workforce you will work in and ought to be disclosed, following statutory guidance. It can even concern a record that the filtering rules removed from the certificate.' },
    { q: 'Can I get an enhanced DBS check without an employer?', a: 'Only if you are self-employed or a personal employee in a role that is eligible, such as a private tutor or a carer paid through direct payments, and then through an umbrella body. Otherwise the organisation recruiting you must apply. Someone who simply wants a check to show future clients can request a basic one.' },
    { q: 'Is an enhanced DBS check the same as an enhanced with barred list check?', a: `No, though both cost ${h.m(h.FEE.enhanced)}. Enhanced alone means no search of the barred lists. With a barred list check, DBS also says whether you are barred from regulated activity with children, adults or both. Only regulated activity can ask for the barred list search.` },
    { q: 'How long does an enhanced DBS check take at the moment?', a: `DBS reported an average of ${h.days(h.avg('enhanced').days)} in ${h.month(h.police.dataMonth)}, and ${h.pc(h.on('enhanced').share)} of enhanced certificates were sent within ${h.days(h.on('enhanced').targetDays)} in ${h.month(h.lastMonth)}. Checks that have to wait for a slow police force can take several weeks longer. The averages cover enhanced checks with and without barred lists together.` },
  ],
  body: (h) => `
<h2>Enhanced without barred lists: the main cases</h2>
<p>The ${h.src('gov_elig_children_enhanced', 'DBS guidance for work with children without the barred list')} lists activities carried out more than once that qualify: giving legal advice to children, any work in a children's hospital with the chance of contact with patients, regulated activity done too rarely to meet the period condition, treatment or therapy for children, and temporary or occasional work in a school, nursery or other specified establishment. The guidance gives the example of a library volunteer who teaches children to read once a month: eligible for an enhanced check, not for the barred list.</p>
<p>For adults, the ${h.src('gov_elig_adults_enhanced', 'guidance on work with adults')} works in three steps: the adult receives a listed service (residential care, sheltered housing, health care, support to live independently, a service because of age or disability) or is in a listed situation (custody, supervision by probation, a power of attorney); the role carries out a listed activity for them; and it does so often enough. A kitchen worker in a care home who never gives personal care is a typical case.</p>
<p>In the ${h.src('gov_elig_other', '"other" workforce')}, an enhanced check without barred lists goes with gambling licences, the National Lottery, immigration advisers, controlled drugs licences, maritime armed guards, judicial appointments and employment by the Crown.</p>
${h.table(['Role in the finder', 'Level', 'Section'], [...h.rolesAt('enhanced')].map((r) => [r.label, h.levelName('enhanced'), r.ref]), 'Roles of the finder that reach an enhanced check without barred lists (England and Wales).', ['l', 'l', 'l'])}
<h2>The police part</h2>
<p>An enhanced check goes to every police force covering the addresses you gave. Most return nothing; when a force holds something, a disclosure officer decides whether it is relevant and should be included. That step explains most delays. In the DBS report for ${h.month(h.police.dataMonth)}, forces took ${h.days(h.police.policeReturnAvgDays)} on average to answer, and ${h.num(h.police.delayedForces!.length)} were behind target. The ${h.a('how-long-does-a-dbs-check-take', 'waiting time page')} lets you check yours.</p>
<h2>Fee and Update Service</h2>
<p>Since ${h.effective}, an enhanced check costs ${h.m(h.FEE.enhanced)} with or without barred lists, plus any admin fee charged by an umbrella body; the ${h.a('enhanced-dbs-check-cost', 'enhanced cost page')} adds it for you. If you join the ${h.a('dbs-update-service', 'Update Service')} for ${h.m(h.FEE.update)} a year, a later employer in the same workforce can check the certificate online without a new application. It cannot replace a check at a different level or in another workforce.</p>
`,
});
