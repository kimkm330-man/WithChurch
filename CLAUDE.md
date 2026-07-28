# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install dependencies
npm run dev        # start dev server at http://localhost:3000
npm run build       # production build
npm run start        # run production build
npm run lint        # next lint
```

There is no test suite configured in this repo.

### Environment setup

Copy `.env.local.example` to `.env.local` and fill in Supabase project values:

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (e.g. `https://xxxx.supabase.co`, no `/rest/v1`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon (publishable) key |

The home page (`/`) displays the live Supabase connection status, which is the quickest way to verify env vars are wired correctly.

In GitHub Codespaces, `.devcontainer/devcontainer.json` runs `npm install` on create and auto-starts `npm run dev` in the background on every start (logs to `/tmp/dev-server.log`), forwarding port 3000.

## Architecture

Next.js 14 App Router + Supabase (auth, Postgres, RPC). No server framework beyond Next's own route handlers/middleware — Supabase is the entire backend.

### Supabase client split

Three separate Supabase client constructors exist because of Next's SSR/client boundary — always use the one matching the context:

- `src/lib/supabase/client.ts` — browser client, for `"use client"` components.
- `src/lib/supabase/server.ts` — server client for Server Components, reads/writes cookies via `next/headers`.
- `src/lib/supabase/middleware.ts` — a third client built inside `updateSession()`, used only by the root `middleware.ts`.

### Auth + approval gating flow

This is the core domain logic and spans multiple files, so understand it as one flow:

1. **Route protection** (`src/lib/supabase/middleware.ts`): a `PUBLIC_PATHS` allowlist gates every route. Any path not in the list requires a logged-in Supabase user or the middleware redirects to `/login`. Update this list when adding new pages that should (or shouldn't) require auth.
2. **Two signup paths**, both call `supabase.auth.signUp()` then do additional writes:
   - Regular member (`src/app/signup/page.tsx`): after auth signup, inserts directly into the `profiles` table with `status: "pending"`, `base_role: "user"`, and a `church_id` picked via `ChurchCombobox` (searches the `churches` table by code/name).
   - Church admin (`src/app/admin-signup/page.tsx`): after auth signup, calls the Postgres RPC `apply_church_registration(p_church_name, p_name, p_phone)` — this function is defined in the Supabase project itself, not in this repo, so its logic isn't grep-able here.
3. **Status-based redirect after login** (`src/app/login/page.tsx`): after `signInWithPassword`, the user's `profiles.status` (`pending` | `approved` | `rejected`) is looked up and mapped via `STATUS_REDIRECT` to `/pending-approval`, `/feed`, or `/rejected`.
4. Separately, church admin registrations have their own approval state reflected by `/admin-pending-approval` (platform-operator approval of the church itself, distinct from per-user approval).

### Data model (`src/types/db.ts`)

- `Church { id, code, name }`
- `Profile { id, church_id, name, phone, base_role, status }` where `status` is `ProfileStatus = "pending" | "approved" | "rejected"`

There are no local migrations — schema, RLS policies, and RPC functions live in the Supabase project directly.

### Validation

Shared client-side validation constants live in `src/lib/validation.ts` (`EMAIL_REGEX`, `MIN_PASSWORD_LENGTH`); both signup forms use them for identical validation rules.

### Styling

Tailwind CSS; UI copy is in Korean. Components follow a consistent inline-Tailwind style with no shared design system beyond Tailwind config.
