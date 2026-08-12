'use strict';

require('dotenv').config();

const path = require('path');
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const {
  loadCatalog, getPersistenceInfo,
  createCategory, updateCategory, deleteCategory,
  createCard, updateCard, deleteCard,
} = require('./catalog-store');

const PORT = Number(process.env.PORT || 3000);
const PLAYER_COLORS = ['#8b5cf6','#22c55e','#f59e0b','#ef4444','#06b6d4','#ec4899','#84cc16','#f97316'];
const BOT_NAMES = ['Akira','Mika','Ren','Yuna','Kai','Sora','Nami','Rei'];
const rooms = new Map();
const PUBLIC_ROOT = path.join(__dirname, 'public');
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:3000,http://127.0.0.1:3000')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

function isAllowedOrigin(origin) {
  return !origin || allowedOrigins.includes(origin);
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  maxHttpBufferSize: 25 * 1024 * 1024,
  pingTimeout: 20000,
  pingInterval: 25000,
  cors: {
    origin(origin, callback) {
      callback(isAllowedOrigin(origin) ? null : new Error('Origine non autorizzata'), isAllowedOrigin(origin));
    },
    methods: ['GET', 'POST'],
  },
});

app.disable('x-powered-by');
app.use(express.json({ limit: '30mb' }));
app.use((req, res, next) => {
  const origin = req.get('origin');
  if (isAllowedOrigin(origin) && origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

function adminWriteAllowed(req) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return true;
  return req.get('x-admin-key') === secret;
}

app.get('/api/catalog', async (_req, res) => {
  try {
    const [catalog, persistence] = await Promise.all([loadCatalog(), getPersistenceInfo()]);
    res.json({ ok: true, catalog, persistence });
  } catch (error) {
    console.error('GET /api/catalog', error);
    res.status(500).json({ ok: false, error: 'Catalogo non disponibile' });
  }
});

function adminGuard(req, res) {
  if (adminWriteAllowed(req)) return true;
  res.status(401).json({ ok: false, error: 'Chiave Admin non valida', requiresAdminKey: true });
  return false;
}

async function sendAdminMutation(res, label, operation) {
  try {
    const result = await operation();
    const persistence = await getPersistenceInfo();
    io.emit('catalog:updated', { updatedAt: Date.now() });
    res.json({ ok: true, ...result, persistence });
  } catch (error) {
    console.error(label, error);
    res.status(error.status || 500).json({ ok: false, error: error.message || 'Operazione Admin non riuscita', code: error.code || null });
  }
}

app.post('/api/admin/categories', async (req, res) => {
  if (!adminGuard(req, res)) return;
  return sendAdminMutation(res, 'POST /api/admin/categories', () => createCategory(req.body || {}));
});
app.patch('/api/admin/categories/:id', async (req, res) => {
  if (!adminGuard(req, res)) return;
  return sendAdminMutation(res, 'PATCH /api/admin/categories/:id', () => updateCategory(req.params.id, req.body || {}));
});
app.delete('/api/admin/categories/:id', async (req, res) => {
  if (!adminGuard(req, res)) return;
  return sendAdminMutation(res, 'DELETE /api/admin/categories/:id', () => deleteCategory(req.params.id));
});
app.post('/api/admin/cards', async (req, res) => {
  if (!adminGuard(req, res)) return;
  return sendAdminMutation(res, 'POST /api/admin/cards', () => createCard(req.body || {}));
});
app.patch('/api/admin/cards/:id', async (req, res) => {
  if (!adminGuard(req, res)) return;
  return sendAdminMutation(res, 'PATCH /api/admin/cards/:id', () => updateCard(req.params.id, req.body || {}));
});
app.delete('/api/admin/cards/:id', async (req, res) => {
  if (!adminGuard(req, res)) return;
  return sendAdminMutation(res, 'DELETE /api/admin/cards/:id', () => deleteCard(req.params.id));
});

// Legacy endpoint intentionally disabled: Admin now uses targeted CRUD APIs.
app.put('/api/catalog', (_req, res) => res.status(405).json({ ok: false, error: 'Endpoint legacy disabilitato. Usa /api/admin/categories e /api/admin/cards.' }));

app.get('/api/catalog/status', async (_req, res) => {
  try { res.json({ ok: true, ...(await getPersistenceInfo()) }); }
  catch { res.status(500).json({ ok: false }); }
});

// Do not expose server-side source, persistent catalog files or deployment secrets via static hosting.
app.use((req, res, next) => {
  const pathname = req.path || '';
  const blocked = pathname === '/server.js' || pathname === '/catalog-store.js' || pathname === '/package.json' || pathname === '/package-lock.json' || pathname.startsWith('/data/') || pathname.startsWith('/neon/') || pathname.startsWith('/.env');
  if (blocked) return res.sendStatus(404);
  next();
});

app.use(express.static(PUBLIC_ROOT, {
  etag: true,
  maxAge: process.env.NODE_ENV === 'production' ? '1h' : 0,
  setHeaders(res, filePath) {
    if (filePath.endsWith('.html')) res.setHeader('Cache-Control', 'no-store');
  },
}));
app.get('/health', (_req, res) => res.json({ ok: true, rooms: rooms.size, uptime: Math.round(process.uptime()) }));
app.use((_req, res) => res.sendFile(path.join(PUBLIC_ROOT, 'index.html')));

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const cleanText = (value, max = 40) => String(value ?? '').trim().replace(/[<>]/g, '').slice(0, max);
const shuffle = (input) => {
  const out = [...input];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};
const randomId = (prefix = 'id') => `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
const randomToken = () => `${randomId('s')}_${Math.random().toString(36).slice(2, 14)}`;
const roomCode = () => {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  do {
    code = Array.from({ length: 5 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
  } while (rooms.has(code));
  return code;
};

function sanitizeSettings(raw = {}) {
  return {
    players: clamp(Number(raw.players) || 4, 2, 8),
    teamSize: 5,
    budget: [50,100,150,200].includes(Number(raw.budget)) ? Number(raw.budget) : 100,
    timer: [4,5,7,10].includes(Number(raw.timer)) ? Number(raw.timer) : 5,
    hiddenScore: raw.hiddenScore !== false,
    synergies: Boolean(raw.synergies),
    mode: ['all','custom','random'].includes(raw.mode) ? raw.mode : 'custom',
    randomUniverseCount: clamp(Number(raw.randomUniverseCount) || 4, 1, 30),
    randomUniverseCountAuto: Boolean(raw.randomUniverseCountAuto),
  };
}

function sanitizeAnime(raw = {}) {
  const out = {};
  for (const [keyRaw, valueRaw] of Object.entries(raw || {}).slice(0, 80)) {
    const key = cleanText(keyRaw, 50).replace(/[^a-zA-Z0-9_-]/g, '');
    if (!key || !valueRaw) continue;
    out[key] = {
      name: cleanText(valueRaw.name || key, 50),
      accent: /^#[0-9a-f]{6}$/i.test(valueRaw.accent || '') ? valueRaw.accent : '#8b5cf6',
      logo: typeof valueRaw.logo === 'string' ? valueRaw.logo.slice(0, 2_000_000) : null,
    };
  }
  return out;
}

function sanitizeRoster(raw = [], allowedUniverses = new Set()) {
  const out = [];
  const used = new Set();
  for (const card of Array.isArray(raw) ? raw.slice(0, 600) : []) {
    const anime = cleanText(card?.anime, 50).replace(/[^a-zA-Z0-9_-]/g, '');
    if (!allowedUniverses.has(anime)) continue;
    let id = cleanText(card?.id || randomId('card'), 80);
    if (!id || used.has(id)) id = randomId('card');
    used.add(id);
    out.push({
      id,
      anime,
      name: cleanText(card?.name || 'Senza nome', 70),
      score: clamp(Number(card?.score) || 50, 10, 100),
      image: typeof card?.image === 'string' ? card.image.slice(0, 3_000_000) : null,
    });
  }
  return out;
}

function publicCard(card, revealScore = false) {
  if (!card) return null;
  const out = { id: card.id, anime: card.anime, name: card.name, image: card.image || null };
  if (revealScore) out.score = card.score;
  return out;
}

function publicPlayer(player, room, revealScore = false) {
  return {
    id: player.id,
    name: player.name,
    color: player.color,
    budget: player.budget,
    team: player.team.map(card => publicCard(card, revealScore)),
    score: revealScore ? player.score : 0,
    lastBid: player.lastBid || 0,
    isBot: Boolean(player.isBot),
    botControlled: Boolean(player.botControlled),
    connected: player.isBot ? true : Boolean(player.connected),
    host: player.id === room.hostPlayerId,
  };
}

function snapshot(room) {
  const reveal = room.phase === 'results';
  const randomHidden = room.settings.mode === 'random' && room.phase === 'lobby';
  return {
    roomCode: room.code,
    phase: room.phase,
    settings: room.settings,
    anime: room.anime,
    resolvedUniverses: randomHidden ? [] : room.resolvedUniverses,
    resolvedRandomUniverseCount: randomHidden ? 0 : room.resolvedRandomUniverseCount,
    hostPlayerId: room.hostPlayerId,
    players: room.players.map(p => publicPlayer(p, room, reveal)),
    current: room.phase === 'auction' ? publicCard(room.current, !room.settings.hiddenScore) : null,
    currentBid: room.currentBid || 0,
    leaderId: room.leaderId ?? null,
    lastBidderId: room.lastBidderId ?? null,
    passed: [...(room.passed || new Set())],
    timerLeft: room.timerLeft ?? room.settings.timer,
    round: room.round || 0,
    draftTotal: room.draftTotal || room.settings.players * room.settings.teamSize,
  };
}

function broadcast(room) {
  room.updatedAt = Date.now();
  io.to(room.code).emit('room:snapshot', snapshot(room));
}

function notice(room, message) {
  io.to(room.code).emit('room:notice', message);
}

function clearRoomTimers(room) {
  if (room.timerHandle) clearInterval(room.timerHandle);
  if (room.botHandle) clearInterval(room.botHandle);
  if (room.transitionHandle) clearTimeout(room.transitionHandle);
  room.timerHandle = null;
  room.botHandle = null;
  room.transitionHandle = null;
}

function availableColor(room) {
  const used = new Set(room.players.map(p => p.color));
  return PLAYER_COLORS.find(c => !used.has(c)) || PLAYER_COLORS[room.players.length % PLAYER_COLORS.length];
}

function makeHuman(room, name, socket) {
  return {
    id: randomId('p'), token: randomToken(), socketId: socket.id,
    name: cleanText(name || 'Giocatore', 18), color: availableColor(room),
    budget: room.settings.budget, team: [], score: 0, lastBid: 0,
    isBot: false, botControlled: false, connected: true,
    disconnectTimer: null,
  };
}

function addBotsToCapacity(room) {
  const usedNames = new Set(room.players.map(p => p.name));
  while (room.players.length < room.settings.players) {
    const index = room.players.length;
    const name = BOT_NAMES.find(n => !usedNames.has(n)) || `Bot ${index + 1}`;
    usedNames.add(name);
    room.players.push({
      id: randomId('bot'), token: null, socketId: null, name,
      color: availableColor(room), budget: room.settings.budget, team: [], score: 0, lastBid: 0,
      isBot: true, botControlled: true, connected: true,
    });
  }
}

function maxAllowed(room, player) {
  const remaining = room.settings.teamSize - player.team.length;
  return player.budget - Math.max(0, remaining - 1);
}

function eligiblePlayers(room) {
  return room.players.filter(p => p.team.length < room.settings.teamSize);
}

function placeBid(room, player, amount) {
  if (room.phase !== 'auction' || room.resolving) return { ok: false, error: 'Asta non disponibile' };
  if (room.passed.has(player.id)) return { ok: false, error: 'Hai già passato questo round' };
  if (player.team.length >= room.settings.teamSize) return { ok: false, error: 'La tua squadra è completa' };
  if (amount <= room.currentBid) return { ok: false, error: 'La puntata deve essere superiore' };
  if (amount > maxAllowed(room, player)) return { ok: false, error: 'Saldo insufficiente: devi conservare 1 credito per ogni slot rimasto' };
  room.currentBid = amount;
  room.leaderId = player.id;
  room.lastBidderId = player.id;
  player.lastBid = amount;
  room.timerLeft = room.settings.timer;
  broadcast(room);
  return { ok: true };
}

function checkEarlyEnd(room) {
  if (room.phase !== 'auction' || room.resolving) return;
  const eligible = eligiblePlayers(room).filter(p => !room.passed.has(p.id));
  if (room.leaderId !== null && eligible.length === 1 && eligible[0].id === room.leaderId) resolveAuction(room);
  else if (room.leaderId === null && eligible.length === 0) resolveAuction(room);
}

function botTick(room) {
  if (room.phase !== 'auction' || room.resolving) return;
  const bots = shuffle(room.players.filter(p => (p.isBot || p.botControlled) && !room.passed.has(p.id) && p.team.length < room.settings.teamSize));
  for (const p of bots) {
    if (Math.random() > .46) continue;
    const scarcity = (room.settings.teamSize - p.team.length) / room.settings.teamSize;
    const ideal = (room.current.score / room.settings.budget) * 32 + scarcity * 5;
    const personality = ((room.players.indexOf(p) + 1) * 1.9) % 7 + (Math.random() * 10 - 5);
    const willingness = Math.round(clamp(ideal + personality, 5, maxAllowed(room, p)));
    const min = room.currentBid ? room.currentBid + 1 : 1;
    if (min <= willingness) {
      const jump = Math.random() < .2 ? 5 : 1;
      const bid = Math.min(willingness, room.currentBid ? room.currentBid + jump : jump);
      placeBid(room, p, bid);
      return;
    }
    if (room.currentBid > 0 && Math.random() < .55) {
      room.passed.add(p.id);
      broadcast(room);
      checkEarlyEnd(room);
      return;
    }
  }
}

function startAuctionTimers(room) {
  clearRoomTimers(room);
  room.timerHandle = setInterval(() => {
    if (room.phase !== 'auction' || room.resolving) return;
    room.timerLeft -= 1;
    if (room.timerLeft <= 0) {
      broadcast(room);
      resolveAuction(room);
      return;
    }
    broadcast(room);
  }, 1000);
  room.botHandle = setInterval(() => botTick(room), 720);
}

function randomFillRemaining(room, reason = 'fine-pool') {
  clearRoomTimers(room);
  const cards = shuffle([...(room.unassignedCards || []), ...(room.deck || [])]);
  const slots = shuffle(room.players.flatMap(p => Array.from({ length: Math.max(0, room.settings.teamSize - p.team.length) }, () => p)));
  const total = Math.min(cards.length, slots.length);
  for (let i = 0; i < total; i++) {
    const p = slots[i], card = cards[i];
    p.team.push(card);
    p.budget = Math.max(0, p.budget - 1);
  }
  room.deck = [];
  room.unassignedCards = [];
  notice(room, reason === 'single-player'
    ? 'Ultimo giocatore incompleto: carte residue assegnate casualmente a 1 credito.'
    : 'Carte senza acquirente assegnate casualmente a 1 credito.');
  room.transitionHandle = setTimeout(() => finishGame(room), 850);
}

function nextAuction(room) {
  room.resolving = false;
  const active = eligiblePlayers(room);
  if (!active.length) return finishGame(room);
  if (active.length === 1) return randomFillRemaining(room, 'single-player');
  if (!room.deck.length) return randomFillRemaining(room, 'fine-pool');
  room.current = room.deck.shift();
  room.currentBid = 0;
  room.leaderId = null;
  room.lastBidderId = null;
  room.players.forEach(p => { p.lastBid = 0; });
  room.passed = new Set(room.players.filter(p => p.team.length >= room.settings.teamSize).map(p => p.id));
  room.timerLeft = room.settings.timer;
  room.round += 1;
  broadcast(room);
  startAuctionTimers(room);
}

function resolveAuction(room) {
  if (room.phase !== 'auction' || room.resolving) return;
  room.resolving = true;
  clearRoomTimers(room);
  if (room.leaderId !== null) {
    const winner = room.players.find(p => p.id === room.leaderId);
    if (winner) {
      winner.budget -= room.currentBid;
      winner.team.push(room.current);
      notice(room, `${room.current.name} → ${winner.name} per ${room.currentBid} crediti`);
    }
  } else {
    room.unassignedCards.push(room.current);
    notice(room, `${room.current.name} resta nel pool casuale`);
  }
  room.transitionHandle = setTimeout(() => nextAuction(room), 900);
}

function finishGame(room) {
  clearRoomTimers(room);
  room.players.forEach(p => {
    const base = p.team.reduce((sum, card) => sum + card.score, 0);
    let bonus = 0;
    if (room.settings.synergies) {
      const counts = {};
      p.team.forEach(card => { counts[card.anime] = (counts[card.anime] || 0) + 1; });
      bonus = Object.values(counts).reduce((sum, count) => sum + (count >= 3 ? 8 : 0), 0);
    }
    p.score = base + bonus;
  });
  room.players.sort((a, b) => b.score - a.score);
  room.phase = 'results';
  room.current = null;
  room.currentBid = 0;
  room.leaderId = null;
  room.lastBidderId = null;
  room.passed = new Set();
  broadcast(room);
}

function startRoomGame(room) {
  if (room.phase !== 'lobby') return { ok: false, error: 'La partita è già iniziata' };
  addBotsToCapacity(room);
  const needed = room.settings.players * room.settings.teamSize;
  if (room.roster.length < needed) return { ok: false, error: `Pool insufficiente: servono almeno ${needed} carte` };
  room.players.forEach((p, index) => {
    p.color = PLAYER_COLORS[index % PLAYER_COLORS.length];
    p.budget = room.settings.budget;
    p.team = [];
    p.score = 0;
    p.lastBid = 0;
  });
  room.deck = shuffle(room.roster).slice(0, needed);
  room.unassignedCards = [];
  room.draftTotal = needed;
  room.round = 0;
  room.phase = 'auction';
  room.current = null;
  room.currentBid = 0;
  room.leaderId = null;
  room.lastBidderId = null;
  room.passed = new Set();
  room.resolving = false;
  nextAuction(room);
  return { ok: true };
}

function findPlayerBySocket(room, socket) {
  return room.players.find(p => p.socketId === socket.id && !p.isBot);
}

function leaveSocketRoom(socket, explicit = false) {
  const code = socket.data.roomCode;
  const playerId = socket.data.playerId;
  if (!code || !playerId) return;
  const room = rooms.get(code);
  if (!room) return;
  const player = room.players.find(p => p.id === playerId);
  socket.leave(code);
  socket.data.roomCode = null;
  socket.data.playerId = null;
  if (!player || player.isBot) return;

  player.socketId = null;
  player.connected = false;
  if (room.phase === 'lobby') {
    if (player.disconnectTimer) clearTimeout(player.disconnectTimer);
    player.disconnectTimer = setTimeout(() => {
      if (player.connected || room.phase !== 'lobby') return;
      room.players = room.players.filter(p => p.id !== player.id);
      if (room.hostPlayerId === player.id) {
        const nextHost = room.players.find(p => !p.isBot && p.connected);
        room.hostPlayerId = nextHost?.id || room.players.find(p => !p.isBot)?.id || null;
      }
      if (!room.players.some(p => !p.isBot)) {
        clearRoomTimers(room);
        rooms.delete(room.code);
      } else broadcast(room);
    }, explicit ? 500 : 15000);
  } else if (room.phase === 'auction') {
    player.botControlled = true;
    broadcast(room);
  }
}

io.on('connection', socket => {
  socket.on('room:create', async (payload = {}, ack = () => {}) => {
    try {
      leaveSocketRoom(socket, true);
      const settings = sanitizeSettings(payload.settings);
      const sharedCatalog = await loadCatalog();
      const anime = sanitizeAnime(sharedCatalog.anime || {});
      const resolvedUniverses = [...new Set((payload.resolvedUniverses || []).map(v => cleanText(v, 50).replace(/[^a-zA-Z0-9_-]/g, '')).filter(v => anime[v]))];
      if (!resolvedUniverses.length) return ack({ ok: false, error: 'Seleziona almeno un universo' });
      const roster = sanitizeRoster(sharedCatalog.roster || [], new Set(resolvedUniverses));
      const needed = settings.players * settings.teamSize;
      if (roster.length < needed) return ack({ ok: false, error: `Pool insufficiente: servono almeno ${needed} carte` });
      const code = roomCode();
      const room = {
        code, phase: 'lobby', settings, anime, roster,
        resolvedUniverses, resolvedRandomUniverseCount: Number(payload.resolvedRandomUniverseCount) || resolvedUniverses.length,
        players: [], hostPlayerId: null, deck: [], unassignedCards: [], current: null,
        currentBid: 0, leaderId: null, lastBidderId: null, passed: new Set(), timerLeft: settings.timer,
        round: 0, draftTotal: needed, resolving: false, timerHandle: null, botHandle: null, transitionHandle: null,
        createdAt: Date.now(), updatedAt: Date.now(),
      };
      const host = makeHuman(room, payload.name, socket);
      room.players.push(host);
      room.hostPlayerId = host.id;
      rooms.set(code, room);
      socket.join(code);
      socket.data.roomCode = code;
      socket.data.playerId = host.id;
      ack({ ok: true, roomCode: code, playerId: host.id, token: host.token, snapshot: snapshot(room) });
    } catch (error) {
      console.error('room:create', error);
      ack({ ok: false, error: 'Errore durante la creazione della stanza' });
    }
  });

  socket.on('room:join', (payload = {}, ack = () => {}) => {
    try {
      leaveSocketRoom(socket, true);
      const code = cleanText(payload.roomCode, 6).toUpperCase();
      const room = rooms.get(code);
      if (!room) return ack({ ok: false, error: 'Stanza non trovata o scaduta' });
      if (room.phase !== 'lobby') return ack({ ok: false, error: 'La partita è già iniziata' });
      if (room.players.length >= room.settings.players) return ack({ ok: false, error: 'La stanza è piena' });
      const name = cleanText(payload.name, 18);
      if (!name) return ack({ ok: false, error: 'Inserisci il tuo nome' });
      const player = makeHuman(room, name, socket);
      room.players.push(player);
      socket.join(code);
      socket.data.roomCode = code;
      socket.data.playerId = player.id;
      ack({ ok: true, roomCode: code, playerId: player.id, token: player.token, snapshot: snapshot(room) });
      socket.to(code).emit('room:snapshot', snapshot(room));
      socket.to(code).emit('room:notice', `${player.name} è entrato nella stanza`);
    } catch (error) {
      console.error('room:join', error);
      ack({ ok: false, error: 'Errore durante l’ingresso nella stanza' });
    }
  });

  socket.on('room:rejoin', (payload = {}, ack = () => {}) => {
    const code = cleanText(payload.roomCode, 6).toUpperCase();
    const room = rooms.get(code);
    if (!room) return ack({ ok: false, error: 'Stanza non più disponibile' });
    const player = room.players.find(p => !p.isBot && p.token === payload.token);
    if (!player) return ack({ ok: false, error: 'Sessione non valida' });
    if (player.disconnectTimer) clearTimeout(player.disconnectTimer);
    if (player.socketId && player.socketId !== socket.id) {
      const previous = io.sockets.sockets.get(player.socketId);
      if (previous) previous.disconnect(true);
    }
    player.socketId = socket.id;
    player.connected = true;
    player.botControlled = false;
    socket.join(code);
    socket.data.roomCode = code;
    socket.data.playerId = player.id;
    ack({ ok: true, roomCode: code, playerId: player.id, name: player.name, snapshot: snapshot(room) });
    socket.to(code).emit('room:snapshot', snapshot(room));
  });

  socket.on('room:start', (payload = {}, ack = () => {}) => {
    const code = cleanText(payload.roomCode, 6).toUpperCase();
    const room = rooms.get(code);
    if (!room) return ack({ ok: false, error: 'Stanza non trovata' });
    const player = findPlayerBySocket(room, socket);
    if (!player || player.id !== room.hostPlayerId) return ack({ ok: false, error: 'Solo l’host può iniziare' });
    const result = startRoomGame(room);
    ack(result);
  });

  socket.on('auction:bid', (payload = {}, ack = () => {}) => {
    const code = cleanText(payload.roomCode, 6).toUpperCase();
    const room = rooms.get(code);
    if (!room) return ack({ ok: false, error: 'Stanza non trovata' });
    const player = findPlayerBySocket(room, socket);
    if (!player) return ack({ ok: false, error: 'Giocatore non riconosciuto' });
    const step = Number(payload.step) === 5 ? 5 : 1;
    const amount = room.currentBid === 0 ? step : room.currentBid + step;
    const result = placeBid(room, player, amount);
    ack(result);
  });

  socket.on('auction:pass', (payload = {}, ack = () => {}) => {
    const code = cleanText(payload.roomCode, 6).toUpperCase();
    const room = rooms.get(code);
    if (!room || room.phase !== 'auction') return ack({ ok: false, error: 'Asta non disponibile' });
    const player = findPlayerBySocket(room, socket);
    if (!player) return ack({ ok: false, error: 'Giocatore non riconosciuto' });
    if (room.passed.has(player.id)) return ack({ ok: false, error: 'Hai già passato' });
    room.passed.add(player.id);
    broadcast(room);
    checkEarlyEnd(room);
    ack({ ok: true });
  });

  socket.on('room:leave', (_payload = {}, ack = () => {}) => {
    leaveSocketRoom(socket, true);
    ack({ ok: true });
  });

  socket.on('disconnect', () => leaveSocketRoom(socket, false));
});

setInterval(() => {
  const now = Date.now();
  for (const [code, room] of rooms) {
    const connectedHumans = room.players.some(p => !p.isBot && p.connected);
    if (!connectedHumans && now - room.updatedAt > 10 * 60 * 1000) {
      clearRoomTimers(room);
      rooms.delete(code);
    }
  }
}, 60_000).unref();

// Il backend persistente viene eseguito in locale e su Render.
function startRealtimeServer(port = PORT) {
  server.listen(port, async () => {
  console.log(`Anime Draft realtime server → http://localhost:${port}`);
  try {
    const persistence = await getPersistenceInfo();
    if (persistence.mode === 'neon') {
      console.log('Catalogo Admin → Neon DB connesso');
    } else {
      console.warn('Catalogo Admin → FILE LOCALE (DATABASE_URL non disponibile)');
    }
  } catch (error) {
    console.error('Controllo persistenza non riuscito:', error.message);
  }
  });
}

if (require.main === module) startRealtimeServer();

module.exports = { app, server, startRealtimeServer };
