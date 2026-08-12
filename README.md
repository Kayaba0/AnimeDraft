# Anime Draft — V0.15

Build di sviluppo con **Neon DB**, multiplayer realtime e pannello Admin con API CRUD dedicate.

## Novità V0.15

### Admin CRUD separato
Il pannello Admin non riscrive più l'intero catalogo a ogni modifica.

API disponibili:

```text
GET    /api/catalog
GET    /api/catalog/status

POST   /api/admin/categories
PATCH  /api/admin/categories/:id
DELETE /api/admin/categories/:id

POST   /api/admin/cards
PATCH  /api/admin/cards/:id
DELETE /api/admin/cards/:id
```

Ogni modifica agisce solo sulla riga interessata in Neon. L'endpoint legacy `PUT /api/catalog` è disabilitato con HTTP 405.

### Immagini nella cartella del progetto
Le immagini caricate o trascinate nell'Admin vengono ottimizzate dal browser in WebP e poi salvate dal server in:

```text
assets/uploads/categories/
assets/uploads/cards/
```

Neon conserva soltanto il percorso relativo, per esempio:

```text
/assets/uploads/cards/card_xxx-abc123.webp
```

Quando sostituisci un'immagine caricata in precedenza, il vecchio file locale viene eliminato automaticamente. Eliminando una carta o una categoria vengono rimossi anche i relativi upload locali.

## Importante per Vercel

Questa scelta è perfetta se gli asset vengono preparati **prima del deploy** o aggiornati raramente:

1. avvia Anime Draft in locale;
2. entra nell'Admin;
3. carica/sostituisci immagini;
4. verifica i nuovi file in `assets/uploads/`;
5. fai `git add`, `git commit` e `git push`;
6. Vercel pubblica i file nel deployment successivo.

Le Vercel Functions non possono scrivere permanentemente nella cartella del progetto a runtime. In produzione le modifiche testuali/punteggi su Neon continuano a funzionare, ma un nuovo upload immagine dall'Admin Vercel viene bloccato con un messaggio esplicativo.

## Migrare eventuali vecchie immagini inline

Se nella build precedente alcune immagini Admin erano ancora salvate in Neon come `data:image/...`, esegui una volta in locale:

```bash
npm run migrate:assets
```

Lo script converte solo gli asset inline già presenti: scrive i file in `assets/uploads/` e aggiorna i relativi `logo_url` / `image_url` su Neon. Dopo la migrazione fai commit/push delle nuove immagini. Gli URL esterni legacy non vengono scaricati automaticamente.

## Configurazione locale

Crea `.env` nella root:

```env
DATABASE_URL=postgresql://USER:PASSWORD@YOUR-ENDPOINT.neon.tech/neondb?sslmode=require
ADMIN_SECRET=
PORT=3000
```

Poi:

```bash
npm install
npm start
```

Apri:

```text
http://localhost:3000
```

Verifica Neon:

```text
http://localhost:3000/api/catalog/status
```

Dovresti vedere:

```json
{
  "ok": true,
  "mode": "neon",
  "durableForVercel": true,
  "assetStorage": "project-folder",
  "assetWritable": true
}
```

## Test consigliato delle nuove API

1. Crea una categoria dall'Admin.
2. Controlla `anime_categories` in Neon.
3. Aggiungi una carta.
4. Controlla `anime_cards` in Neon.
5. Trascina un'immagine sulla carta.
6. Controlla che in Neon `image_url` inizi con `/assets/uploads/cards/`.
7. Controlla che il file esista realmente nella cartella `assets/uploads/cards/`.
8. Modifica solo il punteggio della carta: deve cambiare solo quella entry, senza cancellare/riscrivere il catalogo.

## Persistenza

- **Neon DB**: categorie, carte, punteggi e path delle immagini.
- **assets/uploads/**: file caricati tramite Admin durante lo sviluppo locale.
- **localStorage**: solo cache client per apertura rapida; non è la sorgente autorevole.

## Git

Le cartelle upload sono volutamente incluse nel repository. Non aggiungere `assets/uploads/` a `.gitignore`.

Esempio dopo aver aggiornato le immagini:

```bash
git add assets/uploads app.js server.js catalog-store.js
git commit -m "Update Anime Draft catalog assets"
git push
```

## Note

Gli artwork legacy recuperati da fonti esterne restano esterni finché non vengono sostituiti tramite Admin. Ogni nuovo upload Admin, invece, viene salvato nella cartella del progetto.
