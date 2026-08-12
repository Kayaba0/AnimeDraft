'use strict';

require('dotenv').config();
const { loadCatalog, updateCategory, updateCard, getPersistenceInfo } = require('../catalog-store');

(async () => {
  const info = await getPersistenceInfo();
  if (process.env.VERCEL) throw new Error('Esegui questa migrazione in locale, non su Vercel.');
  const catalog = await loadCatalog();
  let categories = 0;
  let cards = 0;

  for (const [id, category] of Object.entries(catalog.anime || {})) {
    if (typeof category.logo === 'string' && category.logo.startsWith('data:image/')) {
      await updateCategory(id, { logo: category.logo });
      categories += 1;
      console.log(`Logo migrato: ${category.name}`);
    }
  }

  // Reload because category updates may have refreshed the catalog.
  const latest = await loadCatalog();
  for (const card of latest.roster || []) {
    if (typeof card.image === 'string' && card.image.startsWith('data:image/')) {
      await updateCard(card.id, { image: card.image });
      cards += 1;
      console.log(`Artwork migrato: ${card.name}`);
    }
  }

  console.log(`Migrazione completata. Categorie: ${categories}, carte: ${cards}.`);
  console.log(`Persistenza dati: ${info.mode}; asset: assets/uploads/.`);
})().catch(error => {
  console.error('Migrazione fallita:', error.message || error);
  process.exit(1);
});
