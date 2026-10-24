import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'how-long-does-a-dbs-check-take',
  group: 'timing',
  order: 40,
  tool: { kind: 'mini:wait', props: { level: 3, nation: 0 } },
  related: ['enhanced-dbs-check', 'dbs-update-service', 'pvg-check', 'access-ni-check'],
  sources: ['gov_dataset1', 'police_perf', 'gov_apply_role', 'gov_basic', 'ds_q1', 'ani_fees'],
  slug: 'how-long-does-a-dbs-check-take',
  nav: 'How long a DBS check takes',
  card: 'Latest averages by level, the share on time, and the police forces running late.',
  title: 'DBS Check Time 2026: Days by Level and Delayed Police Forces',
  description: 'DBS check time by level: averages for July 2026, the share on time to June, the 11 police forces behind target, and Scotland and AccessNI turnaround times.',
  h1: 'How long does a DBS check take?',
  intro: 'Choose the level and the nation: the latest published average and the share done on time.',
  resume: (h) => `A DBS check usually takes a few days, but an enhanced check can take weeks when a police force is slow. In the DBS police performance report for ${h.month(h.police.dataMonth)}, the average was ${h.days(h.avg('basic').days)} for a basic check, ${h.days(h.avg('standard').days)} for a standard check and ${h.days(h.avg('enhanced').days)} for an enhanced check. The official DBS dataset for ${h.month(h.lastMonth)} shows ${h.pc(h.on('basic').share)} of basic certificates sent within ${h.days(h.on('basic').targetDays)}, ${h.pc(h.on('standard').share)} of standard ones within ${h.days(h.on('standard').targetDays)} and ${h.pc(h.on('enhanced').share)} of enhanced ones within ${h.days(h.on('enhanced').targetDays)}, against a target of ${h.pc(h.on('enhanced').targetShare, 0)}. GOV.UK still tells applicants to allow up to 14 days for a basic check and around 8 weeks for standard and enhanced ones. Delays come from errors on the form and from the police: forces took ${h.days(h.police.policeReturnAvgDays)} on average to answer, and ${h.num(h.police.delayedForces!.length)} were behind target. In Scotland the average was ${h.days(h.FEES.scotland.processing.averageDays)}.`,
  faqs: (h) => [
    { q: 'Why is my enhanced DBS check taking so long?', a: `Most often because a police force has not yet answered. An enhanced application goes to every force covering an address you gave, and each must say whether it holds relevant information. In ${h.month(h.police.dataMonth)}, forces took ${h.days(h.police.policeReturnAvgDays)} on average. Wrong or missing addresses and names on the form also cause delays.` },
    { q: 'How can I track my DBS application?', a: 'With the application form reference and your date of birth on the DBS tracking service on GOV.UK. It shows the stage the application has reached, from receipt of the form to the certificate being printed, including the police search for enhanced checks. If an application sits at one stage for a long time, the organisation that submitted it can contact DBS.' },
    { q: 'Can I start work before my DBS check comes back?', a: `It depends on the employer and the role. Some allow supervised work while the check runs, after a risk assessment. In adult social care, the DBS Adult First service at ${h.m(h.FEE.adultFirst)} can confirm, usually within ${h.days(h.P.rules.adultFirstDays)}, whether a worker may start under supervision. Nobody may work in regulated activity while barred.` },
    { q: 'Can I pay to speed up a DBS check?', a: 'No. DBS has no fast-track fee. Companies that advertise faster checks can only speed up their own part, mainly identity checks and sending the form online. Once the application is with DBS and the police, it takes the same time for everyone. A correct form with full address history is the best way to avoid delays.' },
  ],
  body: (h) => `
<h2>Month by month, England and Wales</h2>
${h.table(['Month', 'Basic within target', 'Standard within target', 'Enhanced within target', 'Enhanced sent'], h.update.months.map((mo) => { const r = h.PERF.months[mo as keyof typeof h.PERF.months]; return [h.month(mo), h.pc(r.basic.share), h.pc(r.standard.share), h.pc(r.enhanced.share), h.num(r.enhanced.despatched)]; }), `${h.src('gov_dataset1', 'DBS dataset 1')}, published on ${h.date(h.PERF.publicUpdatedAt)}. Targets: basic ${h.days(h.on('basic').targetDays)}, standard ${h.days(h.on('standard').targetDays)}, enhanced ${h.days(h.on('enhanced').targetDays)}.`, ['l', 'r', 'r', 'r', 'r'])}
<h2>The police forces behind target</h2>
<p>The ${h.src('police_perf', 'DBS police performance report')} for ${h.month(h.police.dataMonth)} named these forces as outside their service level: ${h.police.delayedForces!.join(', ')}. It does not publish a number of days per force, so none is shown here. If you lived in one of these areas during the address history the form asks for, allow more time. The calculator below says whether a force was on that list.</p>
<!--tool:mini:force|{"force":"Thames Valley"}-->
<h2>Scotland and Northern Ireland</h2>
<p>Disclosure Scotland reported ${h.num(h.FEES.scotland.processing.completed)} applications completed from April to June 2026, in ${h.days(h.FEES.scotland.processing.averageDays)} on average, with ${h.pc(h.FEES.scotland.processing.shareWithin14Days)} done within 14 days (${h.src('ds_q1', 'quarter one 2026')}). AccessNI publishes weekly averages: for the week of ${h.date(h.FEES.northernIreland.turnaround.week)}, ${h.days(h.FEES.northernIreland.turnaround.averageDays.basic)} for basic, ${h.days(h.FEES.northernIreland.turnaround.averageDays.standard)} for standard and ${h.days(h.FEES.northernIreland.turnaround.averageDays.enhanced)} for enhanced checks (${h.src('ani_fees', 'nidirect')}).</p>
<h2>How to avoid adding days yourself</h2>
<p>Give every address of the last five years with dates, every previous name, and the same details as on your identity documents. Answer quickly if the umbrella body or DBS asks a question. And if you will need a check again, join the ${h.a('dbs-update-service', 'Update Service')}: the next employer can check your certificate online the same day, with no new wait.</p>
<h2>Averages against the GOV.UK guide</h2>
${h.table(['Level', 'GOV.UK tells you to allow', `Average, ${h.month(h.police.dataMonth)}`, `Within target, ${h.month(h.lastMonth)}`], [['Basic', 'Up to 14 days', h.days(h.avg('basic').days), h.pc(h.on('basic').share)], ['Standard', 'Around 8 weeks', h.days(h.avg('standard').days), h.pc(h.on('standard').share)], ['Enhanced', 'Around 8 weeks', h.days(h.avg('enhanced').days), h.pc(h.on('enhanced').share)]], 'GOV.UK guidance for applicants; DBS police performance report and dataset 1.', ['l', 'l', 'r', 'r'])}
<p>The gap between the guide and the averages is the tail of slow applications. Most checks come back within days, but an enhanced application that a police force has to examine waits for that force, and the average police answer time was ${h.days(h.police.policeReturnAvgDays)} in the latest report. Plan on the guide, not on the average, if a start date depends on it.</p>
<p>For a basic check applied for on GOV.UK, the service says the application is usually processed within ${h.days(h.P.rules.basicDirectDays)}, while the guide for applicants still tells you to allow up to 14 days. Delivery by post comes on top of the processing time for a paper certificate, so leave a few days more if the employer needs to see the original.</p>
`,
});
