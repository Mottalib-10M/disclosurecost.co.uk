import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'basic-dbs-check',
  group: 'levels',
  order: 20,
  tool: { kind: 'mini:basicwhere', props: { nation: 0 } },
  related: ['basic-dbs-check-cost', 'dbs-check-online', 'basic-disclosure-scotland', 'what-shows-on-a-dbs-check'],
  sources: ['gov_basic', 'gov_apply_role', 'gov_employer', 'ds_basic', 'ani_home'],
  slug: 'basic-dbs-check',
  nav: 'Basic DBS check',
  card: 'Who can ask for one, how to apply yourself, what it shows and how fast it comes.',
  title: 'Basic DBS Check: Apply Online for £20, What It Shows',
  description: 'Basic DBS check: shows unspent convictions only. Apply yourself on GOV.UK for £20 from age 16, usually processed in 3 days. Scotland and NI run their own.',
  h1: 'Basic DBS check: what it is and how to get one',
  intro: 'Choose where the job is: who issues the basic check, its price and how long it takes.',
  resume: (h) => `A basic DBS check is the lowest level of criminal record check in England and Wales and the only one you can request for yourself without an employer. It lists unspent convictions and conditional cautions, nothing else: spent convictions, cautions that have lapsed and police intelligence never appear. Any employer can ask for one, whatever the job, and so can a landlord, a client or a licensing body. You apply on GOV.UK from the age of ${h.P.rules.basicMinAge}, prove your identity with GOV.UK One Login, give your addresses for the last ${h.P.rules.basicAddressYears} years and pay ${h.m(h.FEE.basic)}, the fee in force since ${h.effective}. GOV.UK says an application usually takes up to ${h.days(h.P.rules.basicDirectDays)} to process before the paper certificate is posted. In ${h.month(h.lastMonth)}, ${h.pc(h.on('basic').share)} of basic certificates went out within the ${h.days(h.on('basic').targetDays)} target. If the job is in Scotland or Northern Ireland, the basic check comes from Disclosure Scotland or AccessNI instead.`,
  faqs: (h) => [
    { q: 'Can I apply for a basic DBS check myself?', a: `Yes. A basic check is the one level an individual can request directly, on the ${'GOV.UK'} service, for ${h.m(h.FEE.basic)}. You need GOV.UK One Login, your addresses for the last ${h.P.rules.basicAddressYears} years and, if you have them, a passport, driving licence and National Insurance number. Your employer may also request it for you through a responsible organisation.` },
    { q: 'What is the difference between a basic and a standard DBS check?', a: 'A basic check shows only unspent convictions and conditional cautions. A standard check also shows spent convictions and cautions that are not filtered out, and only roles listed in the law can ask for it, such as solicitors on entry or security licences. A basic check can be asked for by any employer for any role.' },
    { q: 'How do I show a basic certificate to an employer online?', a: 'Basic certificates cannot join the Update Service. Instead, set up a DBS online account: you can see the certificate there and share it with an employer, who views it online. The paper certificate is posted to you as well, so you can also show the original with its security features.' },
    { q: 'Do I need a basic DBS check for a warehouse or delivery job?', a: 'Only if the employer asks. No law makes a basic check compulsory for most jobs; it is a choice of the employer, often for roles with access to homes, goods or money. If the employer wants more than a basic check, the role must be one listed in the eligibility guidance.' },
  ],
  body: (h) => `
<h2>What a basic certificate shows</h2>
<p>The certificate lists convictions and conditional cautions that are not yet spent under the Rehabilitation of Offenders Act 1974. A spent conviction does not appear, however serious, and neither do simple cautions, which are spent at once. Some conditional cautions lapse after three months, as the ${h.src('gov_basic', 'GOV.UK basic check page')} notes. A basic check never includes the barred lists or information from local police. When nothing is unspent, the certificate says so: most certificates are clear. The ${h.a('what-shows-on-a-dbs-check', 'page on what each level shows')} compares the four levels and the filtering rules of the higher ones.</p>
<h2>The two ways to get one</h2>
<p>You can apply yourself on GOV.UK, which costs exactly ${h.m(h.FEE.basic)} and needs no intermediary. Or an employer requests it on your behalf through one of the responsible organisations registered with DBS, which may add an administration fee on top of the ${h.m(h.FEE.basic)}. An organisation that requests more than ${h.num(h.P.rules.responsibleOrgThreshold)} basic checks a year can become a responsible organisation itself, according to the ${h.src('gov_employer', 'GOV.UK employer page')}.</p>
${h.table(['Route', 'Who starts it', 'Cost', 'Certificate goes to'], [
    ['GOV.UK basic check service', 'You', h.m(h.FEE.basic), 'You, by post and in your online account'],
    ['Responsible organisation', 'Your employer', `${h.m(h.FEE.basic)} + any admin fee`, 'You; the organisation is told the outcome'],
  ], 'Basic DBS checks for a job in England or Wales, fees since 5 October 2026.', ['l', 'l', 'r', 'l'])}
<h2>Wherever you live, apply where the job is</h2>
<p>A basic DBS check is for work in England and Wales. You can get one while living in Scotland or Northern Ireland if the job is in England or Wales. For a job in Scotland, the equivalent is a ${h.a('basic-disclosure-scotland', 'Level 1 disclosure')} at ${h.m(h.FEE.scLevel1)}; in Northern Ireland, an AccessNI basic check at ${h.m(h.FEE.niBasic)}. None of them covers time spent abroad: an employer can ask for a certificate from another country as well.</p>
<h2>How long it is valid</h2>
<p>A basic certificate has no expiry date. It shows what was on record on the day it was issued, and each employer decides how recent a certificate it will accept. Many ask for one issued in the last few months. Because a basic certificate cannot be added to the Update Service, a new check is the only way to bring it up to date; the ${h.a('basic-dbs-check-cost', 'basic cost page')} shows what repeated checks add up to.</p>
`,
});
