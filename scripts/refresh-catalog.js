'use strict';

/*
 * Curated catalog refresh.
 *
 * Character art is resolved from Jikan's MyAnimeList character catalogue and
 * normalized to JPEG URLs. The title marks below are PNG assets for
 * the category filter. Scores use a single 70–98 draft scale: 90+ is a
 * franchise-defining / top-tier card, 80–89 a strong staple, and 70–79 a useful
 * specialist or support pick.
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const fs = require('fs/promises');
const path = require('path');
const { loadCatalog, replaceCatalog, getPersistenceInfo } = require('../catalog-store');

const ROOT = path.join(__dirname, '..');
const DATA_PATHS = [path.join(ROOT, 'data', 'catalog.json'), path.join(ROOT, 'data', 'default-catalog.json')];
const CATALOG_ASSET_ROOT = path.join(ROOT, 'assets', 'catalog');

const CATEGORIES = {
  naruto: { name: 'Naruto', malId: 20, accent: '#ff9138', logo: 'https://www.citypng.com/public/uploads/preview/naruto-shippuden-logo-transparent-background-701751694777597l432acg8r4.png?v=2026030511' },
  onepiece: { name: 'One Piece', malId: 21, accent: '#f1b44e', logo: 'https://toppng.com/uploads/preview/file-history-one-piece-logo-11563071942adcognuldv.png' },
  dragonball: { name: 'Dragon Ball', malId: 30694, accent: '#ff7a2f', logo: 'https://www.citypng.com/public/uploads/preview/dragon-ball-z-logo-download-png-7017516947067563zggkgegzs.png?v=2026032119' },
  jjk: { name: 'Jujutsu Kaisen', malId: 40748, accent: '#9a6cff', logo: 'https://www.pngmart.com/files/23/Jujutsu-Kaisen-Logo-PNG.png' },
  bleach: { name: 'Bleach', malId: 269, accent: '#e6e6e6', logo: 'https://toppng.com/public/uploads/preview/bleach-bleach-anime-logo-transparent-11563025094ksqaagis2s.png' },
  hxh: { name: 'Hunter × Hunter', malId: 11061, accent: '#58d98f', logo: 'https://pngset.com/images/hunter-x-hunter-sticker-logo-vinyl-hunter-hunter-text-alphabet-crowd-bazaar-transparent-png-900850.png' },
  aot: { name: 'Attack on Titan', malId: 16498, accent: '#c16c5c', logo: 'https://pngdownload.io/wp-content/uploads/2023/12/Attack-on-Titan-Logo-PNG-Emblem-from-Anime-Series-Transparent-jpg.webp' },
  demon: { name: 'Demon Slayer', malId: 38000, accent: '#ef3340', logo: 'https://www.kindpng.com/picc/m/30-300084_logo-demon-slayer-demon-slayer-kimetsu-no-yaiba.png' },
  fma: { name: 'Fullmetal Alchemist: Brotherhood', malId: 5114, accent: '#c43d3d', logo: 'https://image.pngaaa.com/411/1285411-middle.png' },
  deathnote: { name: 'Death Note', malId: 1535, accent: '#cfcfcf', logo: 'https://www.vhv.rs/dpng/d/527-5277783_death-note-hd-png-download.png' },
  codegeass: { name: 'Code Geass', malId: 1575, accent: '#d9465f', logo: 'https://image.pngaaa.com/116/1608116-middle.png' },
  frieren: { name: 'Frieren: Beyond Journey’s End', malId: 52991, accent: '#58b5a1', logo: 'https://hyakkaryoran.sontyo.jp/anime/soso-frieren/logo.PNG' },
};

const PICKS = {
  naruto: [['Naruto Uzumaki',96],['Sasuke Uchiha',95],['Kakashi Hatake',91],['Itachi Uchiha',94],['Madara Uchiha',98],['Minato Namikaze',93],['Gaara',86],['Shikamaru Nara',82],['Jiraiya',89],['Tsunade',85],['Orochimaru',90],['Rock Lee',78]],
  onepiece: [['Monkey D. Luffy',97],['Roronoa Zoro',94],['Sanji',91],['Trafalgar Law',92],['Shanks',98],['Marshall D. Teach',96],['Nami',79],['Nico Robin',84],['Usopp',74],['Tony Tony Chopper',76],['Boa Hancock',88],['Sabo',90]],
  dragonball: [['Goku',98],['Vegeta',97],['Gohan',94],['Piccolo',90],['Frieza',96],['Goku Black',95],['Jiren',96],['Trunks',88],['Krillin',77],['Android 18',84],['Broly',97],['Beerus',98]],
  jjk: [['Satoru Gojo',98],['Ryomen Sukuna',98],['Yuta Okkotsu',94],['Yuji Itadori',89],['Megumi Fushiguro',86],['Maki Zenin',88],['Toji Fushiguro',93],['Kento Nanami',84],['Mahito',90],['Suguru Geto',92],['Nobara Kugisaki',79],['Aoi Todo',83]],
  bleach: [['Ichigo Kurosaki',97],['Sousuke Aizen',98],['Rukia Kuchiki',84],['Byakuya Kuchiki',91],['Kenpachi Zaraki',94],['Toshiro Hitsugaya',88],['Kisuke Urahara',92],['Yoruichi Shihouin',89],['Renji Abarai',82],['Orihime Inoue',78],['Ulquiorra Cifer',91],['Grimmjow Jaegerjaquez',88]],
  hxh: [['Gon Freecss',89],['Killua Zoldyck',91],['Kurapika',90],['Leorio Paradinight',72],['Hisoka Morow',92],['Chrollo Lucilfer',94],['Meruem',98],['Isaac Netero',97],['Neferpitou',93],['Illumi Zoldyck',87],['Biscuit Krueger',85],['Kite',84]],
  aot: [['Eren Yeager',95],['Levi Ackerman',93],['Mikasa Ackerman',90],['Armin Arlert',85],['Erwin Smith',88],['Reiner Braun',89],['Zeke Yeager',91],['Annie Leonhart',87],['Hange Zoe',82],['Jean Kirstein',78],['Pieck Finger',80],['Bertholdt Hoover',86]],
  demon: [['Tanjiro Kamado',89],['Nezuko Kamado',86],['Zenitsu Agatsuma',82],['Inosuke Hashibira',83],['Giyu Tomioka',90],['Kyojuro Rengoku',92],['Tengen Uzui',88],['Muichiro Tokito',89],['Mitsuri Kanroji',85],['Akaza',94],['Doma',95],['Muzan Kibutsuji',97]],
  fma: [['Edward Elric',91],['Alphonse Elric',88],['Roy Mustang',94],['Riza Hawkeye',84],['Scar',90],['King Bradley',96],['Van Hohenheim',93],['Winry Rockbell',76],['Izumi Curtis',89],['Greed',88],['Ling Yao',85],['Alex Louis Armstrong',83]],
  deathnote: [['Light Yagami',94],['L Lawliet',95],['Ryuk',92],['Misa Amane',79],['Near',88],['Mello',84],['Soichiro Yagami',80],['Touta Matsuda',73],['Rem',89],['Teru Mikami',83],['Kiyomi Takada',77],['Watari',78]],
  codegeass: [['Lelouch Lamperouge',96],['C.C.',91],['Suzaku Kururugi',90],['Kallen Stadtfeld',89],['Nunnally Lamperouge',76],['Shirley Fenette',74],['Rolo Lamperouge',83],['Euphemia li Britannia',80],['Schneizel el Britannia',92],['Jeremiah Gottwald',86],['Lloyd Asplund',78],['Charles zi Britannia',94]],
  frieren: [['Frieren',94],['Fern',87],['Stark',85],['Himmel',89],['Heiter',81],['Eisen',88],['Flamme',95],['Serie',97],['Aura',90],['Denken',84],['Übel',86],['Kraft',82]],
};

const ALIASES = { Doma: 'Douma', 'C.C.': 'C.C', 'Sousuke Aizen': 'Sosuke Aizen', 'Yoruichi Shihouin': 'Yoruichi Shihouin', 'Charles zi Britannia': 'Charles zi Britannia', 'Euphemia li Britannia': 'Euphemia li Britannia', 'Touta Matsuda': 'Touta Matsuda', 'Aoi Todo': 'Aoi Todo' };
const norm = value => String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
const imageUrl = character => character?.images?.jpg?.image_url || character?.images?.webp?.image_url || null;
const asJpeg = url => url ? `https://images.weserv.nl/?url=${encodeURIComponent(url.replace(/^https?:\/\//i, ''))}&output=jpg&q=85` : null;
const asPng = url => url ? `https://images.weserv.nl/?url=${encodeURIComponent(url.replace(/^https?:\/\//i, ''))}&output=png` : null;

function findCharacter(characters, name) {
  const targets = [name, ALIASES[name]].filter(Boolean).map(norm);
  return characters.find(item => targets.includes(norm(item.character?.name)))
    || characters.find(item => targets.some(target => norm(item.character?.name).includes(target) || target.includes(norm(item.character?.name))))
    || characters.find(item => {
      const words = String(name).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().split(/[^a-z0-9]+/).filter(word => word.length >= 4);
      const candidate = norm(item.character?.name);
      return words.some(word => candidate.includes(word));
    });
}

async function searchAniListCharacter(name) {
  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({
      query: 'query ($search: String) { Character(search: $search) { name { full } image { large } } }',
      variables: { search: ALIASES[name] || name },
    }),
  });
  if (!response.ok) return null;
  const character = (await response.json())?.data?.Character;
  return character?.image?.large || null;
}

async function resolveImages() {
  const images = new Map();
  for (const [key, category] of Object.entries(CATEGORIES)) {
    let characters = null;
    let lastStatus = 'rete non disponibile';
    for (let attempt = 1; attempt <= 1; attempt += 1) {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${category.malId}/characters`);
        lastStatus = response.status;
        if (response.ok) { characters = (await response.json()).data || []; break; }
      } catch (error) { lastStatus = error.message; }
      await new Promise(resolve => setTimeout(resolve, attempt * 1_500));
    }
    // Some extremely large franchises intermittently time out on Jikan. Use
    // AniList only as a source-compatible fallback for those requests.
    if (!characters) {
      const fallback = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({
          query: 'query ($idMal: Int) { Media(idMal: $idMal, type: ANIME) { characters(perPage: 50, sort: [ROLE, RELEVANCE]) { edges { node { name { full } image { large } } } } } }',
          variables: { idMal: category.malId },
        }),
      });
      if (!fallback.ok) throw new Error(`Jikan (${lastStatus}) e AniList (${fallback.status}) non hanno risposto per ${category.name}.`);
      const payload = await fallback.json();
      const edges = payload?.data?.Media?.characters?.edges || [];
      characters = edges.map(edge => ({ character: { name: edge?.node?.name?.full, images: { jpg: { image_url: edge?.node?.image?.large || null } } } }));
    }
    for (const [name] of PICKS[key]) {
      const match = findCharacter(characters, name);
      const image = asJpeg(imageUrl(match?.character) || await searchAniListCharacter(name));
      if (!image) throw new Error(`Nessun ritratto non PNG trovato per ${name} (${category.name}).`);
      images.set(`${key}:${name}`, image);
    }
    // Jikan permits a small number of requests per second; avoid retries/rate limits.
    await new Promise(resolve => setTimeout(resolve, 700));
  }
  return images;
}

function catalogFrom(images) {
  let ordinal = 1;
  return {
    anime: CATEGORIES,
    roster: Object.entries(PICKS).flatMap(([anime, picks]) => picks.map(([name, score]) => ({
      id: `card_${String(ordinal++).padStart(3, '0')}`,
      anime, name, score: Math.max(10, Math.min(100, Math.round(10 + ((score - 72) * 90 / 26)))),
      image: images.get(`${anime}:${name}`),
    }))),
  };
}

async function fetchAsset(url, target, expectedType) {
  const response = await fetch(url, { headers: { accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8' } });
  const contentType = response.headers.get('content-type') || '';
  if (!response.ok || !contentType.startsWith('image/')) throw new Error(`download non riuscito per ${path.basename(target)} (${response.status || 'rete'})`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 512) throw new Error('file immagine non valido');
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, bytes);
  return expectedType;
}

async function materializeAssets(catalog) {
  const jobs = [];
  for (const [id, category] of Object.entries(catalog.anime)) {
    const target = path.join(CATALOG_ASSET_ROOT, 'logos', `${id}.png`);
    jobs.push(async () => {
      await fetchAsset(asPng(category.logo), target, 'png');
      category.logo = `/assets/catalog/logos/${id}.png`;
    });
  }
  for (const card of catalog.roster) {
    const target = path.join(CATALOG_ASSET_ROOT, 'cards', `${card.id}.jpg`);
    jobs.push(async () => {
      await fetchAsset(card.image, target, 'jpg');
      card.image = `/assets/catalog/cards/${card.id}.jpg`;
    });
  }
  const workers = Array.from({ length: 6 }, async () => {
    while (jobs.length) await jobs.shift()();
  });
  await Promise.all(workers);
  return catalog;
}

function clientFallback(catalog) {
  const anime = JSON.stringify(catalog.anime, null, 2).replace(/"([^"\n]+)":/g, '$1:');
  const cards = catalog.roster.map(card => `  { id:${JSON.stringify(card.id)}, anime:${JSON.stringify(card.anime)}, name:${JSON.stringify(card.name)}, score:${card.score}, image:${JSON.stringify(card.image)} },`).join('\n');
  return `const DEFAULT_ANIME = ${anime};\n\nconst DEFAULT_ROSTER = [\n${cards}\n];\n\n`;
}

async function main() {
  const images = await resolveImages();
  const catalog = await materializeAssets(catalogFrom(images));
  if (catalog.roster.length !== 144 || catalog.roster.some(card => !card.image.startsWith('/assets/catalog/cards/'))) throw new Error('Catalogo incompleto: ogni carta deve avere un ritratto locale.');
  const persistence = await getPersistenceInfo();
  if (persistence.mode !== 'neon') throw new Error('DATABASE_URL non configurato: Neon non è stato aggiornato.');

  // Preserve the exact current shared catalog before performing a destructive
  // replacement, so the previous selection is recoverable from the project.
  const previousCatalog = await loadCatalog();
  const backupDir = path.join(ROOT, 'data', 'catalog-backups');
  await fs.mkdir(backupDir, { recursive: true });
  const backupFile = path.join(backupDir, `catalog-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
  await fs.writeFile(backupFile, `${JSON.stringify(previousCatalog, null, 2)}\n`, 'utf8');

  const serialized = `${JSON.stringify(catalog, null, 2)}\n`;
  await Promise.all(DATA_PATHS.map(file => fs.writeFile(file, serialized, 'utf8')));

  const appPath = path.join(ROOT, 'app.js');
  const app = await fs.readFile(appPath, 'utf8');
  const updatedApp = app.replace(/const DEFAULT_ANIME = \{[\s\S]*?(?=const CATALOG_STORAGE_KEY=)/, clientFallback(catalog));
  if (updatedApp === app) throw new Error('Fallback client non aggiornato: delimitatore non trovato.');
  await fs.writeFile(appPath, updatedApp, 'utf8');

  await replaceCatalog(catalog);
  console.log(`Catalogo sincronizzato: ${Object.keys(catalog.anime).length} categorie, ${catalog.roster.length} carte, Neon DB. Backup: ${path.relative(ROOT, backupFile)}`);
}

main().catch(error => { console.error(`Sincronizzazione catalogo non riuscita: ${error.message}`); process.exitCode = 1; });
