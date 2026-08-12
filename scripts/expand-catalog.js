'use strict';

// Curated catalog expansion.  It keeps the existing local catalog and assets,
// adds six new universes, and replaces the Dragon Ball subset with distinct
// transformation cards.  Every added card is materialized as a local JPEG and
// every new category mark as a local PNG before Neon is updated.
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const fs = require('fs/promises');
const path = require('path');
const { spawn } = require('child_process');
const { loadCatalog, replaceCatalog, getPersistenceInfo } = require('../catalog-store');

const ROOT = path.join(__dirname, '..');
const CATALOG_PATHS = [path.join(ROOT, 'data', 'catalog.json'), path.join(ROOT, 'data', 'default-catalog.json')];
const APP_PATH = path.join(ROOT, 'public', 'app.js');
const ASSET_ROOT = path.join(ROOT, 'public', 'assets', 'catalog');
const SOURCE_ROOT = path.join(ASSET_ROOT, '.source');
const JPEG_CONVERTER = path.join(__dirname, 'convert-to-jpg.ps1');

const NEW_UNIVERSES = {
  myhero: { name: 'My Hero Academia', malId: 31964, accent: '#2b82db', logo: 'https://www.citypng.com/public/uploads/preview/hd-blue-my-hero-academia-logo-png-701751694779771cfh8vvi0bb.png?v=2026012700' },
  chainsawman: { name: 'Chainsaw Man', malId: 44511, accent: '#e5ba24', logo: 'https://latestlogo.com/wp-content/uploads/2024/05/chainsaw-man-logo.png' },
  jojo: { name: "JoJo's Bizarre Adventure", malId: 37991, accent: '#db4d9d', logo: 'https://image.pngaaa.com/987/2519987-middle.png' },
  vinland: { name: 'Vinland Saga', malId: 37521, accent: '#b74e48', logo: 'https://vectorseek.com/wp-content/uploads/2023/08/Vinland-Saga-Logo-Vector.svg-.png' },
  // Season II exposes the wider recurring cast used by this mixed-series roster.
  mobpsycho: { name: 'Mob Psycho 100', malId: 37510, accent: '#d5549d', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mob_Psycho_100_logo.svg/1280px-Mob_Psycho_100_logo.svg.png' },
  blackclover: { name: 'Black Clover', malId: 34572, accent: '#65b85c', logo: 'https://www.pngmart.com/files/23/Black-Clover-Logo-PNG-File.png' },
};

// Scores describe draft value, not a literal cross-franchise power ranking.
// 90+ is exceptional, 70–89 strong, 50–69 situational, under 50 bargain tier.
const NEW_PICKS = {
  myhero: [['Izuku Midoriya',86],['Katsuki Bakugou',82],['Shoto Todoroki',80],['All Might',90],['All For One',92],['Tomura Shigaraki',89],['Endeavor',84],['Hawks',76],['Mirio Togata',78],['Shota Aizawa',73],['Fumikage Tokoyami',72],['Ochaco Uraraka',58]],
  chainsawman: [['Denji',82],['Makima',91],['Power',66],['Aki Hayakawa',72],['Kishibe',77],['Quanxi',85],['Reze',79],['Asa Mitaka',60],['Yoru',86],['Katana Man',70],['Angel Devil',70],['Kobeni Higashiyama',42]],
  jojo: [['Giorno Giovanna',92],['Bruno Bucciarati',78],['Guido Mista',64],['Narancia Ghirga',61],['Leone Abbacchio',67],['Trish Una',66],['Pannacotta Fugo',78],['Diavolo',88],['Jean Pierre Polnareff',73],['Risotto Nero',82],['Ghiaccio',71],['Prosciutto',69]],
  vinland: [['Thorfinn',81],['Askeladd',84],['Thorkell',88],['Canute',72],['Bjorn',73],['Snake',76],['Hild',74],['Einar',45],['Leif Erikson',46],['Garm',80],['Floki',63],['Thors',90]],
  mobpsycho: [['Shigeo Kageyama',91],['Arataka Reigen',62],['Teruki Hanazawa',73],['Ritsu Kageyama',69],['Dimple',70],['Toichiro Suzuki',91],['Katsuya Serizawa',82],['Kaito Shiratori',78],['Koyama',74],['Musashi Gouda',70],['Tsubomi',35],['Sho Suzuki',75]],
  blackclover: [['Asta',85],['Yuno',83],['Yami Sukehiro',91],['Noelle Silva',78],['Mereoleona Vermillion',90],['Julius Novachrono',93],['Licht',88],['Patry',84],['Nacht Faust',82],['Luck Voltia',75],['Magna Swing',70],['Finral Roulacase',60]],
};

// Each listed form has an independently curated visual source: there are no
// duplicated Goku portraits used as stand-ins for transformations.
const DRAGON_BALL = [
  ['card_025', 'Goku (Base Form)', 52],
  ['db_goku_ssj', 'Goku (Super Saiyan)', 66, 'https://s1.zerochan.net/Son.Goku.%28DRAGON.BALL%29.600.4238892.jpg'],
  ['db_goku_ssj2', 'Goku (Super Saiyan 2)', 74, 'https://wibu.com.vn/wp-content/uploads/2024/04/Son-Goku-Super-Saiyan-2.png'],
  ['db_goku_ssj3', 'Goku (Super Saiyan 3)', 82, 'https://dbg-squadra.bn-ent.net/assets/images/hero/0023/image_character.webp'],
  ['db_goku_ssj4', 'Goku (Super Saiyan 4)', 86, 'https://s1.zerochan.net/Son.Goku.%28DRAGON.BALL%29.600.4293326.jpg'],
  ['db_goku_god', 'Goku (Super Saiyan God)', 84, 'https://dragonball-legends.com/assets/characters/0286_gokussg_286_texture/0286_GokuSSG_286_Effect6.png'],
  ['db_goku_blue', 'Goku (Super Saiyan Blue)', 90, 'https://www.fightersgeneration.com/nf2/char/dbfz/goku-ssb/dbfz-goku-ssb-artwork.jpg'],
  ['db_goku_ui_sign', 'Goku (Ultra Instinct Sign)', 93, 'https://cdn.dokkan.fyi/assets/en/character/card/1032900/card_1032900_effect.png'],
  ['db_goku_mui', 'Goku (Mastered Ultra Instinct)', 97, 'https://pngset.com/images/scr-cards-list-posted-strategy-dragon-ball-super-card-game-goku-ultra-instinct-tcg-art-graphics-person-human-transparent-png-2777873.png'],
  ['card_026', 'Vegeta', 68],
  ['card_027', 'Gohan', 79],
  ['card_028', 'Piccolo', 74],
  ['card_029', 'Frieza', 88],
  ['card_030', 'Goku Black (Super Saiyan Rosé)', 90, 'https://cdn.dokkan.fyi/assets/en/character/card/4028290/card_4028290_character.png'],
  ['card_031', 'Jiren', 91],
  ['card_032', 'Future Trunks', 78],
  ['card_033', 'Krillin', 42],
  ['card_034', 'Android 18', 62],
  ['card_035', 'Broly (Full Power Super Saiyan)', 94, 'https://comicvine.gamespot.com/a/uploads/scale_medium/11123/111238813/7207000-new_broly_3.webp'],
  ['card_036', 'Beerus', 96],
  ['db_cell', 'Cell', 82, 'https://origin.giantbomb.com/a/uploads/scale_super/15/155548/2415341-cellperfectv4.png'],
  ['db_majin_buu', 'Majin Buu', 73, 'https://static.zerochan.net/Majin.Buu.full.4239516.png'],
  ['db_gogeta', 'Gogeta', 89, 'https://cdn.dokkan.fyi/assets/en/character/card/1027960/card_1027960_character.png'],
  ['db_hit', 'Hit', 83, 'https://vignette.wikia.nocookie.net/vsbattles/images/1/10/Hit_Legends.png/revision/latest?cb=20190824145722'],
];

const LOOKUPS = {
  'Goku (Base Form)': 'Goku', 'Goku (Super Saiyan)': 'Goku', 'Goku (Super Saiyan 2)': 'Goku', 'Goku (Super Saiyan 3)': 'Goku',
  'Goku (Super Saiyan 4)': 'Goku', 'Goku (Super Saiyan God)': 'Goku', 'Goku (Super Saiyan Blue)': 'Goku',
  'Goku (Ultra Instinct Sign)': 'Goku', 'Goku (Mastered Ultra Instinct)': 'Goku', 'Goku Black (Super Saiyan Rosé)': 'Goku Black',
  'Broly (Full Power Super Saiyan)': 'Broly', 'Future Trunks': 'Trunks', 'Dimple': 'Ekubo',
  'Toichiro Suzuki': 'Toichirou Suzuki', 'Koyama': 'Megumu Koyama', 'Sho Suzuki': 'Shou Suzuki',
  'Jean Pierre Polnareff': 'Polnareff, Jean Pierre', 'Pannacotta Fugo': 'Fugo, Pannacotta',
  'Finral Roulacase': 'Finral Roulacase',
};

// Used only where the public character indexes do not expose a usable portrait.
const CURATED_CHARACTER_IMAGES = {
  'Shigeo Kageyama': 'https://a.storyblok.com/f/178900/1300x2010/dbbe04f50f/26622baa18fa2f4a5118328ea69acb5c1664211531_main.png/m/filters%3Aquality%2895%29format%28webp%29',
  'Katsuya Serizawa': 'https://mobpsycho100.com/wp-content/themes/mobpsycho3rd/assets/images/common/character/img_serizawa.png',
};

const normalize = value => String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
const safeName = value => String(value).replace(/[^a-z0-9_-]+/gi, '_').toLowerCase();
const assetUrl = (kind, id, ext) => `/assets/catalog/${kind}/${id}.${ext}`;
const asImage = (url, output) => `https://images.weserv.nl/?url=${encodeURIComponent(String(url).replace(/^https?:\/\//i, ''))}&output=${output}&q=88`;

function convertToJpeg(input, output) {
  return new Promise((resolve, reject) => {
    const child = spawn('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', JPEG_CONVERTER, '-InputPath', input, '-OutputPath', output], { windowsHide: true });
    let error = '';
    child.stderr.on('data', chunk => { error += chunk; });
    child.on('error', reject);
    child.on('close', code => code === 0 ? resolve() : reject(new Error(error || `Conversione JPEG fallita (${code})`)));
  });
}

