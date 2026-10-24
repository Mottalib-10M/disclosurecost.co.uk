import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'dbs-check-online',
  group: 'situations',
  order: 50,
  tool: { kind: 'mini:route', props: { who: 0 } },
  related: ['basic-dbs-check', 'dbs-umbrella-body', 'dbs-check-for-self-employed', 'basic-dbs-check-cost'],
  sources: ['gov_basic', 'gov_employer', 'gov_self_employed', 'gov_umbrella'],
  slug: 'dbs-check-online',
  nav: 'DBS check online',
  card: 'Which online route you can use: GOV.UK for basic, an employer or umbrella body above.',
  title: 'DBS Check Online: GOV.UK Basic Route and Umbrella Bodies',
  description: 'DBS check online: apply yourself on GOV.UK for a basic check at £20 with GOV.UK One Login; standard and enhanced go online through an employer or umbrella body.',
  h1: 'Applying for a DBS check online',
  intro: 'Say who needs the check: the online route open to you, the fee and who pays.',
  resume: (h) => `There are two ways to apply for a DBS check online, and which one you can use depends on the level. For a basic check, anyone aged ${h.P.rules.basicMinAge} or over can apply on the GOV.UK service, between 8am and 11:30pm, for ${h.m(h.FEE.basic)}. You prove your identity with GOV.UK One Login, give your addresses for the last ${h.P.rules.basicAddressYears} years and, if you have them, your passport, driving licence and National Insurance number; the application is usually processed within ${h.days(h.P.rules.basicDirectDays)}, and the certificate is posted. For a standard or enhanced check there is no public online form: the organisation recruiting you starts the application, either as a body registered with DBS or through an umbrella body, which often uses its own online form and checks your documents. Self-employed people in an eligible role apply online through an umbrella body too. Any site that offers a standard or enhanced check to anyone who asks, with no role, is not following the rules.`,
  faqs: (h) => [
    { q: 'Is it safe to apply for a DBS check through a website?', a: `The official basic route is the GOV.UK service, at ${h.m(h.FEE.basic)}. Other sites are companies registered with DBS or acting for one: they can be legitimate, but they charge more and you share identity documents with them. Check that the body appears on the GOV.UK list of umbrella bodies or responsible organisations.` },
    { q: 'What is GOV.UK One Login and do I need it?', a: 'GOV.UK One Login is the government sign-in used to prove your identity online. The basic DBS check service requires it: you create an account with an email address and confirm your identity, for example with photo ID. If you cannot use it, an employer can request the basic check through a responsible organisation.' },
    { q: 'Can I apply for an enhanced DBS check online myself?', a: 'Only through an umbrella body, and only if you are self-employed or a personal employee in an eligible role, such as a private tutor or a carer paid through direct payments. The umbrella body checks that the role qualifies before sending the application. Anyone else needs the organisation recruiting them to apply.' },
    { q: 'Do I get a digital DBS certificate?', a: 'The certificate is still posted on paper to the applicant. For a basic check, you can also view it in your DBS online account and share it with an employer. For standard and enhanced checks, the Update Service lets an employer check the status online, but it does not show the content of the certificate.' },
  ],
  body: (h) => `
<h2>Routes by level</h2>
${h.table(['Level', 'Online route', 'Who starts it', 'Fee'], [
    ['Basic', 'GOV.UK basic check service', 'You', h.m(h.FEE.basic)],
    ['Basic', 'Responsible organisation', 'Employer', `${h.m(h.FEE.basic)} + admin fee`],
    ['Standard or enhanced', 'Registered body (100 checks a year or more)', 'Employer', `${h.m(h.FEE.standard)} or ${h.m(h.FEE.enhanced)}`],
    ['Standard or enhanced', 'Umbrella body', 'Employer, or self-employed applicant', `${h.m(h.FEE.standard)} or ${h.m(h.FEE.enhanced)} + admin fee`],
  ], 'England and Wales, fees from 5 October 2026. Volunteers: standard and enhanced free.', ['l', 'l', 'l', 'r'])}
<h2>The basic service step by step</h2>
<p>The ${h.src('gov_basic', 'GOV.UK basic check service')} first asks you to sign in or create a GOV.UK One Login and prove your identity. You then give your current and previous addresses for five years with dates, and pay by card. A paper certificate is posted to your address; you can also create a DBS online account to see it and share it. The check is for work in England and Wales: if the job is in Scotland, apply for a Level 1 disclosure on mygov.scot, and for Northern Ireland use AccessNI on nidirect.</p>
<h2>Standard and enhanced: the employer's part</h2>
<p>According to the ${h.src('gov_employer', 'GOV.UK employer guidance')}, an organisation doing fewer than ${h.num(h.P.rules.umbrellaThreshold)} standard or enhanced checks a year must use an umbrella body; above that it can register with DBS or keep using one. The organisation gives you the form, often an online one hosted by the umbrella body, checks your identity documents and sends the application. DBS then posts the certificate to you. The umbrella body may charge an admin fee, set freely: the ${h.a('dbs-umbrella-body', 'umbrella body page')} explains how to compare them using the ${h.src('gov_umbrella', 'GOV.UK search')}.</p>
<p>For self-employed people, the ${h.src('gov_self_employed', 'self-employed guidance')} of January 2026 gives the steps and the examples of a maths tutor, a personal carer and a plumber; the ${h.a('dbs-check-for-self-employed', 'self-employed page')} works out the cost.</p>
<h2>Online routes in Scotland and Northern Ireland</h2>
<p>For a role in Scotland, you apply for a Level 1 disclosure on mygov.scot after signing in with ScotAccount, and the result is a digital disclosure shared through a secure link (${h.src('ds_basic', 'mygov.scot')}). For Northern Ireland, nidirect offers online basic checks for individuals, and standard and enhanced checks through a registered body, or an umbrella body for self-employed people (${h.src('ani_selfemp', 'nidirect')}).</p>
<h2>Sites that sell a check</h2>
<p>A company offering a "DBS check online" can be a legitimate responsible organisation or umbrella body. Its price is the DBS fee plus its own fee, so compare it with the ${h.m(h.FEE.basic)} of the GOV.UK service before paying. None of them can deliver a standard or enhanced check for a role that is not eligible.</p>
`,
});
