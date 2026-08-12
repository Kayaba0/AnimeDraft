-- Anime Draft persistent catalog schema for Neon Postgres.
-- The app creates these tables automatically when DATABASE_URL is configured,
-- but this file can also be run manually in the Neon SQL Editor.

CREATE TABLE IF NOT EXISTS anime_categories (
  id text PRIMARY KEY,
  name text NOT NULL,
  accent text NOT NULL DEFAULT '#8b5cf6',
  logo_url text,
  mal_id integer,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS anime_cards (
  id text PRIMARY KEY,
  category_id text NOT NULL REFERENCES anime_categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  score integer NOT NULL DEFAULT 50 CHECK (score BETWEEN 10 AND 100),
  image_url text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS anime_cards_category_idx ON anime_cards(category_id);
