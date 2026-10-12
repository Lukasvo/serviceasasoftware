// Bouwt public/index.html uit de JSON-bestanden in data/. Geen dependencies nodig.
// Gebruik: node build.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const REPO = 'https://github.com/Lukasvo/serviceasasoftware';

const load = (f) => JSON.parse(readFileSync(new URL(`./data/${f}`, import.meta.url), 'utf8'));
const site = load('site.json');
const radar = load('radar.json').diensten;
const spelers = load('spelers.json');

const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pad = (n) => String(n).padStart(2, '0');

const DOT = ['zwak', 'gemiddeld', 'sterk'];
const LABEL = ['Zwak', 'Gemiddeld', 'Sterk'];
const KOLOMMEN = ['Data in/uit', 'Objectief', 'Uitbesteed', 'Betaalt', 'Volume'];

const criteria = site.criteria.map((c, i) => `
        <div class="card">
          <span class="nr">${pad(i + 1)}</span>
          <h3>${esc(c.title)}</h3>
          <p>${esc(c.body)}</p>
        </div>`).join('');

const radarRows = radar.map((r) => `
            <tr>
              <th scope="row">${esc(r.dienst)}</th>
              ${r.scores.map((s) => `<td class="c"><span class="dot ${DOT[s]}" role="img" aria-label="${LABEL[s]}"></span></td>`).join('')}
              <td>${r.speler
                ? `<a href="${esc(r.url)}">${esc(r.speler)}</a>`
                : '<span class="gap">Witte vlek</span>'}</td>
            </tr>`).join('');

const spelerCards = spelers.map((p) => `
        <article class="card player">
          <span class="tag">${esc(p.domein)}</span>
          <h3>${esc(p.naam)}</h3>
          <p class="grow">${esc(p.omschrijving)}</p>
          <dl>
            <dt>Aftekening</dt><dd>${esc(p.aftekening)}</dd>
            <dt>Prijs</dt><dd>${esc(p.prijs)}</dd>
            <dt>Basis</dt><dd>${esc(p.basis)}</dd>
          </dl>
          <a class="site" href="${esc(p.url)}">${esc(p.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''))}</a>
        </article>`).join('');

const steps = site.steps.map((s, i) => `
        <li>
          <span class="big">${i + 1}</span>
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.body)}</p>
        </li>`).join('');

