# Eid Together — Global Celebration Wall

A digital wall where anyone can share an Eid wish and react to wishes from people around the world. One page, one celebration, every language.

## Motivation

Eid is celebrated by millions across the globe, but most of us only share it with people we already know. This project is a small attempt to feel the scale of that celebration — a space where you can drop a blessing and scroll through wishes from strangers in other countries, in their own languages. No accounts, no barriers.

## Features

- Post an Eid wish with your country, gender, and a generated avatar
- React to wishes with 5 emoji reactions (🌙 ✨ ❤️ 🤲 🕌)
- Filter wishes by country using a searchable dropdown
- Sort by newest or popular
- Paginated feed
- 8 languages: English, Arabic, French, Turkish, Indonesian, Hausa, Igbo, Yoruba
- Language switcher with RTL support (Arabic)
- Lightweight moderation (regex-based spam/abuse checks, no AI or external API)
- Anonymous — no signup or login required
- Custom 404 page

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Frontend | React 19, SCSS Modules, Framer Motion |
| Backend | Next.js API Routes (serverless) |
| Database | Supabase (Postgres) |
| Data Fetching | TanStack Query (React Query) |
| i18n | next-intl |
| State | Zustand |

Both the frontend and backend live in the same Next.js project. API routes handle all database operations — messages, reactions, and stats — using Supabase's server-side client with the service role key.

### Localization

Translations live in `messages/` as JSON files (one per locale). The app detects the user's browser locale on first visit and can be switched at any time via the language menu. All UI strings, error messages, and toast notifications are covered across all 8 locales.

## How to Run

### Prerequisites

- Node.js 20+
- A Supabase project (free tier works)

### Setup

1. Clone the repo

2. Install dependencies:

```bash
npm install
```

3. Copy the environment template:

```bash
cp .env.example .env.local
```

4. Fill in your Supabase credentials in `.env.local` — you'll find them in your Supabase project dashboard under Project Settings → API

5. Make sure your Supabase database has these tables:
   - `messages` — stores wishes
   - `reactions` — stores emoji reactions with unique constraint on (message_id, user_id, reaction_type)

6. Run the dev server:

```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000)

### Build for production

```bash
npm run build
npm start
```

## Project Structure

```
app/
  [locale]/            Route segments per locale
  api/                 API routes (messages, reactions, stats)
domains/
  messages/            Message feed, composer, validation
  reactions/           Reaction service, repository, mutations
  ui/                  Shared UI (nav, language switcher, toast)
  atmospheric/         Background effects
  stats/               Global stats
lib/                   Supabase client, types, utilities
messages/              Locale JSON files (en, ar, fr, tr, id, ha, ig, yo)
```

## Contribution

PRs and ideas are welcome. If you're planning something significant, open an issue first to discuss it.

Ways to help:
- Add a new locale
- Improve accessibility
- Report a bug