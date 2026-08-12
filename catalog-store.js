'use strict';

const fs = require('fs/promises');
const path = require('path');

const ROOT = __dirname;
const DEFAULT_PATH = path.join(ROOT, 'data', 'default-catalog.json');
const LOCAL_PATH = path.join(ROOT, 'data', 'catalog.json');
const UPLOAD_ROOT = path.join(ROOT, 'assets', 'uploads');

let neonSql = null;
let neonReady = false;
let schemaReady = false;

function cleanText(value, max = 80) {
  return String(value ?? '').trim().replace(/[<>]/g, '').slice(0, max);
}
function cleanId(value, fallback = 'item') {
  return cleanText(value || fallback, 90).replace(/[^a-zA-Z0-9_-]/g, '') || fallback;
}
function clone(value) { return JSON.parse(JSON.stringify(value)); }
function slugify(value) {
  return cleanText(value || 'item', 80).toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'item';
}
function generatedId(prefix = 'item') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, 'utf8'));
}
async function defaultCatalog() {
  return readJson(DEFAULT_PATH);
}

function sanitizeCatalog(raw = {}) {
  const anime = {};
  for (const [rawKey, rawValue] of Object.entries(raw.anime || {}).slice(0, 100)) {
    const key = cleanId(rawKey, 'category');
    const value = rawValue || {};
    anime[key] = {
      name: cleanText(value.name || key, 60),
      accent: /^#[0-9a-f]{6}$/i.test(value.accent || '') ? value.accent : '#8b5cf6',
      logo: typeof value.logo === 'string' ? value.logo.slice(0, 8_000_000) : null,
      ...(Number.isFinite(Number(value.malId)) ? { malId: Number(value.malId) } : {}),
    };
  }

  const roster = [];
  const used = new Set();
  for (const rawCard of Array.isArray(raw.roster) ? raw.roster.slice(0, 1000) : []) {
    const animeKey = cleanId(rawCard?.anime, '');
    if (!anime[animeKey]) continue;
    let id = cleanId(rawCard?.id, generatedId('card'));
    if (used.has(id)) id = `${id}_${used.size + 1}`;
    used.add(id);
    roster.push({
      id,
      anime: animeKey,
      name: cleanText(rawCard?.name || 'Senza nome', 80),
      score: Math.max(10, Math.min(100, Number(rawCard?.score) || 50)),
      image: typeof rawCard?.image === 'string' ? rawCard.image.slice(0, 10_000_000) : null,
    });
  }
  return { anime, roster };
}

function dataUrlToBuffer(value) {
  if (typeof value !== 'string') return null;
  const match = value.match(/^data:(image\/(?:png|jpeg|jpg|webp|gif));base64,([A-Za-z0-9+/=]+)$/i);
  if (!match) return null;
  const buffer = Buffer.from(match[2], 'base64');
  if (buffer.length > 6 * 1024 * 1024) throw new Error('Immagine troppo grande: massimo 6 MB dopo la compressione.');
  return {
    mime: match[1].toLowerCase().replace('image/jpg', 'image/jpeg'),
    buffer,
  };
}

function isProjectUpload(value) {
  return typeof value === 'string' && /^\/?assets\/uploads\/(cards|categories)\/[a-zA-Z0-9._-]+$/.test(value);
}

