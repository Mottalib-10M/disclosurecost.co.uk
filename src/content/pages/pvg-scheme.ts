import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'pvg-scheme',
  group: 'nations',
  order: 60,
  tool: { kind: 'mini:pvg', props: { status: 0 } },
  related: ['pvg-check', 'basic-disclosure-scotland', 'criminal-record-check-uk', 'dbs-barred-list'],
  sources: ['ds_pvg', 'ds_levels', 'ds_fees', 'ds_q1'],
  slug: 'pvg-scheme',
  nav: 'PVG scheme',
  card: 'Five-year membership for regulated roles in Scotland: who joins, what it costs.',
  title: 'PVG Scheme Membership: Cost, Five Years and Who Must Join',
  description: 'PVG scheme in Scotland: required for regulated roles with children or protected adults, £59 to join, £18 for a member, free for volunteers, lasts five years.',
  h1: 'The PVG scheme in Scotland: membership, cost and rules',
  intro: 'Choose your situation: the fee Disclosure Scotland charges for your PVG application.',
  resume: (h) => `The Protecting Vulnerable Groups (PVG) scheme is Scotland's membership scheme for people doing regulated roles with children or protected adults. It is run by Disclosure Scotland, and it is a legal requirement to join it before doing a regulated role. Since ${h.date(h.FEES.scotland.pvgFiveYearMembershipFrom)}, membership lasts five years. Joining costs ${h.m(h.FEE.pvgJoin)}; an existing member applying for the same type of regulated role pays ${h.m(h.FEE.pvgExisting)}, and membership stays free for volunteers in a qualifying voluntary organisation. From ${h.date(h.FEES.scotland.socialCareWaiver.from)} to ${h.date(h.FEES.scotland.socialCareWaiver.to)}, the fee is also waived for eligible workers starting a new role in commissioned adult or children's social care. Disclosure Scotland keeps checking members while they are in the scheme, so new information can lead to consideration for listing. Organisations start PVG applications; you can apply on your own only if you are a personal assistant, self-employed or work for an individual. The scheme replaces, for these roles, the DBS enhanced check with barred lists used in England and Wales.`,
  faqs: (h) => [
    { q: 'What happens when my PVG membership reaches five years?', a: 'Since 1 April 2026 membership lasts five years, after which it has to be renewed to keep doing a regulated role. Keep your contact details up to date with Disclosure Scotland so that its messages reach you. In February 2026 Disclosure Scotland said the five-year change brings no additional cost to the scheme.' },
    { q: 'Do I need a new PVG application when I change job?', a: 'Often yes: a new employer may ask you to apply as an existing member, which costs £18 and adds them to your membership and gives them an updated disclosure. If your role changes but you stay with the same organisation and the same group, you do not need another application.' },
    { q: 'Can I be in the PVG scheme for children and adults?', a: 'Yes. Membership can cover regulated roles with children, with protected adults, or both. If you start work with a group not listed on your membership, you apply to update it. The disclosure you share then covers the new group as well.' },
    { q: 'Is PVG membership valid for work in England?', a: 'No. PVG is a Scottish scheme. An employer in England or Wales asks for a DBS check through its own route, and in Northern Ireland the check is done by AccessNI. Someone working in both Scotland and England may need both a PVG membership and a DBS check.' },
  ],
  body: (h) => `
<h2>Fees and processing</h2>
${h.table(['PVG application', 'Fee', 'Source'], [
    ['Joining the scheme', h.m(h.FEE.pvgJoin), 'Disclosure Scotland fees'],
    ['Existing member, same type of regulated role', h.m(h.FEE.pvgExisting), 'Disclosure Scotland fees'],
    ['Volunteer, qualifying voluntary organisation', h.m(0), 'Disclosure Scotland fees'],
    [`New role in commissioned social care, ${h.date(h.FEES.scotland.socialCareWaiver.from)} to ${h.date(h.FEES.scotland.socialCareWaiver.to)}`, h.m(0), 'Quarter one 2026 update'],
  ], `Fees in force since ${h.date(h.FEES.scotland.effectiveFrom)}, read on 24 October 2026.`, ['l', 'r', 'l'])}
<p>From April to June 2026, Disclosure Scotland completed ${h.num(h.FEES.scotland.processing.completed)} applications of all kinds in ${h.days(h.FEES.scotland.processing.averageDays)} on average, ${h.pc(h.FEES.scotland.processing.shareWithin14Days)} within 14 days (${h.src('ds_q1', 'quarter one 2026')}).</p>
<h2>How membership works</h2>
<p>According to ${h.src('ds_pvg', 'mygov.scot')}, Disclosure Scotland carries out criminal record checks when you apply and gives you a disclosure that you can share with the organisation. It keeps barred lists for children and protected adults and, while you are a member, keeps checking your suitability. Organisations with members doing regulated roles must report harmful behaviour to Disclosure Scotland. If you stop doing a regulated role, you can leave the scheme.</p>
<h2>PVG and the other levels</h2>
<p>Under its ${h.src('ds_levels', 'current disclosure levels')}, Scotland has Level 1, which replaced the basic disclosure, Level 2, which replaced most standard disclosures, Level 2 with a barred list check for specific activities such as adopting a child, and the PVG scheme for regulated roles. The ${h.src('ds_fees', 'fees page')} prices Level 1 and Level 2 at ${h.m(h.FEE.scLevel1)}. The ${h.a('pvg-check', 'PVG check page')} compares the PVG with the enhanced DBS check.</p>
<h2>Who must join</h2>
<p>The test is whether the role is a regulated role with children or protected adults, and mygov.scot has a tool to check if a role needs PVG membership. Employers cannot let someone do a regulated role without it. A role that is not regulated may still need a Level 2 disclosure, chosen by the organisation. If you take a role with a group not on your membership, for example adults when you are a member for children, you apply to update your membership rather than join again.</p>
<h2>Cost compared with England and Wales</h2>
<p>Joining PVG costs ${h.m(h.FEE.pvgJoin)}, against ${h.m(h.FEE.enhanced)} for an enhanced DBS check with barred lists since ${h.effective}. The gap narrows over time: a PVG member changing role pays ${h.m(h.FEE.pvgExisting)}, while a DBS certificate holder either pays ${h.m(h.FEE.update)} a year for the Update Service or ${h.m(h.FEE.enhanced)} for each new check.</p>
`,
});
