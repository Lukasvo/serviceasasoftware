# serviceasasoftware.be

Een open, niet-commerciële community over **Service-as-Software** in België: bedrijven die het eindresultaat van een vakdienst leveren (een nagekeken contract, een geprijsde offerte, een afgesloten boekhouding), waarbij AI het meeste werk doet en een erkende expert aftekent.

Dit is een early stage idee. Alle input is welkom.

## Bijdragen

Alle inhoud staat in gewone JSON-bestanden. Je hoeft niet te kunnen programmeren om iets aan te passen:

| Bestand | Wat staat erin |
|---|---|
| [`data/spelers.json`](data/spelers.json) | Belgische bedrijven die volgens het model werken |
| [`data/radar.json`](data/radar.json) | De idee-radar: diensten met hun scores en eventuele Belgische speler |
| [`data/site.json`](data/site.json) | De scorecard-vragen en het get-started-stappenplan |

**Een bedrijf toevoegen?** Open een [issue](../../issues/new) met naam, website, domein, wie aftekent en het prijsmodel, of pas `data/spelers.json` aan via een pull request.

Een bedrijf hoort erbij als het:
1. het eindresultaat levert aan de klant (geen software die de klant zelf bedient),
2. een expert heeft die het werk controleert en aftekent,
3. in België actief is.

Tools voor vakmensen en AI-consultancybureaus vallen buiten scope.

## Lokaal draaien

Geen dependencies nodig, enkel Node 18+:

```bash
node build.mjs
npx serve public
```

`build.mjs` leest de JSON-bestanden en genereert `public/index.html`. Vercel doet hetzelfde bij elke push naar `main`.

## Licentie

Inhoud: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.nl). Code: MIT.

Een initiatief van [Lukas Van Orshoven](https://www.linkedin.com/in/lukasvanorshoven/).
