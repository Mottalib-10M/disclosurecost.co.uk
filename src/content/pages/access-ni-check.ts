import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'access-ni-check',
  group: 'nations',
  order: 63,
  tool: { kind: 'mini:ni', props: { level: 3, vol: 0 } },
  related: ['criminal-record-check-uk', 'basic-disclosure-scotland', 'dbs-check-for-volunteers', 'how-long-does-a-dbs-check-take'],
  sources: ['ani_fees', 'ani_using', 'ani_selfemp', 'ani_home'],
  slug: 'access-ni-check',
  nav: 'AccessNI check',
  card: 'Northern Ireland checks: £16 basic and standard, £32 enhanced, weekly turnaround.',
  title: 'AccessNI Check: Basic, Standard and Enhanced Fees and Times',
  description: 'AccessNI check in Northern Ireland: basic and standard £16, enhanced £32, free for qualifying volunteers, 3 to 5 days on average in the week of 19 October 2026.',
  h1: 'AccessNI checks in Northern Ireland',
  intro: 'Choose the level and whether you volunteer: the AccessNI fee and the latest weekly average.',
  resume: (h) => `AccessNI carries out criminal record checks for roles in Northern Ireland, in place of DBS. It has three levels: basic at ${h.m(h.FEE.niBasic)}, standard at ${h.m(h.FEE.niStandard)} and enhanced at ${h.m(h.FEE.niEnhanced)}, the lowest fees in the UK. You must be 16 or over. Individuals can apply for a basic check themselves; standard and enhanced checks go through a body registered with AccessNI, except for self-employed people and personal employees in regulated activity, who use an AccessNI umbrella body that adds its own fee. Volunteers in a non-profit organisation get standard and enhanced checks free, but AccessNI charges when the volunteer works directly for a statutory organisation or in a role delivering statutory services under contract. AccessNI updates its turnaround times every week: for the week beginning ${h.date(h.FEES.northernIreland.turnaround.week)}, it took ${h.days(h.FEES.northernIreland.turnaround.averageDays.basic)} on average to issue a basic certificate, ${h.days(h.FEES.northernIreland.turnaround.averageDays.standard)} for a standard one and ${h.days(h.FEES.northernIreland.turnaround.averageDays.enhanced)} for an enhanced one. A certificate is valid for the recruitment to one role and cannot be transferred to another.`,
  faqs: (h) => [
    { q: 'Can I use an AccessNI certificate for another job?', a: 'No. nidirect says a disclosure certificate is valid during the recruitment process for a specific role and cannot be transferred from one role to another. The information is accurate on the day it was issued. A new employer in Northern Ireland asks for a new check, and there is no equivalent of the DBS Update Service.' },
    { q: 'I lost my AccessNI certificate: what can I do?', a: 'Ask AccessNI to reprint it, free of charge, if it is within 90 days of the certificate being issued. After 90 days you need a new criminal history check, which you or your employer pay for. This differs from DBS, which does not replace lost certificates at all.' },
    { q: 'Why was my AccessNI application sent to the police?', a: 'AccessNI must refer an application when the person has convictions, cautions or warnings, when the police hold other information, when the role is home-based such as childminding, or when the person lives or has lived in Ireland within the last five years. Answer quickly if the police contact you.' },
    { q: 'Can an employer ask me to get my record from the police?', a: 'No. nidirect states that an employer must not ask an employee or applicant to obtain their criminal history from the police, and that doing so is an offence. An employer that needs to check criminal history must use AccessNI, at the level the role allows.' },
  ],
  body: (h) => `
<h2>Fees and targets</h2>
${h.table(['AccessNI check', 'Fee', 'Volunteer', 'Target', `Average, week of ${h.date(h.FEES.northernIreland.turnaround.week)}`], [
    ['Basic, applied for yourself', h.m(h.FEE.niBasic), 'Charged', h.FEES.northernIreland.turnaround.targets['basic-direct'], h.days(h.FEES.northernIreland.turnaround.averageDays.basic)],
    ['Basic, through a responsible body', h.m(h.FEE.niBasic), 'Charged', h.FEES.northernIreland.turnaround.targets['basic-rb'], h.days(h.FEES.northernIreland.turnaround.averageDays.basic)],
    ['Standard', h.m(h.FEE.niStandard), 'Free if qualifying', h.FEES.northernIreland.turnaround.targets.standard, h.days(h.FEES.northernIreland.turnaround.averageDays.standard)],
    ['Enhanced', h.m(h.FEE.niEnhanced), 'Free if qualifying', h.FEES.northernIreland.turnaround.targets.enhanced, h.days(h.FEES.northernIreland.turnaround.averageDays.enhanced)],
  ], `${h.src('ani_fees', 'nidirect: costs and turnaround times')}, read on 24 October 2026.`, ['l', 'r', 'l', 'l', 'r'])}
<h2>Who applies</h2>
<p>The ${h.src('ani_using', 'nidirect page on using a check')} says employers are responsible for knowing when a role needs a check, and that standard and enhanced checks must go through a registered body. One exception covers family members of an applicant who is registering as a childminder, adopting or fostering, joining the Homes for Ukraine scheme or caring for an adult in their own home under the Adult Placement Scheme: household members over 10 can then be checked. Self-employed people follow the ${h.src('ani_selfemp', 'AccessNI self-employed route')}, with the same tutor, carer and plumber examples as in England, and receive a digital certificate in their nidirect account.</p>
<h2>Compared with England and Wales</h2>
<p>An enhanced check costs ${h.m(h.FEE.niEnhanced)} with AccessNI and ${h.m(h.FEE.enhanced)} with DBS since ${h.effective}. AccessNI is also quicker on its latest weekly figures. But it has no subscription service: each new role in Northern Ireland needs a new check, where a DBS certificate on the Update Service can be checked again for free. The ${h.a('criminal-record-check-uk', 'four-nation page')} compares every level.</p>
<h2>When AccessNI refers to the police</h2>
<p>AccessNI must refer an application to the police when the person has convictions, cautions or warnings, when the police hold other information about them, when the role is home-based such as childminding, or when the person lives or has lived in Ireland in the last five years (${h.src('ani_fees', 'nidirect')}). Those applications can take longer than the weekly average, and the police may contact you: answering quickly avoids delays.</p>
<h2>Home-based roles</h2>
<p>A role is home-based when you work with children or adults in your own home, or live with someone checked because they do. Childminding, fostering and adoption are examples, and the registered body must say so on the application.</p>
<p>Only the applicant receives a copy of the certificate unless they gave AccessNI permission to send it to the employer. For online applications through a registered or responsible body, AccessNI updates a tracking service that both you and the employer can see.</p>
`,
});
