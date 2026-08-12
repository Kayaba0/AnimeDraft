'use strict';

module.exports = (_req, res) => {
  const backendUrl = String(process.env.ANIME_DRAFT_BACKEND_URL || '').trim().replace(/\/+$/, '');
  if (!/^https:\/\/[^\s]+$/i.test(backendUrl)) {
    return res.status(503).json({ ok: false, error: 'Backend realtime non configurato' });
  }

  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.status(200).json({ ok: true, backendUrl });
};