async function imageResponse(url, output) {
  const candidates = [...new Set([asImage(url, output), url])];
  let lastError = 'rete non disponibile';
  for (const candidate of candidates) {
    try {
      const response = await fetch(candidate, { headers: { accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8' } });
      const type = response.headers.get('content-type') || '';
      if (response.ok && type.startsWith('image/')) return { response, type };
      lastError = `HTTP ${response.status}`;
    } catch (error) { lastError = error.message; }
  }
  throw new Error(`Immagine non disponibile: ${lastError}`);
}

async function saveCardImage(source, id) {
  const target = path.join(ASSET_ROOT, 'cards', `${id}.jpg`);
  // Existing Dragon Ball portraits retain their already curated local asset;
  // only new forms are downloaded from their dedicated transformation source.
  if (!source) {
    await fs.access(target);
    return assetUrl('cards', id, 'jpg');
  }
  const { response, type } = await imageResponse(source, 'jpg');
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 1024) throw new Error(`${id}: file immagine non valido`);
  await fs.mkdir(path.dirname(target), { recursive: true });
  if (/jpe?g/i.test(type)) await fs.writeFile(target, bytes);
  else {
    const sourcePath = path.join(SOURCE_ROOT, `${safeName(id)}.img`);
    await fs.mkdir(SOURCE_ROOT, { recursive: true });
    await fs.writeFile(sourcePath, bytes);
    await convertToJpeg(sourcePath, target);
    await fs.unlink(sourcePath).catch(() => {});
  }
  return assetUrl('cards', id, 'jpg');
}

const delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

async function fetchWithRetry(url, options) {
  let lastResponse;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      const response = await fetch(url, options);
      if (response.ok || ![429, 500, 502, 503, 504].includes(response.status)) return response;
      lastResponse = response;
      const retryAfter = Number(response.headers.get('retry-after'));
      // AniList deliberately throttles clients in minute windows. Respect that
      // window instead of hammering it and risking a partial catalog.
      const wait = Number.isFinite(retryAfter) && retryAfter > 0
        ? retryAfter * 1000
        : url.includes('anilist.co') && response.status === 429 ? 60000 : 1500 * (attempt + 1);
      if (attempt < 4) await delay(wait);
      continue;
    } catch (error) {
      if (attempt === 4) throw error;
    }
    await delay(1500 * (attempt + 1));
  }
  return lastResponse;
}

