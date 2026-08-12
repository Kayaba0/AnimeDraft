'use strict';

// Curated first-wave variants. Every entry has its own visual source rather
// than reusing the base character portrait.
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const fs = require('fs/promises');
const path = require('path');
const { replaceCatalog, getPersistenceInfo } = require('../catalog-store');
const ROOT = path.join(__dirname, '..');
const VARIANTS = [
  ['naruto_baryon', 'naruto', 'Naruto Uzumaki (Baryon Mode)', 98, 'https://pngfre.com/wp-content/uploads/1000069773-1321x1536.png'],
  ['naruto_madara_six_paths', 'naruto', 'Madara Uchiha (Ten-Tails Jinchuriki)', 96, 'https://image.pngaaa.com/309/218309-middle.png'],
  ['naruto_kurama_link', 'naruto', 'Naruto Uzumaki (Kurama Link Mode)', 91, 'https://www.pngitem.com/pimgs/m/221-2210939_naruto-uzumaki-kurama-link-mode-hd-png-download.png'],
  ['onepiece_luffy_gear5', 'onepiece', 'Monkey D. Luffy (Gear 5)', 96, 'https://onepiece-day.onepiece-base.com/2023/img/fv/0612/luffy.png'],
  ['onepiece_luffy_gear4', 'onepiece', 'Monkey D. Luffy (Gear 4)', 89, 'https://www.vhv.rs/dpng/d/213-2136246_thumb-image-luffy-gear-4-png-transparent-png.png'],
  ['jjk_gojo_awakened', 'jjk', 'Satoru Gojo (Awakened)', 96, 'https://i.pinimg.com/originals/f8/ca/be/f8cabed5d84d6767e854ded30b2dc614.png'],
  ['bleach_ichigo_true_bankai', 'bleach', 'Ichigo Kurosaki (True Bankai)', 96, 'https://www.kindpng.com/picc/m/32-320760_ichigo-kurosaki-true-bankai-hd-png-download.png'],
  ['bleach_aizen_hogyoku', 'bleach', 'Sousuke Aizen (Hogyoku Final Form)', 95, 'https://www.vhv.rs/dpng/d/530-5309393_no-caption-provided-aizen-hogyoku-final-form-hd.png'],
  ['hxh_gon_adult', 'hxh', 'Gon Freecss (Adult Form)', 95, 'https://www.pngfind.com/pngs/m/596-5969510_gon-freecss-adult-form-hd-png-download.png'],
  ['aot_eren_founding', 'aot', 'Eren Yeager (Founding Titan)', 95, 'https://zefirka.club/uploads/posts/2023-01/1673598651_3-zefirka-club-p-ataka-titanov-titan-osnovatel-3.png'],
];
const EXTRA_CHARACTERS = [
  ['naruto_obito', 'naruto', 20, 'Obito Uchiha', 88], ['naruto_hashirama', 'naruto', 20, 'Hashirama Senju', 90],
  ['onepiece_kaido', 'onepiece', 21, 'Kaido', 94], ['onepiece_yamato', 'onepiece', 21, 'Yamato', 82],
  ['jjk_kenjaku', 'jjk', 40748, 'Kenjaku', 90], ['jjk_kinji_hakari', 'jjk', 40748, 'Kinji Hakari', 84],
  ['bleach_yhwach', 'bleach', 269, 'Yhwach', 96], ['bleach_uryu', 'bleach', 269, 'Uryuu Ishida', 75],
  ['hxh_feitan', 'hxh', 11061, 'Feitan Portor', 78], ['hxh_silva', 'hxh', 11061, 'Silva Zoldyck', 82],
  ['aot_falco', 'aot', 16498, 'Falco Grice', 72], ['aot_porco', 'aot', 16498, 'Porco Galliard', 76],
];
const asset = id => `/assets/catalog/cards/${id}.jpg`;
async function saveImage(id, source) {
  const url = `https://images.weserv.nl/?url=${encodeURIComponent(source.replace(/^https?:\/\//, ''))}&output=jpg&q=88`;
  let response = await fetch(url);
  let bytes = Buffer.from(await response.arrayBuffer());
  if (!response.ok || bytes.length < 1024) { response = await fetch(source); bytes = Buffer.from(await response.arrayBuffer()); }
  if (!response.ok || bytes.length < 1024) throw new Error(`Immagine non disponibile: ${id}`);
  await fs.writeFile(path.join(ROOT, 'public', 'assets', 'catalog', 'cards', `${id}.jpg`), bytes);
}
const norm = value => String(value).toLowerCase().replace(/[^a-z0-9]/g, '');
async function portrait(malId, name) {
  const jikan = await fetch(`https://api.jikan.moe/v4/anime/${malId}/characters`).then(r => r.ok ? r.json() : null).catch(() => null);
  const people = jikan?.data || [];
  const wanted = norm(name);
  const found = people.find(item => norm(item.character?.name) === wanted || norm(item.character?.name).includes(wanted) || wanted.includes(norm(item.character?.name)));
  if (found?.character?.images?.jpg?.image_url) return found.character.images.jpg.image_url;
  const response = await fetch('https://graphql.anilist.co', { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify({query:'query ($search: String) { Character(search: $search) { image { large } } }', variables:{search:name}}) });
  return response.ok ? (await response.json())?.data?.Character?.image?.large : null;
}
function fallback(catalog) {
  const anime = JSON.stringify(catalog.anime, null, 2).replace(/"([^"\n]+)":/g, '$1:');
  const roster = catalog.roster.map(c => `  { id:${JSON.stringify(c.id)}, anime:${JSON.stringify(c.anime)}, name:${JSON.stringify(c.name)}, score:${c.score}, image:${JSON.stringify(c.image)} },`).join('\n');
  return `const DEFAULT_ANIME = ${anime};\n\nconst DEFAULT_ROSTER = [\n${roster}\n];\n\n`;
}
async function main() {
  if ((await getPersistenceInfo()).mode !== 'neon') throw new Error('Neon non configurato');
  const file = path.join(ROOT, 'data', 'catalog.json');
  const current = JSON.parse(await fs.readFile(file, 'utf8'));
  const fresh = VARIANTS.filter(([id]) => !current.roster.some(card => card.id === id));
  await Promise.all(fresh.map(([id,,, , source]) => saveImage(id, source)));
  const extras = [];
  for (const [id, anime, malId, name, score] of EXTRA_CHARACTERS) {
    if (current.roster.some(card => card.id === id)) continue;
    const source = await portrait(malId, name);
    if (!source) { console.warn(`Ritratto non trovato, ignorato: ${name}`); continue; }
    await saveImage(id, source); extras.push({ id, anime, name, score, image: asset(id) });
  }
  current.roster.push(...fresh.map(([id, anime, name, score]) => ({ id, anime, name, score, image: asset(id) })), ...extras);
  if (current.roster.some(card => card.score < 10 || card.score > 100)) throw new Error('Punteggio fuori scala');
  const data = `${JSON.stringify(current, null, 2)}\n`;
  await Promise.all(['data/catalog.json','data/default-catalog.json'].map(p => fs.writeFile(path.join(ROOT, p), data)));
  const appFile = path.join(ROOT, 'public', 'app.js'); const app = await fs.readFile(appFile, 'utf8');
  await fs.writeFile(appFile, app.replace(/const DEFAULT_ANIME = \{[\s\S]*?(?=const CATALOG_STORAGE_KEY=)/, fallback(current)));
  await replaceCatalog(current);
  console.log(`Varianti aggiunte: ${fresh.length}; personaggi aggiunti: ${extras.length}; totale carte: ${current.roster.length}`);
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
