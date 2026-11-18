# ConectaPlus

[English](README.md) · [Español](README.es.md)

**ConectaPlus** is a portfolio project: a web portal for a telecommunications company where customers can browse mobile plans, compare offers and simulate costs. It is built to demonstrate modern frontend engineering practices — strict TypeScript, accessible components, test-driven development and automated quality gates in CI.

## Tech Stack

- **React 19** — UI library
- **TypeScript** — strict mode
- **Vite** — dev server and build tool
- **Tailwind CSS v4** — styling
- **Vitest + React Testing Library + user-event** — testing
- **ESLint + Prettier** — linting and formatting
- **pnpm** — package management
- **GitHub Actions** — CI on every push and pull request

## Getting Started

### Prerequisites

- Node.js 24+
- pnpm 12+

### Install and run

```bash
pnpm install
pnpm run dev
```

The dev server starts at the URL printed in the terminal.

### Available scripts

| Command                  | Description                                       |
| ------------------------ | ------------------------------------------------- |
| `pnpm run dev`           | Start the development server                      |
| `pnpm run build`         | Type-check and build for production               |
| `pnpm run preview`       | Preview the production build locally              |
| `pnpm run test`          | Run the test suite                                |
| `pnpm run test:coverage` | Run tests with coverage                           |
| `pnpm run lint`          | Lint the codebase (zero warnings allowed)         |
| `pnpm run typecheck`     | Type-check with TypeScript                        |
| `pnpm run format:check`  | Check formatting with Prettier                    |
| `pnpm audit --prod`      | Audit production dependencies for vulnerabilities |

## Quality and Security

Every push and pull request to `main` and `dev` runs the CI pipeline, which enforces:

- Linting with complexity and file/function size limits.
- Type checking with strict TypeScript.
- Tests and production build.
- Dependency security auditing (`pnpm audit --prod` as a blocking gate, plus a full audit at high/critical severity).

## Project Structure

```text
src/
  components/    Reusable UI components (Badge, Button, Card, PlanCard)
  features/      Feature modules (plans catalog)
  data/          Static plan data
  test/          Test setup and environment types
.github/
  workflows/     CI pipeline (lint, typecheck, tests, build, audit)
```

## License

**Creative Commons Attribution-NonCommercial 4.0 (CC BY-NC 4.0)**

You may share and adapt this project for non-commercial purposes with appropriate credit. Commercial use is not permitted.

© 2026 Nestor-Carrasco
