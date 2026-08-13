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
  ['naruto_kakashi_dms', 'naruto', 'Kakashi Hatake (Dual Mangekyo Sharingan)', 94, 'https://vignette.wikia.nocookie.net/naruto/images/1/17/Kakashi_2MS.PNG/revision/latest/scale-to-width-down/2000?cb=20160825124208&path-prefix=pt-br'],
  ['naruto_guy_eight_gates', 'naruto', 'Might Guy (Eight Gates)', 94, 'https://image.pngaaa.com/484/3020484-middle.png'],
  ['onepiece_luffy_gear5', 'onepiece', 'Monkey D. Luffy (Gear 5)', 96, 'https://onepiece-day.onepiece-base.com/2023/img/fv/0612/luffy.png'],
  ['onepiece_luffy_gear4', 'onepiece', 'Monkey D. Luffy (Gear 4)', 89, 'https://www.vhv.rs/dpng/d/213-2136246_thumb-image-luffy-gear-4-png-transparent-png.png'],
  ['onepiece_luffy_gear2', 'onepiece', 'Monkey D. Luffy (Gear 2)', 76, 'https://www.pngmart.com/files/2/Monkey-D-Luffy-PNG-Clipart.png'],
  ['onepiece_zoro_king_of_hell', 'onepiece', 'Roronoa Zoro (King of Hell)', 91, 'https://images.steamusercontent.com/ugc/2062130598017072468/455A5C4F9A55008690AEB713C9A455AE1373A7D1/?ima=fit&imcolor=%23000000&imh=5000&impolicy=Letterbox&imw=5000&letterbox=false'],
  ['jjk_gojo_awakened', 'jjk', 'Satoru Gojo (Awakened)', 96, 'https://i.pinimg.com/originals/f8/ca/be/f8cabed5d84d6767e854ded30b2dc614.png'],
  ['jjk_sukuna_true_form', 'jjk', 'Ryomen Sukuna (True Form)', 98, 'https://pngdownload.io/wp-content/uploads/2024/02/Sukuna-Jujutsu-Kaisen-anime-King-of-Curses-transparent-PNG-image-jpg.webp'],
  ['bleach_ichigo_true_bankai', 'bleach', 'Ichigo Kurosaki (True Bankai)', 96, 'https://www.kindpng.com/picc/m/32-320760_ichigo-kurosaki-true-bankai-hd-png-download.png'],
  ['bleach_aizen_hogyoku', 'bleach', 'Sousuke Aizen (Hogyoku Final Form)', 95, 'https://www.vhv.rs/dpng/d/530-5309393_no-caption-provided-aizen-hogyoku-final-form-hd.png'],
  ['bleach_ichigo_vasto_lorde', 'bleach', 'Ichigo Kurosaki (Vasto Lorde)', 92, 'https://image.pngaaa.com/538/2458538-middle.png'],
  ['bleach_rukia_bankai', 'bleach', 'Rukia Kuchiki (Bankai: Hakka no Togame)', 87, 'https://s1.dmcdn.net/v/VBzwY1awwFVI_E3OQ/x1080'],
  ['hxh_gon_adult', 'hxh', 'Gon Freecss (Adult Form)', 95, 'https://www.pngfind.com/pngs/m/596-5969510_gon-freecss-adult-form-hd-png-download.png'],
  ['hxh_killua_godspeed', 'hxh', 'Killua Zoldyck (Godspeed)', 87, 'https://image.pngaaa.com/436/1607436-middle.png'],
  ['aot_eren_founding', 'aot', 'Eren Yeager (Founding Titan)', 95, 'https://zefirka.club/uploads/posts/2023-01/1673598651_3-zefirka-club-p-ataka-titanov-titan-osnovatel-3.png'],
  ['aot_eren_attack_titan', 'aot', 'Eren Yeager (Attack Titan)', 88, 'https://www.pngmart.com/files/22/Eren-Yeager-Titan-Form-PNG-Photo.png'],
];
const EXTRA_CHARACTERS = [
  ['naruto_obito', 'naruto', 20, 'Obito Uchiha', 88], ['naruto_hashirama', 'naruto', 20, 'Hashirama Senju', 90],
  ['onepiece_kaido', 'onepiece', 21, 'Kaido', 94], ['onepiece_yamato', 'onepiece', 21, 'Yamato', 82],
  ['jjk_kenjaku', 'jjk', 40748, 'Kenjaku', 90], ['jjk_kinji_hakari', 'jjk', 40748, 'Kinji Hakari', 84],
  ['bleach_yhwach', 'bleach', 269, 'Yhwach', 96], ['bleach_uryu', 'bleach', 269, 'Uryuu Ishida', 75],
  ['hxh_feitan', 'hxh', 11061, 'Feitan Portor', 78], ['hxh_silva', 'hxh', 11061, 'Silva Zoldyck', 82],
  ['aot_falco', 'aot', 16498, 'Falco Grice', 72], ['aot_porco', 'aot', 16498, 'Porco Galliard', 76],
];
const BULK_CHARACTERS = [
  ['naruto_pain', 'naruto', 1735, 'Pain', 89], ['naruto_nagato', 'naruto', 1735, 'Nagato', 91], ['naruto_tobirama', 'naruto', 1735, 'Tobirama Senju', 85], ['naruto_hiruzen', 'naruto', 1735, 'Hiruzen Sarutobi', 80], ['naruto_deidara', 'naruto', 1735, 'Deidara', 78], ['naruto_sasori', 'naruto', 1735, 'Sasori', 77], ['naruto_konan', 'naruto', 1735, 'Konan', 74], ['naruto_hidan', 'naruto', 1735, 'Hidan', 71], ['naruto_kakuzu', 'naruto', 1735, 'Kakuzu', 76], ['naruto_kabuto', 'naruto', 1735, 'Kabuto Yakushi', 78], ['naruto_danzo', 'naruto', 1735, 'Danzo Shimura', 75], ['naruto_killer_b', 'naruto', 1735, 'Killer B', 82], ['naruto_sakura', 'naruto', 1735, 'Sakura Haruno', 70], ['naruto_hinata', 'naruto', 1735, 'Hinata Hyuuga', 62], ['naruto_neji', 'naruto', 1735, 'Neji Hyuuga', 68], ['naruto_temari', 'naruto', 1735, 'Temari', 66], ['naruto_kankuro', 'naruto', 1735, 'Kankurou', 60], ['naruto_sai', 'naruto', 1735, 'Sai', 62], ['naruto_yamato', 'naruto', 1735, 'Yamato', 69], ['naruto_choji', 'naruto', 1735, 'Chouji Akimichi', 58],
  ['onepiece_big_mom', 'onepiece', 21, 'Charlotte Linlin', 92], ['onepiece_doflamingo', 'onepiece', 21, 'Donquixote Doflamingo', 87], ['onepiece_katakuri', 'onepiece', 21, 'Charlotte Katakuri', 88], ['onepiece_mihawk', 'onepiece', 21, 'Dracule Mihawk', 91], ['onepiece_crocodile', 'onepiece', 21, 'Crocodile', 78], ['onepiece_ace', 'onepiece', 21, 'Portgas D. Ace', 84], ['onepiece_whitebeard', 'onepiece', 21, 'Edward Newgate', 96], ['onepiece_roger', 'onepiece', 21, 'Gol D. Roger', 97], ['onepiece_oden', 'onepiece', 21, 'Kouzuki Oden', 86], ['onepiece_enel', 'onepiece', 21, 'Enel', 79], ['onepiece_buggy', 'onepiece', 21, 'Buggy', 48], ['onepiece_franky', 'onepiece', 21, 'Franky', 65], ['onepiece_brook', 'onepiece', 21, 'Brook', 63], ['onepiece_jinbe', 'onepiece', 21, 'Jinbe', 77], ['onepiece_marco', 'onepiece', 21, 'Marco', 82], ['onepiece_kidd', 'onepiece', 21, 'Eustass Kid', 81], ['onepiece_killer', 'onepiece', 21, 'Killer', 70], ['onepiece_smoker', 'onepiece', 21, 'Smoker', 67], ['onepiece_lucci', 'onepiece', 21, 'Rob Lucci', 82], ['onepiece_koby', 'onepiece', 21, 'Koby', 68],
  ['jjk_choso', 'jjk', 40748, 'Choso', 82], ['jjk_yuki', 'jjk', 40748, 'Yuki Tsukumo', 88], ['jjk_uraume', 'jjk', 40748, 'Uraume', 82], ['jjk_kashimo', 'jjk', 40748, 'Hajime Kashimo', 87], ['jjk_higuruma', 'jjk', 40748, 'Hiromi Higuruma', 81], ['jjk_mei_mei', 'jjk', 40748, 'Mei Mei', 72], ['jjk_atsuta', 'jjk', 40748, 'Atsuya Kusakabe', 70], ['jjk_inumaki', 'jjk', 40748, 'Toge Inumaki', 69], ['jjk_panda', 'jjk', 40748, 'Panda', 62], ['jjk_mai', 'jjk', 40748, 'Mai Zenin', 55], ['jjk_miwa', 'jjk', 40748, 'Kasumi Miwa', 42], ['jjk_utahime', 'jjk', 40748, 'Utahime Iori', 60], ['jjk_jogo', 'jjk', 40748, 'Jougo', 83], ['jjk_hanami', 'jjk', 40748, 'Hanami', 80], ['jjk_dagon', 'jjk', 40748, 'Dagon', 76], ['jjk_naobito', 'jjk', 40748, 'Naobito Zenin', 80], ['jjk_naoya', 'jjk', 40748, 'Naoya Zenin', 78], ['jjk_noritoshi', 'jjk', 40748, 'Noritoshi Kamo', 64], ['jjk_ijichi', 'jjk', 40748, 'Kiyotaka Ijichi', 35], ['jjk_mahito_transfigured', 'jjk', 40748, 'Mahito', 85],
  ['bleach_yamamoto', 'bleach', 269, 'Genryuusai Shigekuni Yamamoto', 95], ['bleach_shunsui', 'bleach', 269, 'Shunsui Kyouraku', 90], ['bleach_unohana', 'bleach', 269, 'Retsu Unohana', 89], ['bleach_mayuri', 'bleach', 269, 'Mayuri Kurotsuchi', 84], ['bleach_soifon', 'bleach', 269, 'Soi Fon', 76], ['bleach_komamura', 'bleach', 269, 'Sajin Komamura', 75], ['bleach_shinji', 'bleach', 269, 'Shinji Hirako', 78], ['bleach_gin', 'bleach', 269, 'Gin Ichimaru', 82], ['bleach_kaname', 'bleach', 269, 'Kaname Tousen', 74], ['bleach_starrk', 'bleach', 269, 'Coyote Starrk', 83], ['bleach_nnoitra', 'bleach', 269, 'Nnoitra Gilga', 72], ['bleach_nelliel', 'bleach', 269, 'Nelliel Tu Odelschwanck', 77], ['bleach_ikkaku', 'bleach', 269, 'Ikkaku Madarame', 65], ['bleach_izuru', 'bleach', 269, 'Izuru Kira', 60], ['bleach_yachiru', 'bleach', 269, 'Yachiru Kusajishi', 53], ['bleach_rose', 'bleach', 269, 'Rojuro Otoribashi', 68], ['bleach_kensei', 'bleach', 269, 'Kensei Muguruma', 71], ['bleach_hiyori', 'bleach', 269, 'Hiyori Sarugaki', 57], ['bleach_lisa', 'bleach', 269, 'Lisa Yadomaru', 60], ['bleach_urahara_bankai', 'bleach', 269, 'Kisuke Urahara', 91],
  ['hxh_zeno', 'hxh', 11061, 'Zeno Zoldyck', 84], ['hxh_alluka', 'hxh', 11061, 'Alluka Zoldyck', 68], ['hxh_nobunaga', 'hxh', 11061, 'Nobunaga Hazama', 72], ['hxh_machi', 'hxh', 11061, 'Machi Komacine', 70], ['hxh_phinks', 'hxh', 11061, 'Phinks Magcub', 75], ['hxh_shalnark', 'hxh', 11061, 'Shalnark', 69], ['hxh_shizuku', 'hxh', 11061, 'Shizuku Murasaki', 61], ['hxh_franklin', 'hxh', 11061, 'Franklin Bordeau', 68], ['hxh_knuckle', 'hxh', 11061, 'Knuckle Bine', 74], ['hxh_shoot', 'hxh', 11061, 'Shoot McMahon', 70], ['hxh_morel', 'hxh', 11061, 'Morel Mackernasey', 80], ['hxh_knov', 'hxh', 11061, 'Knov', 74], ['hxh_palm', 'hxh', 11061, 'Palm Siberia', 64], ['hxh_komugi', 'hxh', 11061, 'Komugi', 25], ['hxh_colt', 'hxh', 11061, 'Colt', 60], ['hxh_youpi', 'hxh', 11061, 'Menthuthuyoupi', 88], ['hxh_pouf', 'hxh', 11061, 'Shaiapouf', 84], ['hxh_gyro', 'hxh', 11061, 'Gyro', 67], ['hxh_hanzo', 'hxh', 11061, 'Hanzo', 60], ['hxh_wing', 'hxh', 11061, 'Wing', 58],
  ['aot_sasha', 'aot', 16498, 'Sasha Braus', 53], ['aot_connie', 'aot', 16498, 'Connie Springer', 51], ['aot_historia', 'aot', 16498, 'Historia Reiss', 59], ['aot_ymir', 'aot', 16498, 'Ymir', 66], ['aot_kenny', 'aot', 16498, 'Kenny Ackerman', 75], ['aot_floch', 'aot', 16498, 'Floch Forster', 58], ['aot_hannes', 'aot', 16498, 'Hannes', 52], ['aot_marco', 'aot', 16498, 'Marco Bott', 42], ['aot_moblit', 'aot', 16498, 'Moblit Berner', 48], ['aot_onyankopon', 'aot', 16498, 'Onyankopon', 50], ['aot_zofia', 'aot', 16498, 'Zofia', 30], ['aot_colt_grice', 'aot', 16498, 'Colt Grice', 57], ['aot_petra', 'aot', 16498, 'Petra Ral', 56], ['aot_oluo', 'aot', 16498, 'Oluo Bozad', 54], ['aot_mike', 'aot', 16498, 'Mike Zacharias', 70], ['aot_rico', 'aot', 16498, 'Rico Brzenska', 60], ['aot_annie_female_titan', 'aot', 16498, 'Annie Leonhart', 82], ['aot_reiner_armored', 'aot', 16498, 'Reiner Braun', 84], ['aot_armin_colossal', 'aot', 16498, 'Armin Arlert', 84], ['aot_gabi', 'aot', 16498, 'Gabi Braun', 60],
  ['naruto_kushina', 'naruto', 1735, 'Kushina Uzumaki', 69], ['naruto_shino', 'naruto', 1735, 'Shino Aburame', 61], ['naruto_ino', 'naruto', 1735, 'Ino Yamanaka', 57],
  ['onepiece_perona', 'onepiece', 21, 'Perona', 63], ['onepiece_carrot', 'onepiece', 21, 'Carrot', 66],
  ['jjk_kokichi', 'jjk', 40748, 'Kokichi Muta', 71], ['jjk_takuma', 'jjk', 40748, 'Takuma Ino', 63], ['jjk_junpei', 'jjk', 40748, 'Junpei Yoshino', 49], ['jjk_yoshinobu', 'jjk', 40748, 'Yoshinobu Gakuganji', 62],
  ['bleach_chad', 'bleach', 269, 'Yasutora Sado', 67], ['bleach_rangiku', 'bleach', 269, 'Rangiku Matsumoto', 66], ['bleach_zangetsu', 'bleach', 269, 'Zangetsu', 82], ['bleach_wonderweiss', 'bleach', 269, 'Wonderweiss Margela', 72], ['bleach_ryuuken', 'bleach', 269, 'Ryuuken Ishida', 66], ['bleach_kon', 'bleach', 269, 'Kon', 30],
  ['hxh_ging', 'hxh', 11061, 'Ging Freecss', 86], ['hxh_bonolenov', 'hxh', 11061, 'Bonolenov Ndongo', 69], ['hxh_kortopi', 'hxh', 11061, 'Kortopi', 56], ['hxh_pakunoda', 'hxh', 11061, 'Pakunoda', 67], ['hxh_uvogin', 'hxh', 11061, 'Uvogin', 80], ['hxh_kalluto', 'hxh', 11061, 'Kalluto Zoldyck', 55], ['hxh_menchi', 'hxh', 11061, 'Menchi', 42], ['hxh_leroute', 'hxh', 11061, 'Leroute', 38],
  ['aot_carla', 'aot', 16498, 'Carla Yeager', 25], ['aot_grisha', 'aot', 16498, 'Grisha Yeager', 71], ['aot_thomas', 'aot', 16498, 'Thomas Wagner', 36], ['aot_dot_pixis', 'aot', 16498, 'Dot Pixis', 65], ['aot_darius', 'aot', 16498, 'Darius Zackly', 57], ['aot_keith', 'aot', 16498, 'Keith Shadis', 62], ['aot_anka', 'aot', 16498, 'Anka Rheinberger', 42], ['aot_hitch', 'aot', 16498, 'Hitch Dreyse', 46], ['aot_nick', 'aot', 16498, 'Nick', 44], ['aot_karina', 'aot', 40028, 'Karina Braun', 43], ['aot_theo', 'aot', 40028, 'Theodor Magath', 70], ['aot_yelena', 'aot', 40028, 'Yelena', 66], ['aot_ramzi', 'aot', 40028, 'Ramzi', 26],
];
const asset = id => `/assets/catalog/cards/${id}.jpg`;
const characterCache = new Map();
const aniListMediaCache = new Map();
const CHARACTER_ALIASES = {
  'Sasha Braus': 'Sasha Blouse', 'Historia Reiss': 'Krista Lenz', 'Franklin Bordeau': 'Franklin Bordeaux',
  'Shalnark': 'Shalnark Ryuseih', 'Kankurou': 'Kankuro', 'Chouji Akimichi': 'Choji Akimichi',
};
// These transformations stay out until a dedicated form artwork is sourced.
// A regular character portrait must never be relabelled as a transformation.
const REQUIRE_DEDICATED_ART = new Set([
  'jjk_mahito_transfigured', 'bleach_urahara_bankai', 'aot_annie_female_titan',
  'aot_reiner_armored', 'aot_armin_colossal',
]);
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
  if (!characterCache.has(malId)) {
    const jikan = await fetch(`https://api.jikan.moe/v4/anime/${malId}/characters`).then(r => r.ok ? r.json() : null).catch(() => null);
    characterCache.set(malId, jikan?.data || []);
  }
  const people = characterCache.get(malId);
  const wanted = norm(CHARACTER_ALIASES[name] || name);
  const found = people.find(item => norm(item.character?.name) === wanted || norm(item.character?.name).includes(wanted) || wanted.includes(norm(item.character?.name)));
  if (found?.character?.images?.jpg?.image_url) return found.character.images.jpg.image_url;
  if (!aniListMediaCache.has(malId)) {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ query: 'query ($idMal: Int) { Media(idMal: $idMal, type: ANIME) { characters(perPage: 50, sort: [ROLE, RELEVANCE]) { edges { node { name { full } image { large } } } } } }', variables: { idMal: malId } }),
    }).catch(() => null);
    const body = response?.ok ? await response.json() : null;
    aniListMediaCache.set(malId, body?.data?.Media?.characters?.edges?.map(edge => edge.node) || []);
  }
  const aniListMatch = aniListMediaCache.get(malId).find(character => {
    const candidate = norm(character.name?.full);
    return candidate === wanted || candidate.includes(wanted) || wanted.includes(candidate);
  });
  if (aniListMatch?.image?.large) return aniListMatch.image.large;
  const response = await fetch('https://graphql.anilist.co', { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify({query:'query ($search: String) { Character(search: $search) { image { large } } }', variables:{search:name}}) }).catch(() => null);
  return response?.ok ? (await response.json())?.data?.Character?.image?.large : null;
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
  const downloadedVariants = [];
  for (const variant of fresh) {
    try { await saveImage(variant[0], variant[4]); downloadedVariants.push(variant); }
    catch { console.warn(`Variante ignorata: immagine non disponibile per ${variant[2]}`); }
  }
  const extras = [];
  for (const [id, anime, malId, name, score] of [...EXTRA_CHARACTERS, ...BULK_CHARACTERS]) {
    if (current.roster.some(card => card.id === id)) continue;
    if (REQUIRE_DEDICATED_ART.has(id)) continue;
    const source = await portrait(malId, name);
    if (!source) { console.warn(`Ritratto non trovato, ignorato: ${name}`); continue; }
    await saveImage(id, source); extras.push({ id, anime, name, score, image: asset(id) });
  }
  current.roster.push(...downloadedVariants.map(([id, anime, name, score]) => ({ id, anime, name, score, image: asset(id) })), ...extras);
  if (current.roster.some(card => card.score < 10 || card.score > 100)) throw new Error('Punteggio fuori scala');
  const data = `${JSON.stringify(current, null, 2)}\n`;
  await Promise.all(['data/catalog.json','data/default-catalog.json'].map(p => fs.writeFile(path.join(ROOT, p), data)));
  const appFile = path.join(ROOT, 'public', 'app.js'); const app = await fs.readFile(appFile, 'utf8');
  await fs.writeFile(appFile, app.replace(/const DEFAULT_ANIME = \{[\s\S]*?(?=const CATALOG_STORAGE_KEY=)/, fallback(current)));
  await replaceCatalog(current);
  console.log(`Varianti aggiunte: ${downloadedVariants.length}; personaggi aggiunti: ${extras.length}; totale carte: ${current.roster.length}`);
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
