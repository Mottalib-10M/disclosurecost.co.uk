import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'pvg-check',
  group: 'nations',
  order: 61,
  tool: { kind: 'mini:wait', props: { level: 5, nation: 2 } },
  related: ['pvg-scheme', 'enhanced-dbs-check', 'criminal-record-check-uk', 'how-long-does-a-dbs-check-take'],
  sources: ['ds_levels', 'ds_pvg', 'ds_fees', 'ds_q1', 'gov_fee_news', 'police_perf'],
  slug: 'pvg-check',
  nav: 'PVG check',
  card: 'The PVG check against the enhanced DBS check: fee, wait and who applies.',
  title: 'PVG Check or Enhanced DBS Check: Fees, Wait and Differences',
  description: 'PVG check compared with the enhanced DBS check: £59 against £41, 3.5 days on average in Scotland, five-year membership with ongoing checks, who applies.',
  h1: 'PVG check compared with the enhanced DBS check',
  intro: 'Pick the nation and the level: the latest published average wait for that check.',
  resume: (h) => `A PVG check is the disclosure you receive when you join or update your membership of Scotland's Protecting Vulnerable Groups scheme. It plays the role that an enhanced DBS check with barred lists plays in England and Wales: it shows unspent convictions, certain spent convictions, other relevant information and whether you are barred from regulated roles with children or protected adults. The differences are in how it works. Joining costs ${h.m(h.FEE.pvgJoin)} against ${h.m(h.FEE.enhanced)} for an enhanced DBS check since ${h.effective}. PVG is a membership that lasts five years, during which Disclosure Scotland keeps checking you, while a DBS certificate is a snapshot on its date that only the paid Update Service keeps current. Disclosure Scotland completed applications in ${h.days(h.FEES.scotland.processing.averageDays)} on average from April to June 2026, against ${h.days(h.avg('enhanced').days)} for enhanced DBS checks in ${h.month(h.police.dataMonth)}. In both systems the organisation starts the application, except for self-employed people, personal assistants and those working for an individual.`,
  faqs: (h) => [
    { q: 'Is a PVG check the same as a DBS check?', a: 'Not the same document, though they serve the same purpose. Disclosure Scotland issues the PVG disclosure for regulated roles in Scotland; DBS issues enhanced certificates for England and Wales. Each employer asks for the check of the nation where the job is, so one does not replace the other.' },
    { q: 'How long does a PVG check take?', a: `Disclosure Scotland reported ${h.days(h.FEES.scotland.processing.averageDays)} on average for all its applications from April to June 2026, with ${h.pc(h.FEES.scotland.processing.shareWithin14Days)} done within 14 days. It does not publish a separate average for PVG applications, so a check involving police information can take longer than the average.` },
    { q: 'Can I apply for a PVG check myself?', a: 'Not usually. Organisations start PVG applications. The exception, on mygov.scot, is for personal assistants, self-employed people and those working for an individual, who can apply on their own. Everyone else gives the organisation the details it needs and completes the part sent to them.' },
    { q: 'Is a PVG check cheaper for a second job?', a: `Yes. A member applying for the same type of regulated role pays ${h.m(h.FEE.pvgExisting)} instead of ${h.m(h.FEE.pvgJoin)}. In England and Wales there is no reduced fee: a second enhanced check costs the full ${h.m(h.FEE.enhanced)}, unless the new employer accepts a status check through the Update Service.` },
  ],
  body: (h) => `
<h2>Side by side</h2>
${h.table(['', 'PVG (Scotland)', 'Enhanced DBS with barred lists'], [
    ['Fee to join or apply', h.m(h.FEE.pvgJoin), h.m(h.FEE.enhanced)],
    ['Next application', `${h.m(h.FEE.pvgExisting)} as a member`, `${h.m(h.FEE.enhanced)} again, or Update Service ${h.m(h.FEE.update)} a year`],
    ['Volunteers', 'Free in a qualifying organisation', 'Free'],
    ['Lasts', 'Five-year membership', 'No set period'],
    ['Ongoing checks', 'Yes, while a member', 'Only status checks through the Update Service'],
    ['Latest average', h.days(h.FEES.scotland.processing.averageDays), h.days(h.avg('enhanced').days)],
  ], `Disclosure Scotland fees and quarter one 2026; DBS fees from 5 October 2026 and police performance report for ${h.month(h.police.dataMonth)}.`, ['l', 'l', 'l'])}
<h2>What the PVG disclosure shows</h2>
<p>The ${h.src('ds_levels', 'mygov.scot page on disclosure levels')} says the PVG disclosure shows any unspent convictions and certain spent convictions, and other information such as whether you are barred from roles with children or protected adults. Membership can cover children, protected adults or both, as set out on the ${h.src('ds_pvg', 'PVG scheme page')}. For a role that is not regulated, the Scottish employer may ask for a Level 2 disclosure instead, at ${h.m(h.FEE.scLevel2)} on the ${h.src('ds_fees', 'fees page')}.</p>
<h2>Working on both sides of the border</h2>
<p>A worker based in Scotland who also takes shifts in England needs a PVG membership for the Scottish role and a DBS check for the English one, because each employer is bound by its own law. The ${h.a('criminal-record-check-uk', 'four-nation comparison')} gives the fee and wait for each level.</p>
<h2>Five years of each system</h2>
${h.table(['Over five years', 'PVG member', 'DBS with Update Service', 'DBS, new check per job'], [
    ['One role', h.m(h.FEE.pvgJoin), h.m(h.FEE.enhanced + 5 * h.FEE.update), h.m(h.FEE.enhanced)],
    ['Two roles', h.m(h.FEE.pvgJoin + h.FEE.pvgExisting), h.m(h.FEE.enhanced + 5 * h.FEE.update), h.m(2 * h.FEE.enhanced)],
    ['Three roles', h.m(h.FEE.pvgJoin + 2 * h.FEE.pvgExisting), h.m(h.FEE.enhanced + 5 * h.FEE.update), h.m(3 * h.FEE.enhanced)],
  ], 'Official fees only, no admin fee, volunteers excluded. DBS with Update Service assumes each employer accepts a status check.', ['l', 'r', 'r', 'r'])}
<p>The figures are sums of published fees, not a forecast: fees can change during five years, and an employer may still ask for a new check. They show where each system is cheaper. For one role kept five years, a single enhanced DBS check is cheapest. For several roles, PVG membership or the Update Service wins, depending on how many times you change.</p>
<h2>Barred lists in each system</h2>
<p>Both systems keep lists of people barred from working with children or vulnerable adults, and both check them for the roles that need it. In England and Wales, the barred list check is part of an enhanced DBS check when the role is eligible for it, at no extra cost. In Scotland, the barred list check is part of PVG membership and of the Level 2 disclosure with a barred list check used for specific activities such as adopting a child. If Disclosure Scotland receives information suggesting a member may be unsuitable, it starts the consideration for listing process, without waiting for the member to apply again.</p>
<h2>Which one an employer asks for</h2>
<p>The employer does not choose between the two. A role in Scotland that is regulated work with children or protected adults needs PVG membership by law; the same role in England or Wales needs an enhanced DBS check with the relevant barred list. A worker moving from Glasgow to Leeds therefore applies for a DBS check, and a worker moving the other way joins the PVG scheme.</p>
`,
});
