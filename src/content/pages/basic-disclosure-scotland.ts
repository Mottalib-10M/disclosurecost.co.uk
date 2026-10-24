import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'basic-disclosure-scotland',
  group: 'nations',
  order: 62,
  tool: { kind: 'mini:basicwhere', props: { nation: 2 } },
  related: ['basic-dbs-check', 'pvg-scheme', 'access-ni-check', 'criminal-record-check-uk'],
  sources: ['ds_basic', 'ds_levels', 'ds_fees', 'ds_q1'],
  slug: 'basic-disclosure-scotland',
  nav: 'Basic disclosure Scotland',
  card: 'The Level 1 disclosure that replaced the basic disclosure: £25, online, digital.',
  title: 'Basic Disclosure Scotland: Level 1 Cost, Apply and Sharing',
  description: 'Basic disclosure Scotland, now the Level 1 disclosure: £25, apply online with ScotAccount, usually processed within 14 days, then shared as a digital copy.',
  h1: 'Basic disclosure in Scotland, now called Level 1',
  intro: 'Choose where the job is: which body issues the basic check and what it costs.',
  resume: (h) => `In Scotland the basic disclosure has been replaced by the Level 1 disclosure, issued by Disclosure Scotland. It is the lowest level: it shows the date it was issued, your name, your date of birth and any unspent convictions. Anyone can apply for one, for an employer or for personal reasons such as a visa application. It costs ${h.m(h.FEE.scLevel1)}, paid by card, against ${h.m(h.FEE.basic)} for a basic DBS check in England and Wales since ${h.effective}. You apply online on mygov.scot after signing in with ScotAccount, which you can create during the application with a personal email address. An application is usually processed within 14 days unless Disclosure Scotland needs more information, and across all its checks Disclosure Scotland reported an average of ${h.days(h.FEES.scotland.processing.averageDays)} from April to June 2026. There is no paper certificate: you receive an email with a secure link to view the disclosure online and share it with the organisation that asked for it. Apply in Scotland if the role is in Scotland; for a role in England or Wales, apply to DBS.`,
  faqs: (h) => [
    { q: 'Is a Level 1 disclosure the same as a basic disclosure?', a: 'Yes in substance. mygov.scot says Level 1 has replaced the basic disclosure and is the lowest level. Like the old basic disclosure, it shows unspent convictions only. The name changed with the new Scottish disclosure levels, which also created Level 2 and Level 2 with a barred list check.' },
    { q: 'Can I get a paper Level 1 disclosure?', a: 'No. Disclosure Scotland sends an email with a secure link; you view the disclosure online and can share it from there with the organisation. If you cannot apply online, mygov.scot lists offline options. A DBS basic certificate, by contrast, is still posted on paper.' },
    { q: 'I live in Scotland but the job is in England: which check?', a: `The check of the nation where the job is. For a role in England or Wales, mygov.scot itself sends you to DBS, where a basic check costs ${h.m(h.FEE.basic)}. For a role in Scotland, apply for a Level 1 disclosure, even if you live elsewhere in the UK.` },
    { q: 'Can a Level 1 disclosure be verified for a visa?', a: 'Yes. mygov.scot says you may be asked to have your disclosure verified when applying for a visa, and it has a page on how to get a Level 1 disclosure verified. Check with the embassy or authority what form of verification it accepts before you apply.' },
  ],
  body: (h) => `
<h2>Level 1 against the other basic checks</h2>
${h.table(['', 'Scotland, Level 1', 'England and Wales, basic DBS', 'Northern Ireland, AccessNI basic'], [
    ['Fee', h.m(h.FEE.scLevel1), h.m(h.FEE.basic), h.m(h.FEE.niBasic)],
    ['Sign-in', 'ScotAccount', 'GOV.UK One Login', 'nidirect account'],
    ['Certificate', 'Digital only', 'Paper, also viewable online', 'Sent to you, free reprint within 90 days'],
    ['Latest average', h.days(h.FEES.scotland.processing.averageDays), h.days(h.avg('basic').days), h.days(h.FEES.northernIreland.turnaround.averageDays.basic)],
  ], `Official pages read on 24 October 2026. Scotland average is for all Disclosure Scotland applications, April to June 2026.`, ['l', 'l', 'l', 'l'])}
<h2>How to apply</h2>
<p>The ${h.src('ds_basic', 'mygov.scot Level 1 page')} sets three steps. Complete the application after signing in with ScotAccount, using a personal email address. Track it in your account. When it is processed, open the secure link in the email from Disclosure Scotland, check your junk folder if it does not arrive, and share the disclosure with the organisation that asked for it.</p>
<h2>When you need more than Level 1</h2>
<p>A Level 1 disclosure does not show spent convictions or barred list status. For specific roles such as solicitors or prison workers, the organisation starts a Level 2 application, also ${h.m(h.FEE.scLevel2)} on the ${h.src('ds_fees', 'fees page')}; for regulated roles with children or protected adults, it is the ${h.a('pvg-scheme', 'PVG scheme')} (${h.src('ds_levels', 'disclosure levels')}).</p>
<h2>What a Level 1 disclosure is used for</h2>
<p>The most common reason is to share it with an employer, who uses it to help decide whether you are right for a role. You can also get one for any purpose, such as a visa application, where you may be asked to have it verified; mygov.scot has a page on verification. Because it shows only unspent convictions, a conviction stops appearing once its disclosure period has ended and it becomes spent.</p>
<h2>Help and offline options</h2>
<p>If you cannot apply online, mygov.scot lists offline options. Disclosure Scotland runs a helpline on 0300 020 0040, open Monday to Thursday 9am to 4pm and Friday 9am to 3.30pm, and answers questions by email. It cannot tell you whether an employer will accept your disclosure: ask the employer.</p>
<h2>Level 1 and an English job</h2>
<p>A Level 1 disclosure is meant for roles in Scotland. If you live in Scotland and the job is in England or Wales, mygov.scot sends you to DBS, and the GOV.UK service charges ${h.m(h.FEE.basic)}. Ask the employer which body it wants before you pay twice.</p>
`,
});
