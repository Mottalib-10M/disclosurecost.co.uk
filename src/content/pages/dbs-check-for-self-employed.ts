import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'dbs-check-for-self-employed',
  group: 'situations',
  order: 51,
  tool: { kind: 'mini:selfemp', props: { work: 0, clients: 4, admin: 0 } },
  related: ['dbs-umbrella-body', 'dbs-update-service', 'dbs-check-online', 'dbs-eligibility'],
  sources: ['gov_self_employed', 'gov_apply_role', 'gov_employer', 'gov_umbrella', 'gov_update'],
  slug: 'dbs-check-for-self-employed',
  nav: 'DBS check for self-employed',
  card: 'Tutors, carers, coaches: the level you can get alone, through which route, at what cost.',
  title: 'DBS Check for Self-Employed: Tutors, Carers, Route and Cost',
  description: 'DBS check for self-employed people: basic yourself on GOV.UK, enhanced through an umbrella body if the role is eligible, £41 plus admin fee, Update Service.',
  h1: 'DBS checks when you are self-employed',
  intro: 'Choose what you do and how many clients ask: the level, the route and the yearly cost.',
  resume: (h) => `If you are self-employed, you can always request a basic DBS check for yourself on GOV.UK for ${h.m(h.FEE.basic)}. Since the GOV.UK guidance that went live on 21 January 2026, a self-employed person or a personal employee, someone employed directly by a private individual, can also apply for an enhanced check, with the barred lists where the role allows it, through a DBS umbrella body, provided the role is eligible and paid. The client or parent cannot apply for you: you apply, receive the certificate by post and show it. The GOV.UK examples are clear: a private maths tutor working two evenings a week can get an enhanced check with the children's barred list; a personal carer paid through direct payments can get one with the adults' barred list; a plumber who wants a check to reassure customers is not eligible and should get a basic check. The DBS fee is ${h.m(h.FEE.enhanced)} since ${h.effective}, plus the umbrella body's admin fee. Joining the Update Service lets every client check the same certificate for free.`,
  faqs: (h) => [
    { q: 'Can a parent apply for a DBS check on a private tutor?', a: 'No. GOV.UK says a person hiring a self-employed worker or a personal employee for themselves or their family cannot request a DBS check on them. The tutor applies through an umbrella body and shows the certificate, and the parent can ask to see it and check its date and security features.' },
    { q: 'Which umbrella bodies accept self-employed applicants?', a: 'Not all of them. The GOV.UK search for umbrella bodies has a filter for organisations that process checks for self-employed people. Compare their admin fees and what they include, such as online identity checks, before you choose. The DBS fee is the same with any of them.' },
    { q: 'I am a self-employed electrician: can I get an enhanced DBS check?', a: 'Not for the trade itself. GOV.UK gives the example of a self-employed plumber who wanted an enhanced check with barred lists for working in homes: the umbrella body told him he was not eligible and could consider a basic check. Work in homes alone does not make a role eligible.' },
    { q: 'Can a company I contract with apply for me?', a: 'Yes. If you are self-employed and contract your services to an organisation, such as a school or an agency, it may apply on your behalf in line with its policy when the role is eligible. GOV.UK advises discussing it with them. Otherwise you apply yourself through an umbrella body.' },
  ],
  body: (h) => `
<h2>The three GOV.UK examples</h2>
${h.table(['Example from the guidance', 'Level', 'Route', 'DBS fee'], [
    ['Private maths tutor, 2 evenings a week, no agency', "Enhanced with children's barred list", 'Umbrella body', h.m(h.FEE.enhanced)],
    ['Personal carer recruited through direct payments', "Enhanced with adults' barred list", 'Umbrella body', h.m(h.FEE.enhanced)],
    ['Self-employed plumber working in homes', 'Basic only', 'GOV.UK, yourself', h.m(h.FEE.basic)],
  ], `Examples of the ${'GOV.UK'} guidance for self-employed people and personal employees (live from 21 January 2026). Fees from 5 October 2026, before any admin fee.`, ['l', 'l', 'l', 'r'])}
<h2>The four steps</h2>
<p>The ${h.src('gov_self_employed', 'self-employed guidance')} sets four steps. Check that the role is eligible using the DBS eligibility guidance. Find an umbrella body that processes checks for self-employed people, using the filter of the ${h.src('gov_umbrella', 'GOV.UK search')}. Let it guide you through the application and prove your identity; at that point you may join the ${h.src('gov_update', 'Update Service')} with your application reference. Receive the certificate by post and show it to the people who hire you.</p>
<h2>Why the Update Service matters more when you work alone</h2>
<p>An employee usually has one employer asking for a check. A self-employed tutor, coach or carer may have a new client each month, and each can ask to see a recent certificate. With the subscription, at ${h.m(h.FEE.update)} a year, a client you authorise can check online that nothing has been added since. Without it, a client who wants a recent certificate leaves you paying another ${h.m(h.FEE.enhanced)} and admin fee. The calculator above adds the first-year cost; the ${h.a('dbs-update-service', 'Update Service page')} compares several years.</p>
<h2>Personal employees</h2>
<p>A personal employee is employed directly by a private individual to provide services to them or their family, such as a carer paid by someone with a personal health budget or direct payments, or a nanny. The rules are the same as for the self-employed: the worker applies through an umbrella body when the role is eligible. Registered childminders follow a different route, through Ofsted, as the ${h.src('gov_apply_role', 'GOV.UK applicant page')} notes.</p>
<h2>Self-employed in Scotland and Northern Ireland</h2>
<p>The same principle applies elsewhere in the UK. In Northern Ireland, the ${h.src('ani_selfemp', 'AccessNI self-employed route')} uses an AccessNI umbrella body, which charges a fee on top of the ${h.m(h.FEE.niEnhanced)} enhanced fee, and the certificate is issued digitally to your nidirect account; its examples are the same tutor, carer and plumber. In Scotland, mygov.scot says you can apply to the PVG scheme on your own if you are self-employed, a personal assistant or work for an individual.</p>
`,
});
