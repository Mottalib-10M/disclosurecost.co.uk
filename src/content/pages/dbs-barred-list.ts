import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'dbs-barred-list',
  group: 'levels',
  order: 25,
  tool: { kind: 'mini:eligibility', props: { children: 2, care: 0, adults: 1, listed: 0 } },
  related: ['enhanced-dbs-check', 'dbs-eligibility', 'which-dbs-check-do-i-need', 'pvg-scheme'],
  sources: ['gov_elig_children_barred', 'gov_elig_adults_barred', 'gov_elig_other', 'gov_barring', 'svga_s7'],
  slug: 'dbs-barred-list',
  nav: 'DBS barred lists',
  card: "Children's list, adults' list or both: which roles can have them searched.",
  title: "DBS Barred List Check: Children's, Adults' or Both Lists",
  description: "DBS barred list check: the children's and adults' lists, which roles can search them (regulated activity only), the £41 fee, what being barred means, referrals.",
  h1: "The DBS barred lists: children's, adults' or both",
  intro: 'Describe the role: which barred list or lists the check can include.',
  resume: (h) => `DBS keeps two barred lists: the children's barred list and the adults' barred list. A person on a list is barred from regulated activity with that group, paid or unpaid, and under the Safeguarding Vulnerable Groups Act 2006 it is an offence for a barred person to seek or do that work, and for an employer to knowingly let them. A search of the lists is part of an enhanced check, never a separate product, and costs nothing extra: ${h.m(h.FEE.enhanced)} for an enhanced check with or without barred lists since ${h.effective}. Only roles in regulated activity can have the lists searched: work with children that meets the period condition or involves care, and work with adults that involves health care, personal care, social work, help with money, help with their affairs, conveying them or managing those who do. Some roles reach both lists, such as taxi and private hire licences when the council asks. People are added after a referral from an employer, which has a legal duty to refer in some cases, or automatically after some convictions.`,
  faqs: (h) => [
    { q: 'Can I look up whether someone is on a barred list?', a: 'No. There is no public search of the barred lists. An employer sees the result only through an eligible enhanced check with a barred list search, or later through an Update Service status check on that certificate. A parent hiring a tutor directly cannot request the check: the tutor applies through an umbrella body and shows the certificate.' },
    { q: 'Can an employer check the barred list without a full DBS check?', a: `Not in general: the lists are searched as part of an enhanced check with barred lists, at ${h.m(h.FEE.enhanced)}. In adult social care, the Adult First service at ${h.m(h.FEE.adultFirst)} gives an early answer on the adults' list so that a worker can start under supervision before the full certificate arrives.` },
    { q: 'Who has to make a barring referral to DBS?', a: 'Employers and volunteer managers of people in regulated activity, and personnel suppliers such as employment agencies, must refer when they withdraw permission for someone to work in regulated activity, or would have done so had the person not left, and they think the person harmed or put at risk a child or vulnerable adult.' },
    { q: 'What is the penalty for working in regulated activity while barred?', a: 'Under section 7 of the Safeguarding Vulnerable Groups Act 2006, a barred person who seeks, offers or takes up regulated activity they are barred from commits an offence punishable by up to five years in prison. Under section 9, so does a person who knowingly lets them do it, and an agency that knowingly supplies them.' },
  ],
  body: (h) => `
<h2>Which list for which role</h2>
${h.table(['Workforce', 'List searched', 'Example roles in the finder', 'Fee'], [
    ['Child', "Children's barred list", h.rolesAt('enhanced-cbl').slice(0, 4).map((r) => r.label).join(', '), h.m(h.FEE.enhanced)],
    ['Adult', "Adults' barred list", h.rolesAt('enhanced-abl').slice(0, 4).map((r) => r.label).join(', '), h.m(h.FEE.enhanced)],
    ['Other, both lists', 'Both barred lists', h.rolesAt('enhanced-both').map((r) => r.label).join(', '), h.m(h.FEE.enhanced)],
  ], 'England and Wales, DBS eligibility guidance of 1 September 2026, fees since 5 October 2026.', ['l', 'l', 'l', 'r'])}
<p>The ${h.src('gov_elig_other', 'guidance for the "other" workforce')} names four cases that reach both lists without being regulated activity with one group: taxi and private hire licences when the licensing authority asks, hosts of related Ukrainian refugees under Homes for Ukraine, pedicab licences in London, and registered health professionals assessing children or vulnerable adults for the Department for Work and Pensions.</p>
<h2>Regulated activity, in short</h2>
<p>With children (${h.src('gov_elig_children_barred', 'guidance')}): teaching, training, instructing, caring for or supervising children, advising them, driving them or moderating an online service mainly for them, on more than three days in 30 days or overnight between 2am and 6am; any health or personal care; registering as a foster carer or childminder; managing people who do these things day to day. With adults (${h.src('gov_elig_adults_barred', 'guidance')}): health care, personal care, social work, help with cash, bills or shopping because of age, illness or disability, help with their affairs, conveying them when they cannot travel alone, and the day-to-day management of all these. For adults, once is enough.</p>
<h2>How people end up on a list</h2>
<p>Most barring follows a referral. The ${h.src('gov_barring', 'GOV.UK referral guidance')}, updated on 11 September 2026, sets two conditions for the legal duty to refer: the employer, volunteer manager or personnel supplier removes the person from regulated activity, or would have done so had they not resigned, and it thinks the person engaged in relevant conduct, satisfied the harm test or received a caution or conviction for a relevant offence. Anyone may refer when they hold such concerns; parents and members of the public are asked to go to the police, social services or the employer instead. Some offences lead to automatic barring.</p>
<p>The finder on the ${h.a('home', 'home page')} shows the list for each role, and the ${h.a('dbs-eligibility', 'eligibility page')} tests a role that is not in the finder.</p>
`,
});
