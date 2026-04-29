# AGENTS.md — aria-ng-ui

Angular workspace (v21) building a shadcn-style accessible component library.

## Commands

- `ng serve` — dev server for the demo app (port 4200)
- `ng build ui` — build the library to `dist/ui/`
- `ng build demo` — build the demo app
- `ng test ui` — run library tests (Vitest)
- `ng test demo` — run demo tests (Vitest)
- `npx prettier --check .` / `npx prettier --write .` — format check/write

No standalone lint command. Formatting is handled by Prettier.

## Project structure

- `projects/ui/` — the `@aria-ng/ui` library, built with ng-packagr
- `projects/demo/` — showcase app that imports the library via TS path alias

### Library conventions

- **Entry point**: `projects/ui/src/public-api.ts` — barrel-export each component
- **Component layout**: `projects/ui/src/lib/<component>/index.ts` + directive + variants file
- **Directive-first**: attribute selectors like `[uiButton]`, not element selectors
- **Standalone**: all directives/components are `standalone: true`
- **Signals API**: use `input<T>()` and `computed()` — no `@Input()` decorators

### Styling

- Tailwind CSS **v4** (not v3) via `@tailwindcss/postcss` — no `tailwind.config.*` file
- Theme tokens defined with `@theme {}` in `projects/ui/src/lib/styles/theme.css`
- Demo app imports the theme via relative CSS `@import`

### Path alias

`@aria-ng/ui` maps to `./projects/ui/src/public-api.ts` (configured in root `tsconfig.json` paths).

## Testing

- Test runner: **Vitest** (not Karma/Jasmine). Types are `vitest/globals` — no need to import `describe`/`it`/`expect`.
- No `vitest.config.*` file; the Angular builder handles configuration via `tsconfig.spec.json`.
- Test files follow `*.spec.ts` convention.
- No E2E tests yet.

## Code style

- Single quotes, 2-space indent, print width 100
- HTML uses Angular parser for Prettier
- `strict: true` + strict Angular compiler options enabled
- No comments in production code unless explicitly requested
