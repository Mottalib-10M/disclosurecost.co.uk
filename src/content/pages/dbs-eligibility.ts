import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'dbs-eligibility',
  group: 'levels',
  order: 24,
  tool: { kind: 'mini:eligibility', props: { children: 0, care: 0, adults: 1, listed: 0 } },
  related: ['which-dbs-check-do-i-need', 'dbs-barred-list', 'enhanced-dbs-check', 'standard-dbs-check'],
  sources: ['gov_eligibility', 'gov_elig_children_barred', 'gov_elig_adults_barred', 'gov_elig_adults_enhanced', 'gov_elig_children_enhanced'],
  slug: 'dbs-eligibility',
  nav: 'DBS eligibility checker',
  card: 'The tests of the guidance, one question at a time, for a role that is not listed.',
  title: 'DBS Eligibility: Regulated Activity, Period Condition, Tests',
  description: 'DBS eligibility, question by question: regulated activity with children (3 days in 30, overnight), with adults (once is enough), listed roles. Level and fee.',
  h1: 'DBS eligibility: is the role eligible, and for which level?',
  intro: 'Answer for the role, not for the person: the highest level it can lawfully get.',
  resume: (h) => `DBS eligibility is a property of the role, not of the person who does it. The same nurse can be eligible for an enhanced check with the adults' barred list in a ward and for a basic check in an office job. The DBS eligibility guidance, revised on 1 September 2026, sorts roles with a few tests. With children, a specified activity (teaching, care, supervision, advice, driving, online moderation) becomes regulated activity when it happens on more than three days in any 30-day period or once overnight between 2am and 6am; health or personal care counts from the first time. With adults there is no period condition: one episode of personal care, health care, social work, help with money or transport is regulated activity. Regulated activity reaches the barred lists. Work with children or adults below those conditions can still reach an enhanced check, and listed professions a standard one. Everything else is basic. The calculator above applies the tests; the result is indicative and the recruiting organisation decides.`,
  faqs: (h) => [
    { q: 'What is the period condition for work with children?', a: 'A specified activity with children counts as regulated activity when it is done on more than three days in any period of 30 days, or once overnight between 2am and 6am with a chance of face-to-face contact. Below that, the role can still be eligible for an enhanced check without the children\'s barred list.' },
    { q: 'Is personal care a regulated activity after one visit?', a: 'Yes, for both children and adults. Helping someone eat, drink, wash, dress or use the toilet because of age, illness or disability, or supervising and advising them in doing so, is regulated activity from the first time. The role is then eligible for an enhanced check with the relevant barred list.' },
    { q: 'Is a volunteer role assessed differently for DBS eligibility?', a: `No. The guidance applies whether a role is paid or unpaid: a volunteer football coach and a paid one doing the same sessions are eligible for the same level. What changes is the fee, since standard and enhanced checks are free for a volunteer who meets the GOV.UK test, while a basic check costs ${h.m(h.FEE.basic)} either way.` },
    { q: 'Can a 16 or 17 year old get a DBS check?', a: `Yes. A basic check can be requested from age ${h.P.rules.basicMinAge}, and standard or enhanced checks can be requested for a young person in an eligible role. Activities in relation to a 16 or 17 year old's own job, such as training an apprentice, are not regulated activity with children.` },
  ],
  body: (h) => `
<h2>The tests, in the order the guidance applies them</h2>
${h.table(['Question', 'If yes', 'Fee'], [
    ['Health or personal care for a child or an adult, even once?', "Enhanced with the barred list of that group", h.m(h.FEE.enhanced)],
    ['Teaching, care, supervision, advice, driving or moderation for children on more than 3 days in 30, or overnight?', "Enhanced with the children's barred list", h.m(h.FEE.enhanced)],
    ['Social work, help with bills or shopping, conveying or managing carers for adults?', "Enhanced with the adults' barred list", h.m(h.FEE.enhanced)],
    ['Work with children or adults below those conditions, or a listed licence?', 'Enhanced, no barred list', h.m(h.FEE.enhanced)],
    ['A profession on entry, the courts, prisons, the SIA, the FCA or PRA?', 'Standard', h.m(h.FEE.standard)],
    ['None of these', 'Basic only', h.m(h.FEE.basic)],
  ], 'Summary of the DBS eligibility guidance of 1 September 2026, England and Wales. Fees from 5 October 2026.', ['l', 'l', 'r'])}
<h2>Children: activity, frequency, place</h2>
<p>The ${h.src('gov_elig_children_barred', 'children guidance')} lists the activities that can be regulated, and adds places. Working in a specified establishment, such as a school, a nursery or a children's home, is regulated activity for anyone whose work gives them the chance of contact with children there, if four conditions are met: frequency, contact, purpose of the establishment and work that is not temporary or occasional. A cleaner or receptionist who works there every week meets them; a contractor who comes once to repair a boiler does not, and is eligible for an enhanced check without the barred list instead (${h.src('gov_elig_children_enhanced', 'enhanced without barred list')}).</p>
<h2>Adults: the activity is enough</h2>
<p>The ${h.src('gov_elig_adults_barred', 'adults guidance')} defines regulated activity by what is done, with no list of places and no frequency: health care by or under a health professional, personal care, social work, help with the day-to-day running of a household because of age, illness or disability, help with the conduct of affairs under a power of attorney or court order, conveying an adult who cannot travel alone to or from health care, personal care or social work, and the day-to-day management of anyone who does these things. Roles that work with adults receiving a service without doing one of those activities follow the ${h.src('gov_elig_adults_enhanced', 'three-step test')} for an enhanced check without the barred list.</p>
<p>The ${h.a('which-dbs-check-do-i-need', 'role list')} applies these rules to ${h.num(h.ROLES.roles.length)} common jobs, and the ${h.a('dbs-barred-list', 'barred list page')} explains what the lists are.</p>
<h2>The role, not the person</h2>
<p>Eligibility attaches to the job. The same person can be eligible for an enhanced check with the children's barred list as a teaching assistant and for no more than a basic check as a shop worker. The organisation asking must be satisfied that the role qualifies before it applies, and the umbrella body or registered body that submits the form checks it too, as the ${h.src('gov_self_employed', 'self-employed guidance')} shows with its example of a plumber turned down for an enhanced check.</p>
`,
});
