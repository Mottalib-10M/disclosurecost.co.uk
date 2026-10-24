import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'dbs-certificate',
  group: 'update',
  order: 32,
  tool: { kind: 'mini:deadline', props: { days: 12, level: 3 } },
  related: ['dbs-update-service', 'what-shows-on-a-dbs-check', 'dbs-check-renewal', 'how-long-does-a-dbs-check-take'],
  sources: ['gov_apply_role', 'gov_update', 'gov_employer', 'gov_basic'],
  slug: 'dbs-certificate',
  nav: 'DBS certificate',
  card: 'What the paper certificate shows, its security features, lost copies, the 30 days.',
  title: 'DBS Certificate: What It Shows, Lost Copies, 30-Day Deadline',
  description: 'DBS certificate explained: posted to the applicant only, security features, no replacement if lost, no expiry date, and 30 days to add it to the Update Service.',
  h1: 'Your DBS certificate: what to do once it arrives',
  intro: 'Count the days since the date printed on it: whether you can still add it to the Update Service.',
  resume: (h) => `A DBS certificate is the paper document DBS posts to the applicant, and only to the applicant, at the end of a check. It shows the level of check, the workforce for standard and enhanced checks, the role it was requested for, your details and either the records found or a statement that there are none. The employer does not receive a copy: it sees the outcome when you show the certificate, or online through a status check if you join the Update Service. Basic certificates can also be viewed in a DBS online account. A certificate has no expiry date, but it is a snapshot of the day it was issued. Once it arrives, you have ${h.num(h.FEES.englandWales.updateService.joinWithinDaysOfIssue)} days from the date printed on it to add a standard or enhanced certificate to the Update Service, at ${h.m(h.FEE.update)} a year or free for volunteers. Keep it safe: DBS does not replace a lost or damaged certificate, so a new check would be needed.`,
  faqs: (h) => [
    { q: 'I lost my DBS certificate: can I get a copy?', a: 'No. GOV.UK states that DBS cannot replace lost or damaged certificates, so the employer has to start a new check. If the certificate is on the Update Service, an employer can still check its status online with your certificate number and permission, which may avoid a new application.' },
    { q: 'How can I tell a DBS certificate is genuine?', a: 'GOV.UK lists security features: a crown seal watermark repeated down the right side, visible on the surface and against the light; a background design with the word "Disclosure" in a wave pattern, blue and green on the reverse; and ink and paper that change colour when wet. Employers should check them on the original.' },
    { q: 'Why does my certificate say "none recorded"?', a: 'It means that, for each part of the check at that level, nothing was found to disclose: no unspent convictions on a basic check, nothing unfiltered on a standard one, no relevant police information or barred list entry on an enhanced one. It is the most common result and is valid like any other certificate.' },
    { q: 'Can I show my DBS certificate to a different employer?', a: 'Yes, and they may accept it after checking that it is genuine, matches your identity and is at the right level and workforce for their role. If you are on the Update Service, they can also run a free status check. They can still decide to ask for a new check.' },
  ],
  body: (h) => `
<h2>What is on the certificate</h2>
${h.table(['Section', 'Basic', 'Standard', 'Enhanced'], [
    ['Your name, date of birth, address', 'Yes', 'Yes', 'Yes'],
    ['Workforce and position applied for', 'No', 'Yes', 'Yes'],
    ['Police records', 'Unspent only', 'Unfiltered spent and unspent', 'Unfiltered spent and unspent'],
    ["Children's or adults' barred list", 'No', 'No', 'If requested'],
    ['Other relevant police information', 'No', 'No', 'Yes'],
  ], 'Contents by level, from GOV.UK guidance. The certificate goes only to the applicant.', ['l', 'l', 'l', 'l'])}
<h2>The first 30 days</h2>
<p>The window to join the ${h.src('gov_update', 'Update Service')} with an existing certificate is ${h.num(h.FEES.englandWales.updateService.joinWithinDaysOfIssue)} days from its issue date. A certificate printed on 1 October can therefore be added until ${h.date(h.D.updateDeadline('2026-10-01'))}. If you joined during the application with your form reference, the certificate is added automatically once issued. The calculator above counts the days left. After the window, the subscription is only possible with a new check.</p>
<h2>Checking the details</h2>
<p>Read the certificate as soon as it arrives. If a name, date of birth or address is wrong, or a record is not yours, raise a dispute with DBS. Under the ${h.src('gov_dataset1', 'DBS dataset 1')}, DBS also publishes how many disputes it handles each quarter. If you used a basic check online account, the same certificate appears there and can be shared with an employer.</p>
<h2>Showing it to an employer</h2>
<p>The ${h.src('gov_employer', 'employer guidance')} asks the organisation to see the original, check its security features, confirm that it matches your identity and that its level and workforce fit the role. A certificate requested for another role can be accepted, but nothing obliges an employer to do so. The ${h.a('dbs-check-renewal', 'renewal page')} explains when a new one is required, and the ${h.a('what-shows-on-a-dbs-check', 'filtering page')} what each level can show.</p>
<h2>If something on it is wrong</h2>
<p>Check every part of the certificate as soon as it arrives: names, date of birth, and any conviction or information listed. If you think something is inaccurate, contact DBS before you rely on the certificate; DBS publishes the number of disputes it handles in the same dataset as its checks. In Northern Ireland, nidirect sets out a dispute process for AccessNI certificates and offers a free reprint of a lost or damaged certificate within 90 days of issue. In Scotland, a Level 1 disclosure has no paper copy at all: you view and share it online through a secure link.</p>
`,
});
