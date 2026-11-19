# ConectaPlus

[English](README.md) · [Español](README.es.md)

**ConectaPlus** es un proyecto de portafolio: un portal web para una empresa de telecomunicaciones, actualmente en construcción. El objetivo es que los clientes puedan explorar planes, comparar ofertas y simular costos. Está construido para demostrar prácticas modernas de ingeniería frontend: TypeScript estricto, componentes accesibles, desarrollo guiado por pruebas y puertas de calidad automatizadas en CI.

> **Estado del proyecto:** base en construcción (tooling, CI, documentación y los primeros componentes reutilizables). Las funcionalidades se añaden de forma incremental.

## Stack tecnológico

- **React 19** — librería de interfaz
- **TypeScript** — en modo estricto
- **Vite** — servidor de desarrollo y empaquetado
- **Tailwind CSS v4** — estilos
- **Vitest + React Testing Library + user-event** — pruebas
- **ESLint + Prettier** — linting y formato
- **pnpm** — gestión de dependencias
- **GitHub Actions** — CI en cada push y pull request

## Puesta en marcha

### Requisitos

- Node.js 24+
- pnpm 12+

### Instalar y ejecutar

```bash
pnpm install
pnpm run dev
```

El servidor de desarrollo arranca en la URL que aparece en la terminal.

### Comandos disponibles

| Comando                  | Descripción                                              |
| ------------------------ | -------------------------------------------------------- |
| `pnpm run dev`           | Inicia el servidor de desarrollo                         |
| `pnpm run build`         | Verifica tipos y compila para producción                 |
| `pnpm run preview`       | Previsualiza la build de producción                      |
| `pnpm run test`          | Ejecuta la suite de pruebas                              |
| `pnpm run test:coverage` | Ejecuta las pruebas con cobertura                        |
| `pnpm run lint`          | Lintea el código (cero advertencias permitidas)          |
| `pnpm run typecheck`     | Verifica tipos con TypeScript                            |
| `pnpm run format:check`  | Comprueba el formato con Prettier                        |
| `pnpm audit --prod`      | Audita las dependencias de producción en busca de fallos |

## Calidad y seguridad

Cada push y pull request hacia `main` y `dev` ejecuta el pipeline de CI, que exige:

- Lint con límites de complejidad y de tamaño de archivo y función.
- Verificación de tipos con TypeScript estricto.
- Pruebas y build de producción.
- Auditoría de seguridad de dependencias (`pnpm audit --prod` como gate bloqueante, más audit completo a severidad alta/crítica).

## Estructura del proyecto

```text
src/
  components/    Componentes de UI reutilizables (Badge, Button listos; Card, PlanCard en progreso)
  features/      Módulos por funcionalidad (catálogo de planes)
  data/          Datos estáticos de planes
  test/          Setup de pruebas y tipos del entorno
.github/
  workflows/     Pipeline de CI (lint, typecheck, tests, build, audit)
```

## Licencia

**Creative Commons Atribución-NoComercial 4.0 (CC BY-NC 4.0)**

Puedes compartir y adaptar este proyecto con fines no comerciales dando el crédito correspondiente. No se permite el uso comercial.

© 2026 Nestor-Carrasco
