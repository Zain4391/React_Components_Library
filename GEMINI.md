# Component Library

## Project Overview
This is a React 19 + TypeScript 6 + Vite 8 + Tailwind CSS v4 component library. It is currently set up as a private ES module package (`"type": "module"`). The library contains base primitive components and is structured to accommodate animated components (Framer Motion and GSAP).

**Key Technologies:**
- React 19
- TypeScript ~6.0.2
- Vite ^8.0.4
- Tailwind CSS ^4.2.2
- `class-variance-authority` (cva) for managing component variants.

## Building and Running

The project includes the following npm scripts:

- **`npm run dev`**: Start the Vite development server with Hot Module Replacement (HMR).
- **`npm run build`**: Type-check and build the project for production (`tsc -b && vite build`).
- **`npm run lint`**: Run ESLint on all TypeScript files (`eslint .`).
- **`npm run preview`**: Preview the production build locally.

*Note: No test runner is currently configured.*

## Architecture & File Structure

**Entry points:**
- `index.html` → `src/main.tsx` → `src/App.tsx`: Used as a browser dev/demo environment for visually developing components.
- `vite.config.ts`: Vite configuration using `@vitejs/plugin-react` and `@tailwindcss/vite`.
- `tsconfig.app.json` & `tsconfig.node.json`: Split TypeScript configurations for source files and build/config files.
- `eslint.config.js`: Flat ESLint configuration with strict React and TypeScript rules.

**Component Library Structure:**
The library is categorized as follows:
```text
src/
├── types/                        # All shared TypeScript interfaces/types (e.g., Button.types.ts)
│   └── index.ts
├── components/
│   ├── primitive/                # Base components without animations
│   ├── animated-framer/          # Framer Motion animated components
│   └── animated-gsap/            # GSAP animated components
└── index.css                     # Tailwind entry point and CSS design tokens
```

## Development Conventions

### Component Guidelines
- **Directory Structure:** Each component has its own folder (e.g., `src/components/primitive/Button/`).
- **Files:** A component folder must contain `<Name>.tsx` and an `index.ts` file that re-exports the component and its types.
- **Types:** Component prop types should be defined in `src/types/<Name>.types.ts` (not in the component folder) and must extend the relevant HTML element attributes (e.g., `ButtonHTMLAttributes`).
- **Barrel Exports:** Use `index.ts` files in category folders (`src/components/<category>/index.ts`) and the `types/` folder to manage exports.

### Styling Conventions
- **Tailwind CSS v4:** Use Tailwind for all layout, spacing, and typography utilities.
- **No CSS Modules:** All styling logic should reside in Tailwind class strings.
- **Design Tokens:** Use CSS custom properties defined in `src/index.css` for styling. Reference them in Tailwind using arbitrary value syntax (`bg-[var(--color-accent)]`) or the Tailwind v4 shorthand (`border-(--color-border)`).
- **Dark Mode:** Dark mode is handled automatically via CSS design tokens (`:root` and `.dark` / `[data-theme="dark"]`). Do not add extra logic inside components.
- **Variants:** Use `class-variance-authority` (cva) to handle size and variant logic. Pass Tailwind classes directly into `cva`.
- **Accessibility:** Ensure all interactive elements have focus rings using `focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2`.