async function deleteProjectAsset(value) {
  if (!isProjectUpload(value)) return;
  const relative = value.replace(/^\//, '');
  const absolute = path.resolve(ROOT, relative);
  const safeRoot = path.resolve(UPLOAD_ROOT) + path.sep;
  if (!absolute.startsWith(safeRoot)) return;
  await fs.unlink(absolute).catch(() => {});
}

async function persistProjectAsset(value, folder, id, previousValue = null) {
  if (value === null || value === '') return null;

  const decoded = dataUrlToBuffer(value);
  if (!decoded) return typeof value === 'string' ? value : null;

  // Vercel Functions have a read-only deployment filesystem. Runtime uploads must be
  // prepared locally and committed to GitHub, or moved to object storage in production.
  if (process.env.VERCEL) {
    const error = new Error('Su Vercel non è possibile salvare file nella cartella del progetto a runtime. Carica l’immagine in locale, fai commit/push su GitHub e ridistribuisci.');
    error.code = 'READ_ONLY_DEPLOYMENT';
    throw error;
  }

  const ext = decoded.mime.includes('webp') ? 'webp'
    : decoded.mime.includes('png') ? 'png'
      : decoded.mime.includes('gif') ? 'gif' : 'jpg';
  const safeFolder = folder === 'categories' ? 'categories' : 'cards';
  const safeId = cleanId(id, 'asset');
  const fileName = `${safeId}-${Date.now().toString(36)}.${ext}`;
  const diskDir = path.join(UPLOAD_ROOT, safeFolder);
  const diskPath = path.join(diskDir, fileName);
  await fs.mkdir(diskDir, { recursive: true });
  await fs.writeFile(diskPath, decoded.buffer);
  return `/assets/uploads/${safeFolder}/${fileName}`;
}

async function initNeon() {
  if (neonReady) return neonSql;
  neonReady = true;
  if (!process.env.DATABASE_URL) return null;
  try {
    const { neon } = require('@neondatabase/serverless');
    neonSql = neon(process.env.DATABASE_URL);
    return neonSql;
  } catch (error) {
    console.error('Neon DB non inizializzato:', error.message);
    neonSql = null;
    return null;
  }
}

async function ensureNeonSchema(sql) {
  if (schemaReady) return;
  await sql`
    CREATE TABLE IF NOT EXISTS anime_categories (
      id text PRIMARY KEY,
      name text NOT NULL,
      accent text NOT NULL DEFAULT '#8b5cf6',
      logo_url text,
      mal_id integer,
      updated_at timestamptz NOT NULL DEFAULT now()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS anime_cards (
      id text PRIMARY KEY,
      category_id text NOT NULL REFERENCES anime_categories(id) ON DELETE CASCADE,
      name text NOT NULL,
      score integer NOT NULL DEFAULT 50 CHECK (score BETWEEN 10 AND 100),
      image_url text,
      updated_at timestamptz NOT NULL DEFAULT now()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS anime_cards_category_idx ON anime_cards(category_id)`;
  await sql`ALTER TABLE anime_cards DROP CONSTRAINT IF EXISTS anime_cards_score_check`;
  await sql`ALTER TABLE anime_cards ADD CONSTRAINT anime_cards_score_check CHECK (score BETWEEN 10 AND 100)`;
  schemaReady = true;
}

async function loadNeon(sql) {
  await ensureNeonSchema(sql);
  const [categoryRows, cardRows] = await sql.transaction([
    sql`SELECT id, name, accent, logo_url, mal_id FROM anime_categories ORDER BY name`,
    sql`SELECT id, category_id, name, score, image_url FROM anime_cards ORDER BY name`,
  ], { readOnly: true });

  if (!categoryRows?.length) {
    const seeded = await defaultCatalog();
    return seedNeon(sql, seeded);
  }

  const anime = {};
  for (const row of categoryRows) {
    anime[row.id] = {
      name: row.name,
      accent: row.accent || '#8b5cf6',
      logo: row.logo_url || null,
      ...(row.mal_id ? { malId: row.mal_id } : {}),
    };
  }
  const roster = (cardRows || []).filter(row => anime[row.category_id]).map(row => ({
    id: row.id,
    anime: row.category_id,
    name: row.name,
    score: row.score,
    image: row.image_url || null,
  }));
  return sanitizeCatalog({ anime, roster });
}

async function seedNeon(sql, rawCatalog) {
  await ensureNeonSchema(sql);
  const catalog = sanitizeCatalog(rawCatalog);
  const categoriesJson = JSON.stringify(Object.entries(catalog.anime).map(([id, category]) => ({
    id, name: category.name, accent: category.accent, logo_url: category.logo || null, mal_id: category.malId || null,
  })));
  const cardsJson = JSON.stringify(catalog.roster.map(card => ({
    id: card.id, category_id: card.anime, name: card.name, score: card.score, image_url: card.image || null,
  })));
  const queries = [sql`DELETE FROM anime_cards`, sql`DELETE FROM anime_categories`];
  if (Object.keys(catalog.anime).length) {
    queries.push(sql`
      INSERT INTO anime_categories (id, name, accent, logo_url, mal_id, updated_at)
      SELECT x.id, x.name, x.accent, x.logo_url, x.mal_id, now()
      FROM jsonb_to_recordset(${categoriesJson}::jsonb)
        AS x(id text, name text, accent text, logo_url text, mal_id integer)
    `);
  }
  if (catalog.roster.length) {
    queries.push(sql`
      INSERT INTO anime_cards (id, category_id, name, score, image_url, updated_at)
      SELECT x.id, x.category_id, x.name, x.score, x.image_url, now()
      FROM jsonb_to_recordset(${cardsJson}::jsonb)
        AS x(id text, category_id text, name text, score integer, image_url text)
    `);
  }
  await sql.transaction(queries, { isolationMode: 'Serializable' });
  return catalog;
}

async function loadLocal() {
  try {
    return sanitizeCatalog(await readJson(LOCAL_PATH));
  } catch {
    const seeded = sanitizeCatalog(await defaultCatalog());
    await saveLocal(seeded);
    return seeded;
  }
}

async function saveLocal(rawCatalog) {
  const catalog = sanitizeCatalog(rawCatalog);
  await fs.mkdir(path.dirname(LOCAL_PATH), { recursive: true });
  const temp = `${LOCAL_PATH}.tmp`;
  await fs.writeFile(temp, JSON.stringify(catalog, null, 2), 'utf8');
  await fs.rename(temp, LOCAL_PATH);
  return catalog;
}

async function loadCatalog() {
  const sql = await initNeon();
  if (sql) return loadNeon(sql);
  return loadLocal();
}

// Intended for controlled, offline catalog refreshes.  Unlike the Admin CRUD
// handlers, this deliberately replaces the complete roster in one transaction.
async function replaceCatalog(rawCatalog) {
  const catalog = sanitizeCatalog(rawCatalog);
  const sql = await initNeon();
  if (sql) return seedNeon(sql, catalog);
  return saveLocal(catalog);
}

async function createCategory(raw = {}) {
  const name = cleanText(raw.name, 60);
  if (!name) throw new Error('Nome categoria obbligatorio.');
  const accent = /^#[0-9a-f]{6}$/i.test(raw.accent || '') ? raw.accent : '#8b5cf6';
  const requested = cleanId(raw.id || slugify(name), 'category');
  const catalog = await loadCatalog();
  let id = requested;
  let n = 2;
  while (catalog.anime[id]) id = `${requested}_${n++}`;
  const logo = await persistProjectAsset(raw.logo || null, 'categories', id, null);

  const sql = await initNeon();
  if (sql) {
    await ensureNeonSchema(sql);
    await sql`INSERT INTO anime_categories (id, name, accent, logo_url, updated_at) VALUES (${id}, ${name}, ${accent}, ${logo}, now())`;
  } else {
    catalog.anime[id] = { name, accent, logo };
    await saveLocal(catalog);
  }
  return { id, category: { name, accent, logo }, catalog: await loadCatalog() };
}

async function updateCategory(rawId, raw = {}) {
  const id = cleanId(rawId, '');
  const catalog = await loadCatalog();
  const current = catalog.anime[id];
  if (!current) throw Object.assign(new Error('Categoria non trovata.'), { status: 404 });
  const name = raw.name !== undefined ? cleanText(raw.name, 60) : current.name;
  if (!name) throw new Error('Nome categoria obbligatorio.');
  const accent = raw.accent !== undefined && /^#[0-9a-f]{6}$/i.test(raw.accent || '') ? raw.accent : current.accent;
  let logo = current.logo || null;
  if (Object.prototype.hasOwnProperty.call(raw, 'logo')) logo = await persistProjectAsset(raw.logo, 'categories', id, current.logo);

  const sql = await initNeon();
  if (sql) {
    await ensureNeonSchema(sql);
    await sql`UPDATE anime_categories SET name=${name}, accent=${accent}, logo_url=${logo}, updated_at=now() WHERE id=${id}`;
  } else {
    catalog.anime[id] = { ...current, name, accent, logo };
    await saveLocal(catalog);
  }
  if (logo !== current.logo) await deleteProjectAsset(current.logo);
  return { id, category: { ...current, name, accent, logo }, catalog: await loadCatalog() };
}

async function deleteCategory(rawId) {
  const id = cleanId(rawId, '');
  const catalog = await loadCatalog();
  if (!catalog.anime[id]) throw Object.assign(new Error('Categoria non trovata.'), { status: 404 });
  if (Object.keys(catalog.anime).length <= 1) throw new Error('Deve restare almeno una categoria.');
  const assets = [catalog.anime[id].logo, ...catalog.roster.filter(c => c.anime === id).map(c => c.image)];
  const sql = await initNeon();
  if (sql) {
    await ensureNeonSchema(sql);
    await sql`DELETE FROM anime_categories WHERE id=${id}`;
  } else {
    delete catalog.anime[id];
    catalog.roster = catalog.roster.filter(c => c.anime !== id);
    await saveLocal(catalog);
  }
  await Promise.all(assets.map(deleteProjectAsset));
  return { id, catalog: await loadCatalog() };
}

async function createCard(raw = {}) {
  const catalog = await loadCatalog();
  const anime = cleanId(raw.anime, '');
  if (!catalog.anime[anime]) throw new Error('Categoria non valida.');
  const name = cleanText(raw.name, 80);
  if (!name) throw new Error('Nome personaggio obbligatorio.');
  const score = Math.max(10, Math.min(100, Number(raw.score) || 50));
  let id = cleanId(raw.id || generatedId('card'), generatedId('card'));
  while (catalog.roster.some(c => c.id === id)) id = generatedId('card');
  const image = await persistProjectAsset(raw.image || null, 'cards', id, null);

  const sql = await initNeon();
  if (sql) {
    await ensureNeonSchema(sql);
    await sql`INSERT INTO anime_cards (id, category_id, name, score, image_url, updated_at) VALUES (${id}, ${anime}, ${name}, ${score}, ${image}, now())`;
  } else {
    catalog.roster.push({ id, anime, name, score, image });
    await saveLocal(catalog);
  }
  return { id, card: { id, anime, name, score, image }, catalog: await loadCatalog() };
}

async function updateCard(rawId, raw = {}) {
  const id = cleanId(rawId, '');
  const catalog = await loadCatalog();
  const current = catalog.roster.find(c => c.id === id);
  if (!current) throw Object.assign(new Error('Carta non trovata.'), { status: 404 });
  const anime = raw.anime !== undefined ? cleanId(raw.anime, '') : current.anime;
  if (!catalog.anime[anime]) throw new Error('Categoria non valida.');
  const name = raw.name !== undefined ? cleanText(raw.name, 80) : current.name;
  if (!name) throw new Error('Nome personaggio obbligatorio.');
  const score = raw.score !== undefined ? Math.max(10, Math.min(100, Number(raw.score) || 50)) : current.score;
  const previousImage = current.image || null;
  let image = previousImage;
  if (Object.prototype.hasOwnProperty.call(raw, 'image')) image = await persistProjectAsset(raw.image, 'cards', id, current.image);

  const sql = await initNeon();
  if (sql) {
    await ensureNeonSchema(sql);
    await sql`UPDATE anime_cards SET category_id=${anime}, name=${name}, score=${score}, image_url=${image}, updated_at=now() WHERE id=${id}`;
  } else {
    Object.assign(current, { anime, name, score, image });
    await saveLocal(catalog);
  }
  if (image !== previousImage) await deleteProjectAsset(previousImage);
  return { id, card: { id, anime, name, score, image }, catalog: await loadCatalog() };
}

async function deleteCard(rawId) {
  const id = cleanId(rawId, '');
  const catalog = await loadCatalog();
  const current = catalog.roster.find(c => c.id === id);
  if (!current) throw Object.assign(new Error('Carta non trovata.'), { status: 404 });
  const sql = await initNeon();
  if (sql) {
    await ensureNeonSchema(sql);
    await sql`DELETE FROM anime_cards WHERE id=${id}`;
  } else {
    catalog.roster = catalog.roster.filter(c => c.id !== id);
    await saveLocal(catalog);
  }
  await deleteProjectAsset(current.image);
  return { id, catalog: await loadCatalog() };
}

async function getPersistenceInfo() {
  const sql = await initNeon();
  const neon = Boolean(sql);
  return {
    mode: neon ? 'neon' : 'file',
    durableForVercel: neon,
    assetStorage: 'project-folder',
    assetWritable: !Boolean(process.env.VERCEL),
  };
}

module.exports = {
  loadCatalog,
  replaceCatalog,
  getPersistenceInfo,
  sanitizeCatalog,
  clone,
  createCategory,
  updateCategory,
  deleteCategory,
  createCard,
  updateCard,
  deleteCard,
};
