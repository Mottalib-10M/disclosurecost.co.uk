import type { Locale } from './routes';
import FEES from '../data/fees.json';
import PERF from '../data/performance.json';
const fmt = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const en = {
  updatedOn: 'Fees and data read on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Fees and rules checked by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Questions applicants and employers ask', relatedCalculators: 'Next pages to check', sourcesTitle: 'Official pages behind this page', writtenBy: 'Compiled by',
  asOf: `DBS fees in force since ${fmt(FEES.englandWales.effectiveFrom)} (SI 2026/985), DBS performance data published on ${fmt(PERF.publicUpdatedAt)}`, lastUpdated: 'official pages last read on', footerValidated: 'Fees from legislation.gov.uk, GOV.UK, Disclosure Scotland and nidirect, Open Government Licence v3.0', footerBrowser: 'Every calculation runs in your browser · nothing you type is sent · free, no email, no account, no application taken',
  footerDisclaimer: 'Disclosure Cost is an independent site published by Radif Partners. It is not the Disclosure and Barring Service, Disclosure Scotland, AccessNI, the Home Office or any government body, and it is not an umbrella body: it processes no application and sells no checks. The level shown is indicative; the organisation recruiting you decides which check it asks for.', footerPopular: '',
  notFound: 'There is no page at this address. The check finder, the cost of each level and the Update Service calculator are one click away.',
  readMore: 'Read more', disclaimer: 'Indicative level and cost from the official guidance and fee regulations: the recruiting organisation decides which check a role needs, and this is not legal advice. This is not a DBS or government site.',
};
export function t(_lang: Locale) { return en; }
