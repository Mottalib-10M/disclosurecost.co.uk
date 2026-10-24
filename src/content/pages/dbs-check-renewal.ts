import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'dbs-check-renewal',
  group: 'update',
  order: 31,
  tool: { kind: 'mini:update', props: { level: 2, years: 5, per: 0.5, admin: 0 } },
  related: ['dbs-update-service', 'dbs-certificate', 'dbs-check-for-taxi-drivers', 'which-dbs-check-do-i-need'],
  sources: ['gov_employer', 'gov_update', 'gov_apply_role', 'si_2026_985'],
  slug: 'dbs-check-renewal',
  nav: 'DBS check renewal',
  card: 'No expiry date, so when a new check is due, and what renewing costs.',
  title: 'DBS Check Renewal: No Expiry Date, When a New Check Is Due',
  description: 'DBS check renewal: certificates have no expiry date, so the employer decides: when a new check is due, its cost since October 2026, and the Update Service.',
  h1: 'DBS check renewal: when do you need a new one?',
  intro: 'Over how many years, and how often a new check is asked for: the cost with and without the Update Service.',
  resume: (h) => `A DBS check is never renewed in the strict sense, because a certificate has no expiry date. GOV.UK says it is accurate on the day it was issued and that it is up to the employer to decide when a new check is needed. In practice a new check is asked for in five situations: a new employer whose policy requires its own certificate; a role in another workforce, for example moving from adult care to work with children; a role that needs a higher level; a licence or registration whose rules set a cycle, such as many taxi and private hire licences; and the end of an Update Service subscription that was not renewed. Each new check costs the full fee, ${h.m(h.FEE.enhanced)} for enhanced and ${h.m(h.FEE.standard)} for standard since ${h.effective}, plus any admin fee. The Update Service, at ${h.m(h.FEE.update)} a year, lets an employer confirm online that a standard or enhanced certificate is still current, which often removes the need for a new one. Use the calculator above to compare the two over several years.`,
  faqs: (h) => [
    { q: 'How long is a DBS check valid for?', a: 'There is no official validity period. A certificate shows what was on record when it was issued, and each employer, regulator or licensing body sets its own rule. Some ask for a new check every few years, others accept an older certificate when the person is on the Update Service and the status check is clear.' },
    { q: 'Do I need a new DBS check if I change jobs?', a: 'Not necessarily. The new employer can accept your current certificate if it is at the right level and in the right workforce, and if you are on the Update Service it can check online that nothing has changed. If you are not on the service, many employers will ask for a new check.' },
    { q: 'Is there a cheaper renewal fee for a second DBS check?', a: `No. Every new check costs the full fee: ${h.m(h.FEE.basic)} basic, ${h.m(h.FEE.standard)} standard, ${h.m(h.FEE.enhanced)} enhanced. The only reduced price for an existing holder is in Scotland, where an existing PVG member applying for another role of the same type pays ${h.m(h.FEE.pvgExisting)} instead of ${h.m(h.FEE.pvgJoin)}.` },
    { q: 'Can I renew my DBS check online myself?', a: `Only a basic check can be requested again by you alone, on GOV.UK, for ${h.m(h.FEE.basic)}. A new standard or enhanced check must come from the organisation recruiting you or, if you are self-employed in an eligible role, through an umbrella body. You can renew an Update Service subscription online yourself.` },
  ],
  body: (h) => `
<h2>What triggers a new check</h2>
${h.table(['Situation', 'New check needed?', 'Cost'], [
    ['Same employer, same role, on the Update Service', 'Usually no: a free status check', `${h.m(h.FEE.update)} a year`],
    ['Same employer, same role, not on the service', 'If its policy sets a cycle', `${h.m(h.FEE.enhanced)} + admin fee`],
    ['New employer, same level and workforce, on the service', 'Its choice: status check allowed', 'Free status check'],
    ['Move from the adult to the child workforce', 'Yes', `${h.m(h.FEE.enhanced)} + admin fee`],
    ['Move from a standard to an enhanced role', 'Yes', `${h.m(h.FEE.enhanced)} + admin fee`],
    ['Update Service subscription lapsed', 'Yes, to join again', 'Full fee + subscription'],
    ['Basic certificate, employer wants it recent', 'Yes', h.m(h.FEE.basic)],
  ], 'England and Wales, fees from 5 October 2026. Employer policies vary: this table shows what the rules allow.', ['l', 'l', 'r'])}
<h2>Employer cycles</h2>
<p>The ${h.src('gov_employer', 'GOV.UK guidance for employers')} leaves the decision to the organisation. Many write a cycle into their safeguarding policy, and licensing councils set their own conditions for each licence. A worker who knows the cycle in advance can decide whether the ${h.a('dbs-update-service', 'Update Service')} will save money. The calculator above assumes half a new check a year by default, one every two years; set your own.</p>
<h2>Before you apply again</h2>
<p>Check three things. Is your certificate still on the Update Service, and is the subscription active? Does the new role need the same level and workforce? Has your employer actually refused a status check, or only asked "do you have a DBS"? If all three point to a new application, the ${h.a('dbs-check-cost', 'cost page')} shows the total with the admin fee, and the ${h.a('how-long-does-a-dbs-check-take', 'waiting time page')} how long to allow.</p>
<h2>New check or subscription, over six years</h2>
${h.table(['Level', 'New check every', 'Checks in 6 years', 'Without Update Service', 'With Update Service'], [['standard', 1], ['standard', 3], ['enhanced', 1], ['enhanced', 3]].map(([l, e]) => { const r = h.D.repeatCost(l as 'standard' | 'enhanced', 6, e as number); return [h.levelName(l as 'standard' | 'enhanced'), `${h.num(e as number)} year${e === 1 ? '' : 's'}`, h.num(r.checks), h.m(r.without), h.m(r.withUpdate)]; }), `DBS fees from 5 October 2026, Update Service ${h.m(h.FEE.update)} a year, no admin fee. Only if each employer accepts a status check.`, ['l', 'l', 'r', 'r', 'r'])}
<h2>Renewing the subscription itself</h2>
<p>The ${h.src('gov_update', 'GOV.UK Update Service page')} says a subscription lasts one year. You can choose automatic renewal when you register, or renew up to 30 days before it ends, but not on the last day. If the subscription lapses, you need a new DBS check and a new registration. In Scotland, PVG membership now runs for five years; in Northern Ireland, there is no subscription and each role needs its own check.</p>
<h2>When a status check is not enough</h2>
<p>The Update Service lets you take a certificate from one role to the next, but GOV.UK lists three exceptions: the organisation asks you for a new certificate, the new role is in a different workforce, such as a child workforce role when your certificate is for the adult workforce, or it needs a different level, such as enhanced when you hold a standard certificate. In those three cases a new check is needed whatever the subscription, so the renewal question is really a question about the next role.</p>
`,
});
