'use strict';

// Turns the already-curated remote card portraits into project assets. This
// intentionally does not redownload or reseed character metadata: it uses the
// exact 144 cards currently approved in data/catalog.json.
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const fs = require('fs/promises');
const path = require('path');
const { spawn } = require('child_process');
const { loadCatalog, replaceCatalog, getPersistenceInfo } = require('../catalog-store');

const ROOT = path.join(__dirname, '..');
const CATALOG_PATH = path.join(ROOT, 'data', 'catalog.json');
const DEFAULT_PATH = path.join(ROOT, 'data', 'default-catalog.json');
const CARD_DIR = path.join(ROOT, 'public', 'assets', 'catalog', 'cards');
const SOURCE_DIR = path.join(CARD_DIR, '.source');
const JPEG_CONVERTER = path.join(__dirname, 'convert-to-jpg.ps1');

const powerScore = score => Math.max(10, Math.min(100, Math.round(10 + ((Number(score) - 72) * 90 / 26))));

function convertToJpeg(input, output) {
  return new Promise((resolve, reject) => {
    const process = spawn('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', JPEG_CONVERTER, '-InputPath', input, '-OutputPath', output], { windowsHide: true });
    let error = '';
    process.stderr.on('data', chunk => { error += chunk; });
    process.on('error', reject);
    process.on('close', code => code === 0 ? resolve() : reject(new Error(error.trim() || `conversione JPG terminata con codice ${code}`)));
  });
}

function directSource(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === 'images.weserv.nl') {
      const embedded = parsed.searchParams.get('url');
      if (embedded) return `https://${embedded}`;
    }
  } catch {}
  return url;
}

async function downloadCard(card) {
  const sources = [...new Set([directSource(card.image), card.image])];
  let response = null;
  let type = '';
  let failure = 'rete non disponibile';
  for (const source of sources) {
    try {
      const candidate = await fetch(source, { headers: { accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8' } });
      const candidateType = candidate.headers.get('content-type') || '';
      if (candidate.ok && /^image\/(jpeg|jpg|webp|png)/i.test(candidateType)) { response = candidate; type = candidateType; break; }
      failure = `${candidate.status} ${candidateType || 'formato non valido'}`;
    } catch (error) { failure = error.message; }
  }
  if (!response) throw new Error(`${card.name}: ${failure}`);
  const data = Buffer.from(await response.arrayBuffer());
  if (data.length < 512) throw new Error(`${card.name}: file troppo piccolo`);
  const destination = path.join(CARD_DIR, `${card.id}.jpg`);
  if (/png/i.test(type)) {
    const sourcePath = path.join(SOURCE_DIR, `${card.id}.png`);
    await fs.mkdir(SOURCE_DIR, { recursive: true });
    await fs.writeFile(sourcePath, data);
    await convertToJpeg(sourcePath, destination);
    await fs.unlink(sourcePath);
  } else {
    await fs.writeFile(destination, data);
  }
  return { ...card, image: `/assets/catalog/cards/${card.id}.jpg`, score: powerScore(card.score) };
}

async function runLimited(items, limit, work) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: limit }, async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await work(items[index]);
    }
  }));
  return results;
}

function clientFallback(catalog) {
  const anime = JSON.stringify(catalog.anime, null, 2).replace(/"([^"\n]+)":/g, '$1:');
  const cards = catalog.roster.map(card => `  { id:${JSON.stringify(card.id)}, anime:${JSON.stringify(card.anime)}, name:${JSON.stringify(card.name)}, score:${card.score}, image:${JSON.stringify(card.image)} },`).join('\n');
  return `const DEFAULT_ANIME = ${anime};\n\nconst DEFAULT_ROSTER = [\n${cards}\n];\n\n`;
}

async function main() {
  const persistence = await getPersistenceInfo();
  if (persistence.mode !== 'neon') throw new Error('DATABASE_URL non configurato: Neon non è disponibile.');
  const source = JSON.parse(await fs.readFile(CATALOG_PATH, 'utf8'));
  if (!source.roster.length) throw new Error('Il catalogo locale non contiene carte.');
  await fs.mkdir(CARD_DIR, { recursive: true });
  const roster = await runLimited(source.roster, 6, downloadCard);
  const catalog = { anime: source.anime, roster };

  const previous = await loadCatalog();
  const backupDir = path.join(ROOT, 'data', 'catalog-backups');
  await fs.mkdir(backupDir, { recursive: true });
  const backup = path.join(backupDir, `catalog-before-local-cards-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
  await fs.writeFile(backup, `${JSON.stringify(previous, null, 2)}\n`, 'utf8');

  const payload = `${JSON.stringify(catalog, null, 2)}\n`;
  await Promise.all([fs.writeFile(CATALOG_PATH, payload, 'utf8'), fs.writeFile(DEFAULT_PATH, payload, 'utf8')]);
  const appPath = path.join(ROOT, 'public', 'app.js');
  const app = await fs.readFile(appPath, 'utf8');
  const nextApp = app.replace(/const DEFAULT_ANIME = \{[\s\S]*?(?=const CATALOG_STORAGE_KEY=)/, clientFallback(catalog));
  if (nextApp === app) throw new Error('Fallback del client non aggiornato.');
  await fs.writeFile(appPath, nextApp, 'utf8');
  await replaceCatalog(catalog);
  console.log(`Carte locali pronte: ${roster.length}. Backup: ${path.relative(ROOT, backup)}`);
}

main().catch(error => { console.error(`Localizzazione carte non riuscita: ${error.message}`); process.exitCode = 1; });