const html = `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>serviceasasoftware.be · Service-as-Software in België</title>
<meta name="description" content="Open community over Service-as-Software in België: wat het is, welke diensten zich ervoor lenen, wie het al doet en hoe je er een startup rond bouwt.">
<meta property="og:title" content="serviceasasoftware.be">
<meta property="og:description" content="Op zoek naar een startup-idee? Alles over Service-as-Software in België.">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%2312151A'/%3E%3Ccircle cx='16' cy='16' r='6' fill='%238FA2FF'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap">
<link rel="stylesheet" href="/styles.css">
</head>
<body>

<div class="banner">
  <div class="wrap">
    <span class="pill">Early stage</span>
    <span>Dit idee staat nog in de steigers: alle input is welkom.</span>
  </div>
</div>

<header class="top">
  <div class="wrap row">
    <a href="#top" class="logo" aria-label="serviceasasoftware.be, naar boven">
      <span class="mark" aria-hidden="true"><span></span></span>
      <span>serviceasasoftware<b>.be</b></span>
    </a>
    <nav aria-label="Hoofdmenu">
      <a href="#wat">Wat is het?</a>
      <a href="#scorecard">Scorecard</a>
      <a href="#radar">Idee-radar</a>
      <a href="#spelers">Belgische spelers</a>
      <a href="#start">Get started</a>
    </nav>
  </div>
</header>

<main>
<section id="top" class="wrap hero">
  <div class="stack">
    <span class="lead-pill">Op zoek naar een startup-idee?</span>
    <h1>Verkoop het resultaat,<br>niet de tool.</h1>
    <p class="intro">Alles over Service-as-Software in België: wat het is, welke diensten zich ervoor lenen, wie het al doet en hoe je er zelf een bedrijf rond bouwt.</p>
    <div class="buttons">
      <a class="btn dark" href="#radar">Ontdek de idee-radar</a>
      <a class="btn line" href="#start">Start je eigen bedrijf</a>
    </div>
  </div>
  <div class="formula">
    <span class="eyebrow muted">De formule</span>
    <div class="f-row">
      <span class="icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg></span>
      <div><strong>Senior vakexpert</strong><small>Kent het vak, tekent af, draagt de verantwoordelijkheid</small></div>
    </div>
    <div class="op" aria-hidden="true">+</div>
    <div class="f-row">
      <span class="icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 9l-4 3 4 3"/><path d="M16 9l4 3-4 3"/><path d="M13 6l-2 12"/></svg></span>
      <div><strong>AI-engineer</strong><small>Bouwt de machine die het eerste werk doet</small></div>
    </div>
    <div class="op" aria-hidden="true">=</div>
    <div class="f-row result">
      <span class="icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg></span>
      <div><strong>Een afgewerkt resultaat</strong><small>Sneller, voorspelbaar geprijsd, met een naam eronder</small></div>
    </div>
  </div>
</section>

<section id="wat" class="band white">
  <div class="wrap section">
    <div class="head">
      <span class="eyebrow">01 · Wat is Service-as-Software?</span>
      <h2>Geen copiloot voor de vakman. De vakdienst zelf, opnieuw gebouwd rond AI.</h2>
      <p>Een Service-as-Software-bedrijf verkoopt het eindresultaat van een vakdienst: een nagekeken contract, een geprijsde offerte, een afgesloten boekhouding. AI doet het grootste deel van het werk, een erkende expert controleert en tekent af. De klant installeert niets en leert niets bij.</p>
    </div>
    <div class="table-box">
      <table class="compare">
        <thead>
          <tr><th scope="col"><span class="sr">Vraag</span></th><th scope="col">Traditioneel kantoor</th><th scope="col">Software / AI-tool</th><th scope="col" class="hl">Service-as-Software</th></tr>
        </thead>
        <tbody>
          <tr><th scope="row">Wie doet het werk?</th><td>Mensen, manueel</td><td>De klant zelf</td><td class="hl">AI, nagekeken door een expert</td></tr>
          <tr><th scope="row">Wie is verantwoordelijk?</th><td>Het kantoor</td><td>De klant</td><td class="hl">Het bedrijf, met een naam eronder</td></tr>
          <tr><th scope="row">Wat krijg je?</th><td>Afgewerkt werk, traag</td><td>Een draft om zelf af te werken</td><td class="hl">Afgewerkt werk, snel</td></tr>
          <tr><th scope="row">Prijs</th><td>Per uur</td><td>Licentie per gebruiker</td><td class="hl">Per resultaat of vaste prijs</td></tr>
        </tbody>
      </table>
    </div>
    <div class="grid g3">
      <div class="soft"><h3>Waarom nu?</h3><p>AI kan vandaag het eerste werk van veel kenniswerk betrouwbaar voorbereiden. Wie de dienst zelf levert, vangt die winst volledig op in plaats van ze aan kantoren te verkopen.</p></div>
      <div class="soft"><h3>Waarom België?</h3><p>Een versnipperde KMO-markt, eigen regelgeving en meertaligheid houden buitenlandse spelers op afstand. Lokale vakkennis is een echte voorsprong.</p></div>
      <div class="soft"><h3>Waarom jij?</h3><p>Goede vakmensen zijn schaars en klanten willen voorspelbare prijzen. Een senior expert met een AI-partner kan het volume van een heel kantoor aan.</p></div>
    </div>
  </div>
</section>

<section id="scorecard" class="wrap section">
  <div class="head">
    <span class="eyebrow">02 · De scorecard</span>
    <h2>Acht vragen om een idee te toetsen</h2>
    <p>Hoe meer vragen je met ja beantwoordt, hoe beter een dienst zich leent tot Service-as-Software.</p>
  </div>
  <div class="grid g4">${criteria}
  </div>
</section>

<section id="radar" class="band white">
  <div class="wrap section">
    <div class="head-row">
      <div class="head">
        <span class="eyebrow">03 · Idee-radar</span>
        <h2>Welke diensten komen in aanmerking?</h2>
        <p>Een eerste inschatting, open voor discussie. Een witte vlek betekent: in België doet nog niemand dit volgens het model.</p>
      </div>
      <ul class="legend" aria-label="Legende">
        <li><span class="dot sterk" aria-hidden="true"></span>Sterk</li>
        <li><span class="dot gemiddeld" aria-hidden="true"></span>Gemiddeld</li>
        <li><span class="dot zwak" aria-hidden="true"></span>Zwak</li>
      </ul>
    </div>
    <div class="table-box">
      <table class="radar">
        <thead>
          <tr><th scope="col">Dienst</th>${KOLOMMEN.map((k) => `<th scope="col" class="c">${k}</th>`).join('')}<th scope="col">Belgische speler</th></tr>
        </thead>
        <tbody>${radarRows}
        </tbody>
      </table>
    </div>
    <p class="note">Mis je een dienst, of klopt een score niet? <a href="${REPO}/blob/main/data/radar.json">Stel een wijziging voor</a>.</p>
  </div>
</section>

<section id="spelers" class="wrap section">
  <div class="head">
    <span class="eyebrow">04 · Belgische spelers</span>
    <h2>Zij doen het al</h2>
    <p>Belgische bedrijven die het eindresultaat leveren, met een expert die aftekent.</p>
  </div>
  <div class="grid g4">${spelerCards}
  </div>
</section>

<section id="start" class="band dark">
  <div class="wrap section">
    <div class="head">
      <span class="eyebrow light">05 · Get started</span>
      <h2>Van idee naar eerste klant</h2>
      <p>Het ideale startteam is een duo: een senior vakexpert die het werk door en door kent, en een AI-engineer die het eerste werk automatiseert.</p>
    </div>
    <ol class="grid g3 steps">${steps}
    </ol>
  </div>
</section>

<section id="bijdragen" class="wrap section split">
  <div class="head">
    <span class="eyebrow">06 · Open source</span>
    <h2>Van en voor de community</h2>
    <p>Geen commercieel motief. Alle inhoud is open: voeg een bedrijf toe, verbeter een score of deel een resource voor starters en bestaande spelers.</p>
  </div>
  <div class="links">
    <a class="big-link dark" href="${REPO}">Bijdragen via GitHub<span aria-hidden="true">→</span></a>
    <a class="big-link line" href="${REPO}/issues/new?title=Nieuw%20bedrijf%3A%20&amp;body=Naam%3A%0AWebsite%3A%0ADomein%3A%0AWie%20tekent%20af%3A%0APrijsmodel%3A">Een bedrijf aanmelden<span aria-hidden="true">→</span></a>
    <a class="big-link line" href="${REPO}/issues">Ideeën en feedback<span aria-hidden="true">→</span></a>
  </div>
</section>
</main>

<footer>
  <div class="wrap row small">
    <span>serviceasasoftware.be · een open, niet-commerciële community</span>
    <span>Een initiatief van <a href="https://www.linkedin.com/in/lukasvanorshoven/">Lukas Van Orshoven</a> · Inhoud vrij te hergebruiken (CC BY 4.0)</span>
  </div>
</footer>

</body>
</html>
`;

mkdirSync(new URL('./public/', import.meta.url), { recursive: true });
writeFileSync(new URL('./public/index.html', import.meta.url), html);
console.log('public/index.html gebouwd');
