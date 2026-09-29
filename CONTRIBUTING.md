# Contributing

## Branching

- `main` is always deployable.
- Work on short-lived branches: `feat/<scope>-<summary>`, `fix/<scope>-<summary>`, `chore/<summary>`.
- Open a pull request into `main`; CI must be green before merge.

## Commits

We use [Conventional Commits](https://www.conventionalcommits.org/). A `commit-msg` hook rejects anything else.

```
<type>(<scope>): <short summary in lower case>

[optional body]
```

Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `perf`, `test`, `ci`, `style`, `build`.
Scopes: `repo`, `ui`, `cms`, `layout`, `home`, `services`, `work`, `about`, `blog`, `contact`, `admin`, `perf`, `a11y`, `seo`, `docs`, `ci`, `deps`.

Examples: `feat(cms): add case-studies collection`, `fix(layout): trap focus in mobile menu`.

## Before you push

The `pre-commit` hook runs ESLint and Prettier on staged files. Run the full checks yourself before opening a PR:

```bash
npm run lint && npm run typecheck && npm run format:check && npm run build
```

## Code conventions

- **Server Components by default.** Add `"use client"` only to the smallest leaf that needs state, effects or browser APIs.
- **No barrel files** (`index.ts` re-exports). Import from the concrete file with the `@/` alias.
- **File names** are kebab-case (`hero-section.tsx`); components are PascalCase; hooks start with `use`.
- **Validation** with Zod, schemas colocated with the server action that uses them.
- **Styling** with Tailwind utilities and the design tokens in `src/styles/globals.css`. No inline hex colours.
- **Accessibility is not optional**: every image has alt text, every interactive element is keyboard-operable, motion respects `prefers-reduced-motion`.
- **Performance budget**: ≤ 100 kB first-load JS per public route. Prefer CSS over JS for animation; lazy-load anything heavy.

## Pull request checklist

- [ ] Lint, typecheck, format and build pass locally
- [ ] Works at 360 px, 768 px and 1280 px
- [ ] Keyboard-only walkthrough done for any new interactive UI
- [ ] New CMS fields have a description shown in the admin
- [ ] Placeholder content is tagged `[PLACEHOLDER]`
