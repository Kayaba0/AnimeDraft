# Anime Draft

Anime Draft usa due servizi:

- Vercel pubblica esclusivamente l'interfaccia contenuta in public/.
- Render esegue il backend Node, le API Admin, Neon e Socket.IO per le stanze realtime.

## Struttura

- public/: HTML, CSS, JavaScript e asset visibili dal browser.
- api/config.js: funzione Vercel che espone al frontend il solo URL pubblico del backend Render.
- server.js e catalog-store.js: backend persistente per Render e sviluppo locale.
- render.yaml: Blueprint Render pronto per creare il servizio.

## Sviluppo locale

1. Copia .env.example in .env e imposta DATABASE_URL.
2. Esegui npm install.
3. Esegui npm start.
4. Apri http://localhost:3000.

In locale il frontend usa lo stesso server Node e non richiede configurazioni Vercel.

## Variabili Render

- DATABASE_URL: stringa di connessione Neon.
- ADMIN_SECRET: chiave obbligatoria per aprire e modificare l'area Admin.
- CLIENT_ORIGIN: URL pubblico Vercel, per esempio https://anime-draft-three.vercel.app.
- PORT: fornita automaticamente da Render.

Le immagini aggiunte dall'Admin in produzione vengono salvate in Neon come data URL, poiché il filesystem di Render non è persistente tra i deploy. Gli asset già presenti sono pubblicati da Vercel sotto public/assets/.

## Deploy

1. Crea su Render un Web Service dal repository e usa render.yaml.
2. Quando Render assegna l'URL HTTPS del servizio, impostalo su Vercel come ANIME_DRAFT_BACKEND_URL.
3. Vercel pubblica automaticamente public/ e la funzione api/config.js.
4. Visita /api/config sul dominio Vercel per verificare che l'URL backend sia presente.

## Controlli

- Render: /health deve rispondere con { ok: true }.
- Vercel: /api/config deve restituire backendUrl.
- Apri il sito Vercel e crea una partita: l'URL deve aggiungere ?room=CODICE.
