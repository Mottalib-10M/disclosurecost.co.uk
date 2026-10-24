#!/usr/bin/env python3
"""
Collecte des données officielles du site uk-dbs-check (phase 1, 2026-10-24).

Sources lues (toutes Crown copyright, Open Government Licence v3.0) :
  1. GOV.UK Content API : guides « dbs-check-applicant-criminal-record », « dbs-update-service »,
     « criminal-record-checks-apply-role » (montants affichés) et l'annonce du 9 septembre 2026
     « DBS reduces fees for checks and Update Service from 5 October 2026 ».
  2. legislation.gov.uk : SI 2026/985 (Police Act 1997 (Criminal Records) (Amendment) Regulations 2026,
     en vigueur le 5 octobre 2026) et SI 2024/1111 (barème précédent, 2 décembre 2024).
  3. GOV.UK : « DBS dataset 1 » (dernier fichier trimestriel .xlsx) → délais nationaux par niveau,
     abonnés au Update Service.
  4. GOV.UK Content API : dates de mise à jour des 6 guides d'éligibilité DBS.

Les barèmes de Disclosure Scotland et d'AccessNI n'ont pas d'API : ils sont dans src/data/fees.json avec
leur URL et leur date de lecture ; ce script vérifie seulement que les pages répondent et contiennent
encore les montants (alerte sinon, jamais de mise à jour silencieuse).

Usage : python3 scripts/update-data.py [--out data]
Sort en erreur (code 1) si un montant officiel lu ne correspond plus à src/data/fees.json :
le workflow cron ouvre alors une alerte au lieu de publier un chiffre faux.
"""
import json, re, html, sys, io, os, datetime, urllib.request

OUT = sys.argv[sys.argv.index('--out') + 1] if '--out' in sys.argv else os.path.join(os.path.dirname(__file__), '..', 'src', 'data')
UA = {'User-Agent': 'uk-dbs-check data refresh (Radif Partners)'}


def get(url, binary=False):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=60) as r:
        b = r.read()
    return b if binary else b.decode('utf-8', 'replace')


def text(h):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', h)))


def content(path):
    return json.loads(get('https://www.gov.uk/api/content/' + path.lstrip('/')))


def main():
    os.makedirs(OUT, exist_ok=True)
    errors = []
    fees = json.load(open(os.path.join(OUT, 'fees.json')))
    ew = {p['id']: p for p in fees['englandWales']['products']}

    # 1. Montants affichés sur GOV.UK
    g = content('dbs-check-applicant-criminal-record')
    body = ' '.join(text(p['body']) for p in g['details']['parts'])
    for pid, pat in [('basic', r'basic check costs £([\d.]+)'), ('standard', r'Standard £([\d.]+)'),
                     ('enhanced', r'Enhanced £([\d.]+) Enhanced with barred'),
                     ('enhanced-barred', r'Enhanced with barred lists £([\d.]+)'),
                     ('adult-first', r'The service costs an extra £([\d.]+)')]:
        m = re.search(pat, body)
        if not m:
            errors.append(f'GOV.UK : montant introuvable pour {pid}')
        elif float(m.group(1)) != ew[pid]['fee']:
            errors.append(f'GOV.UK : {pid} = £{m.group(1)} ≠ fees.json £{ew[pid]["fee"]}')
    u = text(content('dbs-update-service')['details']['body'])
    m = re.search(r'It costs £([\d.]+) per year', u)
    if not m or float(m.group(1)) != fees['englandWales']['updateService']['feePerYear']:
        errors.append('GOV.UK : prix du Update Service changé ou introuvable')

    # 2. Texte du SI en vigueur
    si = text(get('https://www.legislation.gov.uk/uksi/2026/985/made/data.xml'))
    for needle in ['come into force on 5th October 2026', 'for “£49.50” substitute “£41”',
                   'for “£21.50” substitute “£20”', 'for “£16” substitute “£15”']:
        if needle not in si:
            errors.append(f'SI 2026/985 : « {needle} » absent')

    # 3. DBS dataset 1 : dernier trimestre publié
    ds = content('government/statistics/dbs-dataset-1-dbs-checks-the-dbs-update-service-and-disputes')
    att = [a for a in ds['details']['attachments'] if a.get('url', '').endswith('.xlsx')][0]
    perf = {'source': 'https://www.gov.uk/government/statistics/dbs-dataset-1-dbs-checks-the-dbs-update-service-and-disputes',
            'file': att['url'], 'fileTitle': att['title'], 'publicUpdatedAt': ds['public_updated_at'][:10],
            'licence': 'Open Government Licence v3.0', 'months': {}}
    try:
        import openpyxl
        wb = openpyxl.load_workbook(io.BytesIO(get(att['url'], binary=True)), data_only=True)
        for sheet, key, target in [('Enhanced Check Performance', 'enhanced', 14),
                                   ('Standard Check Performance', 'standard', 3),
                                   ('Basic Check Performance', 'basic', 2)]:
            for raw in wb[sheet].iter_rows(values_only=True):
                r = [c for c in raw if c is not None]  # les colonnes sont décalées selon le trimestre
                if len(r) >= 5 and isinstance(r[0], datetime.datetime) and isinstance(r[1], (int, float)):
                    mo = r[0].strftime('%Y-%m')
                    perf['months'].setdefault(mo, {})[key] = {
                        'despatched': int(r[1]), 'withinTarget': int(r[2]), 'targetDays': target,
                        'targetShare': r[3], 'share': round(r[4], 4)}
        subs = {}
        for raw in wb['Update Service Subscriptions'].iter_rows(values_only=True):
            r = [c for c in raw if c is not None]
            if len(r) >= 7 and isinstance(r[0], datetime.datetime) and isinstance(r[1], (int, float)):
                subs[r[0].strftime('%Y-%m')] = {'newPaid': int(r[1]), 'newVolunteer': int(r[2]), 'active': int(r[6])}
        perf['updateService'] = subs
    except ImportError:
        errors.append('openpyxl absent : pip install openpyxl')
    json.dump(perf, open(os.path.join(OUT, 'performance.json'), 'w'), indent=1, ensure_ascii=False)

    # 4. Dates des guides d'éligibilité
    elig = json.load(open(os.path.join(OUT, 'eligibility-sources.json')))
    for s in elig['guides']:
        d = content(s['path'])
        s['publicUpdatedAt'] = d['public_updated_at'][:10]
    elig['checkedOn'] = datetime.date.today().isoformat()
    json.dump(elig, open(os.path.join(OUT, 'eligibility-sources.json'), 'w'), indent=1, ensure_ascii=False)

    # 5. Écosse et Irlande du Nord : contrôle de présence des montants
    for nation, url, needles in [
        ('scotland', fees['scotland']['source'], ['£59', '£18', '£25']),
        ('northernIreland', fees['northernIreland']['source'], ['£16.00', '£32.00'])]:
        try:
            t = text(get(url))
            for n in needles:
                if n not in t:
                    errors.append(f'{nation} : « {n} » absent de {url}')
        except Exception as e:  # page bloquée : on garde le chiffre daté, on signale
            errors.append(f'{nation} : lecture impossible ({e})')

    fees['checkedOn'] = datetime.date.today().isoformat()
    json.dump(fees, open(os.path.join(OUT, 'fees.json'), 'w'), indent=1, ensure_ascii=False)
    if errors:
        print('\n'.join('ALERTE ' + e for e in errors))
        sys.exit(1)
    print('OK : barèmes conformes, performance', max(perf['months']) if perf['months'] else '—')


if __name__ == '__main__':
    main()
