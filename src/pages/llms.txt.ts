/** llms.txt (RECETTE §21): what the site is, where its figures come from, its main pages. Built from the data. */
import type { APIRoute } from 'astro';
import { PAGES } from '../lib/guides';
import { route } from '../i18n/routes';
import { SITE_URL, LAST_UPDATED } from '../data/site-config';
import { FEE, gbp } from '../lib/labels';
export const GET: APIRoute = () => {
  const lines = [
    '# Disclosure Cost',
    '',
    `> Level, fee and waiting time of criminal record checks in the UK. England and Wales (DBS), fees in force since 5 October 2026 under SI 2026/985: basic ${gbp(FEE.basic)}, standard ${gbp(FEE.standard)}, enhanced ${gbp(FEE.enhanced)} with or without barred lists, Update Service ${gbp(FEE.update)} a year, volunteers free for standard and enhanced. Scotland (Disclosure Scotland): Level 1 ${gbp(FEE.scLevel1)}, Level 2 ${gbp(FEE.scLevel2)}, PVG ${gbp(FEE.pvgJoin)} to join. Northern Ireland (AccessNI): ${gbp(FEE.niBasic)} basic or standard, ${gbp(FEE.niEnhanced)} enhanced. Level by role from the DBS eligibility guidance (38 roles), admin fee and VAT of intermediaries, waits from DBS dataset 1. Official pages read ${LAST_UPDATED}, Open Government Licence v3.0. Published by Radif Partners, an independent publisher; not DBS, not an umbrella body, processes no applications.`,
    '',
    '## Tools and guides',
    `- [DBS check finder](${SITE_URL}${route('home', 'en')}): level, fee, admin fee, VAT and wait for a role.`,
    ...PAGES.map((p) => `- [${p.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.card}`),
    '',
    '## Method',
    `- [How the figures are built](${SITE_URL}${route('method', 'en')})`,
    `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
