# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # tsc -b && vite build
npm run lint     # ESLint on all *.ts/*.tsx files
npm run preview  # Preview production build locally
```

No test runner is configured yet.

## Architecture

React 19 + TypeScript 6 + Vite 8 + Tailwind CSS v4 component library. ES module package (`"type": "module"`), private (not published to npm yet).

**Entry points:**
- `index.html` → `src/main.tsx` → `src/App.tsx` — browser dev/demo app for developing components visually
- `vite.config.ts` — Vite config with `@vitejs/plugin-react` and `@tailwindcss/vite`

**TypeScript:** Strict mode with `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`. Bundler module resolution. Two tsconfig split: `tsconfig.app.json` (src files) and `tsconfig.node.json` (config/build files).

**ESLint:** Flat config (`eslint.config.js`) with TypeScript ESLint recommended + React Hooks + React Refresh rules. Only lints `**/*.{ts,tsx}`.

## Component library structure

The library is split into three categories:

```
src/
├── types/                        # All shared TypeScript interfaces/types
│   ├── Button.types.ts
│   ├── Badge.types.ts
│   ├── Card.types.ts
│   └── index.ts
├── components/
│   ├── primitive/                # Base components — no animation
│   ├── animated-framer/          # Framer Motion animated components
│   └── animated-gsap/            # GSAP animated components
└── index.css                     # Tailwind entry + design tokens
```

## Styling conventions

- **Tailwind CSS v4** for all layout, spacing, and typography utilities.
- **Design tokens** are CSS custom properties declared in `src/index.css` (`:root` and `.dark / [data-theme="dark"]`). Dark mode works automatically — no extra logic needed in components.
- Use `[var(--token)]` arbitrary value syntax in Tailwind classes for brand colors and token-based values (e.g. `bg-[var(--color-accent)]`, `text-[var(--color-text-primary)]`). In Tailwind v4, the shorthand `(--token)` also works (e.g. `border-(--color-border)`).
- **No CSS modules.** All styles live in Tailwind class strings.
- **`class-variance-authority` (cva)** handles all variant/size logic. Pass Tailwind class strings directly into cva — not module class references.
- Focus rings must use `focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2` on every interactive element.

## Component conventions

- Each component lives in its own folder: `components/<category>/<Name>/`
- Files per component: `<Name>.tsx`, `index.ts`
- Types live in `src/types/<Name>.types.ts`, not inside the component folder
- The component `index.ts` re-exports both the component and its types
- `src/components/<category>/index.ts` is the barrel for that category
- Props interfaces extend the relevant HTML element's attributes (`ButtonHTMLAttributes`, `HTMLAttributes`, etc.)