async function saveLogo(source, id) {
  const target = path.join(ASSET_ROOT, 'logos', `${id}.png`);
  // Logos must remain real PNG files; avoid content negotiation returning WebP.
  const response = await fetch(source, { headers: { accept: 'image/png' } });
  const type = response.headers.get('content-type') || '';
  if (!response.ok) throw new Error(`${id}: logo non disponibile (HTTP ${response.status})`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 512 || !/png/i.test(type)) throw new Error(`${id}: logo PNG non disponibile`);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, bytes);
  return assetUrl('logos', id, 'png');
}

async function mediaCharacters(malId) {
  const response = await fetchWithRetry(`https://api.jikan.moe/v4/anime/${malId}/characters`);
  if (response.ok) return (await response.json()).data || [];
  const fallback = await fetchWithRetry('https://graphql.anilist.co', {
    method: 'POST', headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({ query: 'query ($idMal: Int) { Media(idMal: $idMal, type: ANIME) { characters(perPage: 50, sort: [ROLE, RELEVANCE]) { edges { node { name { full } image { large } } } } } }', variables: { idMal: malId } }),
  });
  if (!fallback.ok) throw new Error(`Personaggi non disponibili per MAL ${malId}`);
  const edges = (await fallback.json())?.data?.Media?.characters?.edges || [];
  return edges.map(edge => ({ character: { name: edge.node?.name?.full, images: { jpg: { image_url: edge.node?.image?.large } } } }));
}

