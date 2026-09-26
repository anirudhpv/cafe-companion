# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

"Cafe Companion" — a single-event web app for the Google Cloud Builder Pop-Up: a café menu with an AI explainer/recommender, an attendee "radar" with AI icebreakers, and a room-vibe/feedback page. React + TanStack Router frontend, Hono API backend, Gemini for AI, deployed to Cloud Run.

## Commands

- `npm run dev` — runs API (`tsx watch server/index.ts`, port 3001) and Vite (port 3000) together. Vite proxies `/api` → `localhost:3001`.
- `npm run dev:api` / `npm run dev:web` — run either half alone.
- `npm run build` — `vite build` (frontend → `dist/`) then `tsc -p tsconfig.server.json` (server → `dist/server/`).
- `npm start` — runs the compiled server.

No lint or test setup exists.

## Architecture

- **Backend (`server/index.ts`)**: one Hono file holding every `/api/*` route. All state (attendees, room feedback) is **in-memory** and resets on restart; seed data lives in `server/data/menu.ts` and `server/data/attendees.ts`.
- **AI calls**: every AI route builds a prompt, calls `generateGeminiJson()` (JSON response mode, tries a list of Gemini models in order on failure), and **falls back to a hard-coded response** when `GEMINI_API_KEY` is missing or all models fail. Responses include a `source` field (model name or `local-*-curated`) so the UI can tell which path ran. Keep this fallback pattern when adding AI endpoints.
- **Frontend (`src/`)**: code-based routes in `src/router.tsx` (`/` Menu, `/radar`, `/room`) — the TanStack router plugin is installed but not used for file-based routing. Pages/components call the API with plain `fetch('/api/...')`; no data-fetching library.
- **Types are duplicated**: `MenuItem` and `Attendee` are defined both in `server/data/*.ts` and `src/types/index.ts`. Change both together.
- **Server imports use `.js` extensions** (`./data/menu.js`) because `tsconfig.server.json` uses `NodeNext` module resolution.
- Styling is Tailwind; `@` aliases `src/` in Vite.

## Config

- `GEMINI_API_KEY` in `.env` (loaded via dotenv). App works without it using fallbacks.

## Known deployment gaps

- The server listens on a hard-coded `PORT = 3001`, but the Dockerfile/Cloud Run expect `process.env.PORT` (8080).
- The Hono server does not serve the built frontend in `dist/`, so the production container only exposes the API.
