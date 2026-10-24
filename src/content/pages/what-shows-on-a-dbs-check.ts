import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'what-shows-on-a-dbs-check',
  group: 'levels',
  order: 26,
  tool: { kind: 'mini:shows', props: { kind: 0, years: 8, custodial: 0, specified: 0 } },
  related: ['basic-dbs-check', 'standard-dbs-check', 'enhanced-dbs-check', 'dbs-certificate'],
  sources: ['gov_filtering', 'gov_apply_role', 'gov_basic', 'gov_employer'],
  slug: 'what-shows-on-a-dbs-check',
  nav: 'What shows on a DBS check',
  card: 'What each level discloses, and the filtering rules that remove old records.',
  title: 'DBS Check Contents: What Shows, Filtering Rules by Level',
  description: 'DBS check contents by level: unspent only on a basic, filtering after 11 years (5.5 under 18) on standard and enhanced, police information. Test your record.',
  h1: 'What shows on a DBS check, level by level',
  intro: 'Describe one record: whether a standard or enhanced certificate would show it.',
  resume: (h) => `What a DBS certificate shows depends on its level. A basic certificate lists only convictions and conditional cautions that are still unspent under the Rehabilitation of Offenders Act 1974. A standard certificate adds spent convictions and cautions, reprimands and final warnings, except those the filtering rules remove. Under the rules in force for certificates issued from ${h.date(h.P.rules.filtering.from)}, a conviction for a specified offence or one that led to a custodial sentence always appears, as does an adult caution for a specified offence. Other adult convictions appear for ${h.num(h.P.rules.filtering.adultConvictionYears)} years, convictions received under 18 for ${h.num(h.P.rules.filtering.youthConvictionYears, 1)} years and adult cautions for ${h.num(h.P.rules.filtering.adultCautionYears)} years; cautions received under 18 never appear automatically. An enhanced certificate shows the same, plus information a local police force considers relevant, and the barred list result when the role allows it. The calculator above applies these rules to one record; it is not legal advice.`,
  faqs: (h) => [
    { q: 'Do parking fines or speeding tickets show on a DBS check?', a: 'A fixed penalty notice that you paid is not a conviction, so it does not appear as one. A motoring offence that went to court and ended in a conviction is treated like any other conviction under the filtering rules. On an enhanced check, police may add information only if they judge it relevant to the role.' },
    { q: 'Will a caution from when I was 15 show up?', a: 'Not automatically. Since the filtering rules of 28 October 2023, cautions, reprimands and warnings received under 18 do not appear on standard or enhanced certificates. On an enhanced check, police could still include information about the conduct if they consider it relevant to the role, under statutory guidance.' },
    { q: 'What is a specified offence?', a: 'An offence on a list approved by Parliament, mostly serious violent, sexual and safeguarding offences. A conviction or an adult caution for one of them is never filtered from a standard or enhanced certificate, however old. Youth cautions for specified offences are still not shown automatically. DBS publishes the list with the filtering guidance.' },
    { q: 'Do DBS checks show convictions from abroad?', a: 'No. A DBS check covers records held in the UK. Time spent living outside the UK is not covered, and the person requesting the check may ask for a certificate from the country concerned or for permission to request one through an embassy, as GOV.UK explains.' },
  ],
  body: (h) => `
<h2>Each level at a glance</h2>
${h.table(['Shown', 'Basic', 'Standard', 'Enhanced'], [
    ['Unspent convictions and conditional cautions', 'Yes', 'Yes', 'Yes'],
    ['Spent convictions not filtered', 'No', 'Yes', 'Yes'],
    ['Adult cautions not filtered', 'No', 'Yes', 'Yes'],
    ['Cautions, reprimands and warnings under 18', 'No', 'No', 'No (police may add relevant information)'],
    ['Relevant information held by local police', 'No', 'No', 'Yes, if the force decides it is relevant'],
    ['Barred list result', 'No', 'No', 'If requested and the role is eligible'],
  ], 'Summary of GOV.UK guidance and of the DBS filtering rules for certificates issued from 28 October 2023.', ['l', 'l', 'l', 'l'])}
<h2>The filtering rules in numbers</h2>
<p>The ${h.src('gov_filtering', 'DBS filtering rules')} decide what a standard or enhanced certificate shows from the Police National Computer. Three kinds of record are never filtered: convictions for specified offences, adult cautions for specified offences and convictions that resulted in a custodial sentence. For the rest, time decides: an adult caution for a non-specified offence appears for ${h.num(h.P.rules.filtering.adultCautionYears)} years, an adult conviction for ${h.num(h.P.rules.filtering.adultConvictionYears)} years, a youth conviction for ${h.num(h.P.rules.filtering.youthConvictionYears, 1)} years. Under the rules in force until 27 November 2020, a person with more than one conviction had all of them shown; that multiple-conviction rule has since been removed. Any conviction or caution that is still unspent also appears.</p>
<h2>What "spent" means for a basic check</h2>
<p>A basic certificate depends only on whether a conviction is spent. The rehabilitation period runs from the end of the sentence and depends on the sentence and on age; a simple caution is spent at once, and the ${h.src('gov_basic', 'GOV.UK basic check page')} notes that some conditional cautions disappear after three months. This site does not compute rehabilitation periods: they depend on details of the sentence that a short form cannot capture. Charities that support people with convictions publish detailed guides, and a solicitor can confirm a particular case.</p>
<h2>Police information on enhanced checks</h2>
<p>A chief officer can include information held locally, such as an allegation or an investigation that did not lead to a charge, when they reasonably believe it is relevant to the workforce and ought to be disclosed. That decision follows statutory guidance, and you can dispute it. Because this step is local, the wait for an enhanced check depends on the police forces involved; the ${h.a('how-long-does-a-dbs-check-take', 'waiting time page')} has the latest figures.</p>
<h2>The same question in Scotland and Northern Ireland</h2>
<p>A Level 1 disclosure in Scotland shows unspent convictions only, like a DBS basic check (${h.src('ds_basic', 'mygov.scot')}). In Northern Ireland, nidirect says unspent convictions appear on a basic certificate, and cautions and spent and unspent convictions on standard and enhanced ones, under its own filtering rules, which the calculator on this page does not model (${h.src('ani_using', 'nidirect')}).</p>
`,
});