function pickCharacterImage(characters, requested) {
  const query = LOOKUPS[requested] || requested;
  const target = normalize(query);
  const exact = characters.find(item => normalize(item.character?.name) === target);
  const partial = characters.find(item => {
    const candidate = normalize(item.character?.name);
    return candidate.includes(target) || target.includes(candidate);
  });
  const match = exact || partial;
  return match?.character?.images?.jpg?.image_url || match?.character?.images?.webp?.image_url || null;
}

async function searchAniList(name) {
  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST', headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({ query: 'query ($search: String) { Character(search: $search) { image { large } } }', variables: { search: LOOKUPS[name] || name } }),
  });
  if (!response.ok) return null;
  return (await response.json())?.data?.Character?.image?.large || null;
}

async function resolveCategoryCards(category, picks) {
  let characters;
  const cards = [];
  for (const [id, name, score, override] of picks) {
    const curated = override || CURATED_CHARACTER_IMAGES[name];
    if (curated) {
      cards.push({ id, anime: category.id, name, score, source: curated });
      continue;
    }
    // A source omitted from a Dragon Ball entry means “keep the existing local
    // portrait”. It avoids needless requests and preserves those established images.
    if (category.id === 'dragonball') {
      cards.push({ id, anime: category.id, name, score });
      continue;
    }
    characters ||= await mediaCharacters(category.malId);
    const source = pickCharacterImage(characters, name) || await searchAniList(name);
    if (!source) {
      const available = characters.slice(0, 30).map(item => item.character?.name).filter(Boolean).join(', ');
      throw new Error(`Nessun ritratto trovato per ${name}. Disponibili: ${available || 'nessuno'}`);
    }
    cards.push({ id, anime: category.id, name, score, source });
  }
  return cards;
}

