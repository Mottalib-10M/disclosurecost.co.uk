import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'standard-dbs-check',
  group: 'levels',
  order: 21,
  tool: { kind: 'mini:roles', props: { role: 'solicitor' } },
  related: ['which-dbs-check-do-i-need', 'enhanced-dbs-check', 'what-shows-on-a-dbs-check', 'dbs-eligibility'],
  sources: ['gov_elig_standard', 'gov_apply_role', 'gov_employer', 'gov_filtering'],
  slug: 'standard-dbs-check',
  nav: 'Standard DBS check',
  card: 'The listed professions and licences that get a standard check, and what it shows.',
  title: 'Standard DBS Check: Which Roles Qualify, £20 Fee, Contents',
  description: 'Standard DBS check: shows spent and unspent convictions and cautions not filtered. Only listed roles qualify: solicitors, accountants, SIA, prisons. £20 fee.',
  h1: 'Standard DBS check: the roles that can ask for one',
  intro: 'Pick a role to see the level the DBS guidance gives it and the fee.',
  resume: (h) => `A standard DBS check shows spent and unspent convictions, cautions, reprimands and final warnings held on the Police National Computer, except those removed by the DBS filtering rules. It does not include information from local police or any barred list. It costs ${h.m(h.FEE.standard)} since ${h.effective}, the same as a basic check, and is free for volunteers. Unlike a basic check, an employer can only ask for it when the role appears in the exceptions to the Rehabilitation of Offenders Act, set out in the DBS guidance on standard checks. Most of those roles are professions and licences where honesty matters: solicitors, barristers, accountants, actuaries and vets on entry to the profession, staff of prisons and courts, fire and rescue authorities, applicants for an SIA licence, people approved by the FCA or the PRA, and football stewards. Work with children or vulnerable adults usually reaches an enhanced check instead. The calculator above gives the level the guidance allows for ${h.num(h.ROLES.roles.length)} common roles.`,
  faqs: (h) => [
    { q: 'Who can ask for a standard DBS check?', a: 'Only an organisation recruiting for a role listed in the Exceptions Order to the Rehabilitation of Offenders Act 1974, as summarised in the DBS guidance on standard checks. The applicant cannot request a standard check alone. If the role is not listed, the employer can only ask for a basic check.' },
    { q: 'Does a standard DBS check show spent convictions?', a: `Yes, unless they are filtered. Since ${h.date(h.P.rules.filtering.from)}, an adult conviction for an offence not on the specified list drops off after ${h.P.rules.filtering.adultConvictionYears} years if it led to no custodial sentence, and an adult caution after ${h.P.rules.filtering.adultCautionYears} years. Convictions for specified offences always appear.` },
    { q: 'Why is a solicitor checked only once?', a: 'The guidance lists solicitors, barristers, accountants and similar professions on entry: the check is made when someone first joins the profession or its register, not each time they move to another firm. A firm can still ask for a basic check when it hires an existing solicitor.' },
    { q: 'Is a standard check enough to work in a school?', a: 'Rarely. Most school roles involve teaching, supervising or caring for children, which reaches an enhanced check, often with the children\'s barred list. A standard check is for roles in the standard list, which is mostly about professions, licences and the justice system rather than work with children.' },
  ],
  body: (h) => `
<h2>Roles at standard level in the finder</h2>
${h.table(['Role', 'Guidance section', 'Note'], h.rolesAt('standard').map((r) => [r.label, r.ref, r.note || '']), `Roles of the finder at standard level, from the ${'DBS'} guidance updated on 1 September 2026. The full list is longer.`, ['l', 'l', 'l'])}
<p>The ${h.src('gov_elig_standard', 'DBS guidance on standard checks')} groups the eligible roles in three families: professions on entry (barristers, solicitors, legal executives, accountants, actuaries, notaries, veterinary surgeons), positions of trust in the justice system and public safety (courts, prisons, fire and rescue), and licences or approvals granted by regulators (the Security Industry Authority, the Financial Conduct Authority, the Prudential Regulation Authority, football stewarding). The guidance restates the law in plain words and is not legal advice; the recruiting organisation must be satisfied that the role fits one of its lines.</p>
<h2>What a standard certificate shows</h2>
<p>The certificate lists what the Police National Computer holds that is not "protected". Under the ${h.src('gov_filtering', 'filtering rules')}, a record is always shown if it is a conviction for a specified offence, an adult caution for a specified offence, or a conviction that led to a custodial sentence. Other adult convictions appear for ${h.num(h.P.rules.filtering.adultConvictionYears)} years, youth convictions for ${h.num(h.P.rules.filtering.youthConvictionYears, 1)} years and adult cautions for ${h.num(h.P.rules.filtering.adultCautionYears)} years. Cautions, reprimands and warnings received under 18 never appear automatically. The ${h.a('what-shows-on-a-dbs-check', 'filtering calculator')} applies these rules to one record.</p>
<h2>Cost and timing</h2>
<p>A standard check costs ${h.m(h.FEE.standard)} (it was ${h.m(h.FEE.oldStandard)} until 4 October 2026). It is free for a volunteer who meets the GOV.UK test, and it can join the Update Service for ${h.m(h.FEE.update)} a year. In ${h.month(h.lastMonth)}, ${h.pc(h.on('standard').share)} of standard certificates were sent within the ${h.days(h.on('standard').targetDays)} target, and the average was ${h.days(h.avg('standard').days)} in ${h.month(h.police.dataMonth)}: standard checks do not go to local police, so they are rarely held up.</p>
<p>Standard and enhanced checks are applied for by the organisation, either as a registered body or through an umbrella body; the ${h.a('dbs-umbrella-body', 'umbrella body page')} explains the admin fee that may come on top.</p>
<p>In Scotland the equivalent is the Level 2 disclosure at ${h.m(h.FEE.scLevel2)}, started by the organisation for roles such as solicitors and prison workers (${h.src('ds_levels', 'mygov.scot')}). In Northern Ireland, an AccessNI standard check costs ${h.m(h.FEE.niStandard)} through a registered body (${h.src('ani_fees', 'nidirect')}).</p>
`,
});
