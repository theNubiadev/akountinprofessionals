-- 
-- Akountin Professionals — Blog Database Schema
-- Run this once against your PostgreSQL database:
--   psql -U youruser -d yourdb -f schema.sql
-- 
-- ── Admin users 
CREATE TABLE IF NOT EXISTS admin_users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,            -- bcrypt hash, never plain text
  name          TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('editor', 'admin')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Blog posts 
CREATE TABLE IF NOT EXISTS posts (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             TEXT NOT NULL UNIQUE,
  title            TEXT NOT NULL,
  excerpt          TEXT NOT NULL DEFAULT '',
  content          TEXT NOT NULL,
  tags             TEXT[]       NOT NULL DEFAULT '{}',
  author_name      TEXT NOT NULL DEFAULT 'Akountin Professionals',
  author_type      TEXT NOT NULL DEFAULT 'editor' CHECK (author_type IN ('editor', 'ai')),
  status           TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  reading_minutes  INTEGER NOT NULL DEFAULT 1,
  meta_description TEXT NOT NULL DEFAULT '',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_at     TIMESTAMPTZ
);

-- ── Indexes 
CREATE INDEX IF NOT EXISTS posts_status_idx      ON posts (status);
CREATE INDEX IF NOT EXISTS posts_published_at_idx ON posts (published_at DESC);
CREATE INDEX IF NOT EXISTS posts_slug_idx         ON posts (slug);

-- ── Seed admin users (run once — change passwords immediately after) ──────────
-- Passwords are bcrypt hashes. Generate with: node -e "console.log(require('bcrypt').hashSync('YourPassword!', 10))"
-- The values below hash to: Editor2024! and Admin2024!
INSERT INTO admin_users (email, password_hash, name, role) VALUES
  (
    'editor@akountinprofessionals.co.uk',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- replace with real hash
    'Sarah Williams',
    'editor'
  ),
  (
    'admin@akountinprofessionals.co.uk',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',  -- replace with real hash
    'Admin',
    'admin'
  )
ON CONFLICT (email) DO NOTHING;

-- ── Seed sample posts 
INSERT INTO posts (slug, title, excerpt, content, tags, author_name, author_type, status, reading_minutes, meta_description, published_at) VALUES
(
  'understanding-self-assessment-deadlines-2024-25',
  'Understanding the 2024–25 Self-Assessment Deadlines',
  'Miss the 31 January deadline and HMRC issues automatic penalties. Here''s every date you need to diary.',
  E'**Overview**\n\nEvery year, millions of UK taxpayers must file a Self Assessment return. The consequences of missing key deadlines range from a £100 fixed penalty to daily charges of £10 after three months.\n\n**Key dates for 2024–25**\n\nThe paper filing deadline falls on 31 October 2024. Online filing must be completed by 31 January 2025. Any tax owed for 2023–24 — plus the first payment on account for 2024–25 — is also due on 31 January 2025.\n\n**Penalties for late filing**\n\nA £100 fixed penalty applies immediately after the deadline. After three months, £10 per day is charged up to a maximum of £900.',
  ARRAY['Self Assessment', 'HMRC', 'Tax Deadlines'],
  'Sarah Williams',
  'editor',
  'published',
  4,
  'Key self-assessment deadlines for the 2024-25 tax year, penalties for late filing, and who needs to register.',
  NOW() - INTERVAL '4 days'
),
(
  'corporation-tax-changes-small-business-2023',
  'Corporation Tax Changes: What Small Businesses Must Know',
  'The main rate rose to 25% for profits over £250,000. We break down the marginal relief rules.',
  E'**The new rate structure**\n\nFrom April 2023, the UK Corporation Tax landscape changed significantly. Companies with profits up to £50,000 continue to pay at the small profits rate of 19%. Profits above £250,000 are taxed at the new main rate of 25%.\n\n**Marginal relief**\n\nCompanies with profits between £50,000 and £250,000 benefit from marginal relief, which tapers the effective rate between 19% and 25%.',
  ARRAY['Corporation Tax', 'Limited Company', 'Tax Planning'],
  'Sarah Williams',
  'editor',
  'draft',
  3,
  'Corporation Tax changes from April 2023 explained for small businesses.',
  NULL
)
ON CONFLICT (slug) DO NOTHING;