function clientFallback(catalog) {
  const anime = JSON.stringify(catalog.anime, null, 2).replace(/"([^"\n]+)":/g, '$1:');
  const cards = catalog.roster.map(card => `  { id:${JSON.stringify(card.id)}, anime:${JSON.stringify(card.anime)}, name:${JSON.stringify(card.name)}, score:${card.score}, image:${JSON.stringify(card.image)} },`).join('\n');
  return `const DEFAULT_ANIME = ${anime};\n\nconst DEFAULT_ROSTER = [\n${cards}\n];\n\n`;
}

async function runLimited(items, limit, task) {
  let next = 0;
  await Promise.all(Array.from({ length: limit }, async () => {
    while (next < items.length) await task(items[next++]);
  }));
}

async function main() {
  const persistence = await getPersistenceInfo();
  if (persistence.mode !== 'neon') throw new Error('DATABASE_URL non configurato: Neon non è disponibile.');
  const current = JSON.parse(await fs.readFile(CATALOG_PATHS[0], 'utf8'));
  const existingAnime = { ...current.anime };
  const existingRoster = current.roster.filter(card => card.anime !== 'dragonball');

  const categories = Object.fromEntries(Object.entries(NEW_UNIVERSES).map(([id, value]) => [id, { ...value, id }]));
  const resolved = [];
  const dragonCategory = { ...existingAnime.dragonball, id: 'dragonball' };
  resolved.push(...await resolveCategoryCards(dragonCategory, DRAGON_BALL));
  for (const [id, category] of Object.entries(categories)) {
    resolved.push(...await resolveCategoryCards(category, NEW_PICKS[id].map(([name, score], index) => [`${id}_${String(index + 1).padStart(2, '0')}`, name, score])));
  }

  const newLogos = await Promise.all(Object.entries(categories).map(async ([id, category]) => [id, await saveLogo(category.logo, id)]));
  for (const [id, logo] of newLogos) categories[id].logo = logo;

  await runLimited(resolved, 5, async card => { card.image = await saveCardImage(card.source, card.id); delete card.source; });
  const catalog = {
    anime: { ...existingAnime, ...Object.fromEntries(Object.entries(categories).map(([id, category]) => [id, { name: category.name, malId: category.malId, accent: category.accent, logo: category.logo }])) },
    roster: [...existingRoster, ...resolved],
  };
  if (catalog.roster.length !== 228) throw new Error(`Catalogo inatteso: ${catalog.roster.length} carte invece di 228.`);
  if (catalog.roster.some(card => card.score < 10 || card.score > 100 || !card.image.startsWith('/assets/catalog/cards/'))) throw new Error('Catalogo non valido o con immagini mancanti.');

  const previous = await loadCatalog();
  const backupDir = path.join(ROOT, 'data', 'catalog-backups');
  await fs.mkdir(backupDir, { recursive: true });
  const backup = path.join(backupDir, `catalog-before-expansion-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
  await fs.writeFile(backup, `${JSON.stringify(previous, null, 2)}\n`, 'utf8');
  const payload = `${JSON.stringify(catalog, null, 2)}\n`;
  await Promise.all(CATALOG_PATHS.map(file => fs.writeFile(file, payload, 'utf8')));
  const app = await fs.readFile(APP_PATH, 'utf8');
  const updated = app.replace(/const DEFAULT_ANIME = \{[\s\S]*?(?=const CATALOG_STORAGE_KEY=)/, clientFallback(catalog));
  if (updated === app) throw new Error('Fallback frontend non aggiornato.');
  await fs.writeFile(APP_PATH, updated, 'utf8');
  await replaceCatalog(catalog);
  console.log(`Espansione completata: ${Object.keys(catalog.anime).length} universi, ${catalog.roster.length} carte. Backup: ${path.relative(ROOT, backup)}`);
}

main().catch(error => { console.error(`Espansione catalogo non riuscita: ${error.message}`); process.exitCode = 1; });
