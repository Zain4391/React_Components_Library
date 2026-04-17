# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server with HMR — opens the component showcase
npm run build    # tsc -b && vite build
npm run lint     # ESLint on all *.ts/*.tsx files
npm run preview  # Preview production build locally
```

No test runner is configured yet.

## Architecture

React 19 + TypeScript 6 + Vite 8 + Tailwind CSS v4 component library. ES module package (`"type": "module"`), private (not published to npm yet).

**Entry points:**
- `index.html` → `src/main.tsx` → `src/App.tsx` — component showcase (dev only); all components are demonstrated here
- `vite.config.ts` — Vite config with `@vitejs/plugin-react` and `@tailwindcss/vite`

**TypeScript:** Strict mode with `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`. Bundler module resolution. Two tsconfig split: `tsconfig.app.json` (src files) and `tsconfig.node.json` (config/build files).

**ESLint:** Flat config (`eslint.config.js`) with TypeScript ESLint recommended + React Hooks + React Refresh rules. Only lints `**/*.{ts,tsx}`.

## Component library structure

The library is split into three categories:

```
src/
├── types/                        # All shared TypeScript interfaces/types (one file per component)
├── components/
│   ├── primitive/                # Base components — no animation
│   │   ├── Button, Badge, Card, Avatar, Divider, Input, Textarea, Tooltip
│   │   └── index.ts              # barrel re-export for all primitives
│   ├── composite/                # Multi-part interactive components
│   │   └── Accordion, Dropdown, Modal, Tabs, Toast
│   ├── animated-framer/          # Framer Motion animated components (planned)
│   └── animated-gsap/            # GSAP animated components (planned)
├── App.tsx                       # Component showcase — demonstrates every component
└── index.css                     # Tailwind entry (@import "tailwindcss") + all design tokens
```

### Component file convention

Each component lives in `components/<category>/<Name>/`:
- `<Name>.tsx` — component implementation
- `index.ts` — re-exports component + its types (primitives have this; composites currently import directly from the `.tsx` file)

Types live in `src/types/<Name>.types.ts`, never inside the component folder. `src/types/index.ts` is the types barrel.

Props interfaces always extend the relevant HTML element attributes (`ButtonHTMLAttributes`, `HTMLAttributes<HTMLDivElement>`, etc.) so `className`, `style`, `data-*`, and event handlers pass through automatically.

## Styling conventions

- **Tailwind CSS v4** for all layout, spacing, and typography utilities.
- **Design tokens** are CSS custom properties in `src/index.css` (`:root` for light, `.dark / [data-theme="dark"]` for dark). Dark mode is toggled by adding the `dark` class to `<html>` — no JS logic needed inside components.
- Use `[var(--token)]` arbitrary-value syntax for brand colors and token-based values: `bg-[var(--color-accent)]`, `text-[var(--color-text-primary)]`. Tailwind v4 shorthand `(--token)` also works: `border-(--color-border)`.
- **No CSS modules.** All styles are Tailwind class strings.
- **`class-variance-authority` (cva)** handles all variant/size logic. Pass Tailwind class strings directly — not CSS module references.
- Use plain Tailwind text-size classes (`text-xs`, `text-sm`, `text-base`, `text-lg`) rather than `text-[var(--text-*)]` — the token values match Tailwind's scale exactly and arbitrary CSS-variable text classes are ambiguous between color and size in v4.
- Duration values: use `duration-[120ms]` / `duration-[200ms]` rather than `duration-[var(--duration-fast)]`.
- Focus rings: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2` on every interactive element.
- Disabled states: `disabled:opacity-[0.45] disabled:pointer-events-none` (or `opacity-[0.45] pointer-events-none` applied conditionally for non-button elements).

## Key design decisions

- **Accordion / Tabs** are value-based (each item has a `value: string`), not index-based. `defaultOpen`/`defaultValue` accept strings.
- **Tooltip** keeps its content div always in the DOM and toggles `opacity-0/opacity-100` so the CSS transition fires on both show and hide. It uses `cloneElement` to inject `aria-describedby` onto the trigger child.
- **Input / Textarea** generate a stable `${id}-desc` id for the helper/error span and wire it via `aria-describedby`.
- **Avatar** uses `useState` to track image load errors and falls back to initials → SVG silhouette automatically.
- **Modal** uses the native `<dialog>` element with `showModal()` / `close()` for built-in focus trapping and backdrop.
