import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'which-dbs-check-do-i-need',
  group: 'levels',
  order: 23,
  tool: { kind: 'mini:roles', props: { role: 'care-worker' } },
  related: ['dbs-eligibility', 'dbs-barred-list', 'standard-dbs-check', 'enhanced-dbs-check'],
  sources: ['gov_eligibility', 'gov_elig_children_barred', 'gov_elig_adults_barred', 'gov_elig_standard', 'gov_elig_other'],
  slug: 'which-dbs-check-do-i-need',
  nav: 'Which DBS check do I need?',
  card: 'Level of 38 common roles under the DBS guidance, with the fee of each.',
  title: 'DBS Check Level by Role: Teacher, Carer, Taxi, Tutor, Nurse',
  description: 'DBS check level for 38 roles under the September 2026 eligibility guidance: teacher, carer, nurse, taxi driver, tutor, solicitor, SIA, with fee and section.',
  h1: 'Which DBS check do I need for my job?',
  intro: 'Pick the role: the level of check the DBS guidance gives it, its fee and where the rule is.',
  resume: (h) => `The level of DBS check a job needs is not chosen by the applicant or freely by the employer: it is the level the law allows for that role, and the DBS eligibility guidance, updated on 1 September 2026, restates those rules in nine documents. A role in regulated activity with children, such as a teacher, a registered childminder or a sports coach who sees children more than three days in any 30, can get an enhanced check with the children's barred list. A care worker who gives personal care, a nurse or a hospital porter conveying patients reaches the adults' barred list. Taxi and private hire drivers get both lists when their licensing authority asks. Professions such as solicitors and accountants get a standard check on entry. Any other job can only ask for a basic check. The calculator above gives the level for ${h.num(h.ROLES.roles.length)} roles, its fee since ${h.effective} and the section of the guidance it comes from; the organisation recruiting you makes the final decision.`,
  faqs: (h) => [
    { q: 'Who decides which DBS check I get?', a: 'The organisation recruiting you, within what the law allows for the role. It cannot ask for a higher level than the role is eligible for, and DBS can refuse an application that does not fit. It can always choose a lower level. If you think the level is wrong, ask which part of the eligibility guidance the employer relied on.' },
    { q: 'Do I need a new DBS check for a new job?', a: 'Often, but not always. A new employer can accept your existing certificate if it is at the right level and for the right workforce, after checking your identity. If you are on the Update Service, it can check online that nothing has changed. Many employers still ask for a new check as a matter of policy.' },
    { q: 'What DBS check does a teaching assistant need?', a: `An enhanced check with the children's barred list, like a teacher, when the role involves teaching or supervising children on more than three days in 30 days, which is almost always the case. The fee is ${h.m(h.FEE.enhanced)}, usually paid by the school or the agency. Schools also check the barred list as part of safer recruitment.` },
    { q: 'What is the child workforce and the adult workforce?', a: 'Every standard or enhanced application names a workforce: child, adult, both or other. It sets which barred list can be searched and which police information is relevant. A certificate issued for the adult workforce cannot be reused through the Update Service for a role in the child workforce: a new check is needed.' },
  ],
  body: (h) => `
<h2>All ${h.num(h.ROLES.roles.length)} roles of the finder</h2>
${h.table(['Role', 'Level', 'Fee', 'Section of the guidance'], h.ROLES.roles.map((r) => [r.label, h.levelName(r.level as 'basic'), h.m(h.D.officialFee({ nation: 'england', level: r.level as 'basic' }).fee), r.ref]), 'England and Wales, DBS eligibility guidance of 1 September 2026, fees from 5 October 2026. Indicative: the recruiting organisation decides.', ['l', 'l', 'r', 'l'])}
<h2>How the level is worked out</h2>
<p>The guidance asks three questions in turn. First, is the role in regulated activity? For children, that means teaching, training, instructing, caring for or supervising them, giving them advice, moderating an online service for them or driving them, on more than three days in a 30-day period or overnight, or any health or personal care, or registering as a childminder or foster carer (${h.src('gov_elig_children_barred', 'children guidance')}). For adults, it means health care, personal care, social work, help with bills or shopping, help with the conduct of their affairs, conveying them or managing those who do, and once is enough (${h.src('gov_elig_adults_barred', 'adults guidance')}). A yes gives an enhanced check with the matching barred list.</p>
<p>Second, if not, does the role still work with children or adults in one of the ways the law lists, or hold a listed licence? That gives an enhanced check without the barred lists. Third, is it in the ${h.src('gov_elig_standard', 'standard list')}: a profession on entry, the courts, prisons, the SIA, financial regulators? That gives a standard check. Otherwise, only a basic check is possible. The ${h.a('dbs-eligibility', 'question-by-question page')} runs through these tests for a role that is not in the list.</p>
<h2>Same role, other nations</h2>
<p>These levels follow the rules for England and Wales. In Scotland, regulated work goes through the ${h.a('pvg-scheme', 'PVG scheme')}; in Northern Ireland, AccessNI applies similar levels under its own legislation. The finder on the home page maps a role to the right product in each nation.</p>
<h2>Reading the result</h2>
<p>The level shown is the highest the guidance allows for the role as described. An employer cannot ask for more than that, but it can ask for less, such as a basic check, which is open for any role. The workforce, child, adult or other, is printed on the application and matters later: the Update Service only carries a certificate to a new role in the same workforce. If your duties differ from the typical description, answer the questions on the ${h.a('dbs-eligibility', 'eligibility page')}.</p>
`,
});
