# Repository Guidelines

## Project Structure & Module Organization
- `app/` contains Next.js route segments; key areas include `app/brand/` for the personal brand pages, `app/run-tracker/` for the running diary, and `app/components/` for route-scoped UI.
- `components/` holds shared React components usable across routes; keep them framework-agnostic when possible.
- `lib/` stores utilities (API clients, formatting helpers); keep side effects minimal.
- `public/` is for static assets (images, icons, favicons).
- `brand-html/` houses legacy/static brand assets; avoid mixing runtime code here.

## Build, Test, and Development Commands
- `npm run dev` — start the local Next.js dev server at `http://localhost:3000`.
- `npm run build` — produce the optimized production bundle.
- `npm start` — run the built app in production mode.
- `npm run lint` — run ESLint with the Next.js config; use this before pushing.

## Coding Style & Naming Conventions
- Language: TypeScript-first; prefer `.tsx` for components and `.ts` for utilities.
- Indentation: 2 spaces; keep lines concise and avoid trailing whitespace.
- Components: PascalCase filenames in `components/` and `app/**/components/`; hooks in `useThing.ts`.
- Functions/variables: camelCase; constants in SCREAMING_SNAKE_CASE only when truly constant.
- Styling: Tailwind CSS is preferred; keep class lists ordered by layout → spacing → color for readability.
- Imports: path aliases are not configured; use relative paths and group built-ins, third-party, then local.

## Testing Guidelines
- No automated test harness is present yet; add co-located tests as `*.test.ts` or `*.test.tsx` when introducing logic-heavy code.
- For UI flows, add Playwright or React Testing Library as needed; document new scripts in `package.json`.
- Always run `npm run lint` and verify critical pages (`/`, `/brand`, `/run-tracker`) manually after changes that touch them.

## Commit & Pull Request Guidelines
- Recent history favors short, descriptive messages (often in Chinese); keep messages imperative and scoped to a single change.
- Include context in the body when a change touches multiple areas (e.g., "brand theme + run tracker copy").
- For PRs, provide: what changed, why, manual verification steps, and screenshots/GIFs for visual updates.
- Link related issues or deployment notes (Vercel, Supabase) when relevant.

## Environment & Configuration
- Copy secrets into `.env.local` (e.g., `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`); never commit this file.
- When adding new env vars, document their purpose in `README.md` and gate usage with null checks.
