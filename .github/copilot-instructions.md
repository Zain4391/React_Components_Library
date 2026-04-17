# Project Guidelines

## Code Style & Formatting

- **Tech Stack:** React 19 + TypeScript 6 + Vite 8 + Tailwind CSS v4.
- **Components:** Export from `src/components/`. Use barrel re-exports (`index.ts`). Types go in `src/types/<Name>.types.ts` and extend relevant HTML element attributes (e.g., `ButtonHTMLAttributes`).
- **Styling:** **No CSS modules.** Use Tailwind CSS v4. Use design tokens from `src/index.css` via arbitrary values (e.g., `bg-[var(--color-accent)]`) or v4 shorthand (`border-(--color-border)`).
- **Variants:** Use `class-variance-authority` (cva) for size and variant logic.
- **Design Decisions:** Value-based (not index-based) Accordion/Tabs. Tooltips use CSS opacity transitions. Inputs/Textareas use generated IDs wired via `aria-describedby`.
- _See [CLAUDE.md](../CLAUDE.md) for detailed styling conventions (focus rings, disabled states, etc.) and architecture notes._

## Architecture

- Private ES module package (`"type": "module"`).
- `index.html` → `src/main.tsx` → `src/App.tsx` serves as the component showcase (dev only).
- Split TypeScript configs: `tsconfig.app.json` (src files) and `tsconfig.node.json` (config/build files).
- Strict ESLint flat config (`eslint.config.js`) applied to `**/*.{ts,tsx}`.

## Build and Test

- **Dev Server:** `npm run dev` (Starts Vite with HMR and opens the component showcase)
- **Build:** `npm run build` (Runs `tsc -b && vite build`)
- **Lint:** `npm run lint` (ESLint on all TS/TSX files)
- **Preview:** `npm run preview`
- _Note: No test runner is currently configured._
