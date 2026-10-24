import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'dbs-update-service',
  group: 'update',
  order: 30,
  tool: { kind: 'mini:update', props: { level: 3, years: 3, per: 1, admin: 0 } },
  related: ['dbs-check-renewal', 'dbs-certificate', 'dbs-check-for-self-employed', 'dbs-check-for-taxi-drivers'],
  sources: ['gov_update', 'gov_update_employer', 'si_2026_985', 'gov_dataset1', 'gov_employer'],
  slug: 'dbs-update-service',
  nav: 'DBS Update Service',
  card: '£15 a year, 30 days to join: when the subscription beats a new check.',
  title: 'DBS Update Service: £15 a Year, 30-Day Rule, Is It Worth It?',
  description: 'DBS Update Service: £15 a year since 5 October 2026, free for volunteers. Join within 30 days of the certificate; employers check status free. Worth it?',
  h1: 'DBS Update Service: what it costs and when it pays',
  intro: 'Set how long you will need the certificate and how often you would otherwise be checked again.',
  resume: (h) => `The DBS Update Service lets you keep a standard or enhanced certificate up to date and lets an employer you authorise check online, at once and for free, whether any new information has been added since it was issued. It costs ${h.m(h.FEE.update)} a year since ${h.effective}, down from ${h.m(h.FEE.oldUpdate)}, and nothing for volunteers. You can join while the check is running, with the application reference on the form, or with the certificate number within ${h.num(h.FEES.englandWales.updateService.joinWithinDaysOfIssue)} days of the date printed on the certificate. After that, a new check is needed to join. A subscription lasts one year and can renew itself; if it lapses, the certificate can no longer be checked online. It pays off as soon as it saves one new check: an enhanced check costs ${h.m(h.FEE.enhanced)} before any admin fee. It does not help when the next role needs a different level or workforce. In ${h.month(h.lastMonth)}, ${h.num(h.update.last.active)} subscriptions were active.`,
  faqs: (h) => [
    { q: 'Can I join the Update Service after 30 days?', a: `No. With an existing certificate you must register within ${h.num(h.FEES.englandWales.updateService.joinWithinDaysOfIssue)} days of its issue date. After that, the only way in is a new check: subscribe during the application with the reference number, or within ${h.num(h.FEES.englandWales.updateService.joinWithinDaysOfIssue)} days of the new certificate.` },
    { q: 'Does the Update Service work for a basic DBS check?', a: 'No. The service covers standard and enhanced certificates only. For a basic certificate, GOV.UK points to a DBS online account instead, which lets you view the certificate and share it with an employer, but a new basic check is still the only way to bring it up to date.' },
    { q: 'How does an employer do a status check?', a: 'With your permission, your certificate number, your name and date of birth, the employer uses the online status check. It needs no registration and costs nothing, and the answer comes at once: either no new information, or the certificate is no longer current and a new check should be requested. The employer must be legally entitled to see that level of certificate.' },
    { q: 'What happens if I forget to renew the Update Service?', a: 'The subscription ends and the certificate drops out of the service. You cannot renew on the last day of the subscription. To be back on the service you need a new check and a new registration. Choosing automatic renewal when you first register avoids that.' },
  ],
  body: (h) => `
<h2>What a year of subscription is worth</h2>
${h.table(['Situation over 3 years', 'Without Update Service', 'With it', 'Difference'], [
    ['One enhanced check, no new one asked', h.m(h.D.updateVsNewChecks('enhanced', 3, 0).withoutUpdate), h.m(h.D.updateVsNewChecks('enhanced', 3, 0).withUpdate), h.m(h.D.updateVsNewChecks('enhanced', 3, 0).saving)],
    ['One new enhanced check a year', h.m(h.D.updateVsNewChecks('enhanced', 3, 1).withoutUpdate), h.m(h.D.updateVsNewChecks('enhanced', 3, 1).withUpdate), h.m(h.D.updateVsNewChecks('enhanced', 3, 1).saving)],
    ['Two a year, £10 admin fee each', h.m(h.D.updateVsNewChecks('enhanced', 3, 2, 10).withoutUpdate), h.m(h.D.updateVsNewChecks('enhanced', 3, 2, 10).withUpdate), h.m(h.D.updateVsNewChecks('enhanced', 3, 2, 10).saving)],
    ['One new standard check a year', h.m(h.D.updateVsNewChecks('standard', 3, 1).withoutUpdate), h.m(h.D.updateVsNewChecks('standard', 3, 1).withUpdate), h.m(h.D.updateVsNewChecks('standard', 3, 1).saving)],
  ], `Fees since 5 October 2026: enhanced ${h.m(h.FEE.enhanced)}, standard ${h.m(h.FEE.standard)}, Update Service ${h.m(h.FEE.update)} a year. A negative difference means the subscription costs more.`, ['l', 'r', 'r', 'r'])}
<p>The subscription is cheapest for people who change employer, agency or client often: supply teachers, agency carers, locum nurses, self-employed tutors, sports coaches who work for several clubs. For someone who stays in one job and whose employer never asks for a new check, it is an extra cost.</p>
<h2>The rules that catch people out</h2>
<ul>
<li><strong>The 30-day window.</strong> It runs from the date printed on the certificate, not from the day it arrives. A certificate held up in the post can leave you only a few days.</li>
<li><strong>Same level and workforce.</strong> The ${h.src('gov_update', 'GOV.UK page')} says you can take a certificate from one role to the next unless the organisation asks for a new one, the new role is in another workforce (adult instead of child) or needs another level.</li>
<li><strong>Employers may still insist.</strong> A status check is allowed, not compulsory: an employer's policy can require a fresh certificate.</li>
</ul>
<h2>For employers</h2>
<p>A status check needs no registration and no payment. The ${h.src('gov_update_employer', 'employer guide')} explains the legal conditions: the organisation must be entitled to ask for that level of check for the role and must have the worker's consent. A result saying that new information exists does not reveal it; the employer then asks for a new check. Employers who recruit many people on the service save both the fee and the wait, which reached ${h.days(h.avg('enhanced').days)} on average for enhanced checks in ${h.month(h.police.dataMonth)}.</p>
<p>When you need a new check anyway, the ${h.a('dbs-check-renewal', 'renewal page')} explains what triggers one, and the ${h.a('dbs-certificate', 'certificate page')} works out your 30-day deadline.</p>
<h2>No equivalent in Scotland or Northern Ireland</h2>
<p>The Update Service is a DBS service for England and Wales. In Scotland, the PVG scheme does a similar job differently: membership lasts five years and Disclosure Scotland keeps checking members, and a member applying for a new role pays ${h.m(h.FEE.pvgExisting)}. In Northern Ireland, nidirect says an AccessNI certificate is valid for the recruitment to a specific role and cannot be transferred, so each new role needs a new check.</p>
`,
});
