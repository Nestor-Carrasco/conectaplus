# Reglas del proyecto

Estas reglas son obligatorias para cualquier agente que trabaje en este workspace. Si una instrucción del usuario entra en conflicto con ellas, pide confirmación explícita antes de actuar.

## 1. Los commits los hace únicamente el usuario

- **Nunca** ejecutes `git commit`, `git commit --amend`, `git rebase`, `git merge`, `git push`, `git reset` ni ninguna operación que cree o reescriba historial.
- No ejecutes `git add` salvo que el usuario lo pida explícitamente.
- Puedes usar comandos de solo lectura como `git status`, `git diff`, `git log` y `git show`.
- Si el usuario pide "haz el commit" o "dame el commit", entrega los comandos exactos y el mensaje propuesto, pero **no los ejecutes**. El usuario decide y ejecuta.

## 2. No editar código sin autorización explícita

- No crees, edites, borres ni renombres archivos de código, configuración, tests o documentación sin una orden explícita del usuario.
- Si detectas un bug, una mejora o una mala práctica, explica el problema y propone el cambio; espera aprobación antes de tocar archivos.
- Una petición como "revisa" o "analiza" es solo de lectura: no implica permiso para modificar.
- Una orden concreta autoriza solo ese cambio. Si detectas otros problemas, repórtalos y pregunta antes de ampliar el alcance.
- Antes de editar, indica qué archivos vas a modificar y qué cambio propones, y pide confirmación.

## 3. Comandos que puedes ejecutar sin preguntar

Puedes ejecutar comandos de verificación que no alteren el código fuente ni el historial, por ejemplo:

- `git status`, `git diff`, `git log`, `git show`
- `pnpm run test`, `pnpm run lint`, `pnpm run typecheck`, `pnpm run format:check`
- `pnpm run build` (solo genera `dist/`, que está ignorado por Git)
- `pnpm audit`, `pnpm audit --prod`, `pnpm view <paquete> version` (solo lectura; consultan el registro)

Pregunta antes de ejecutar comandos que modifiquen archivos (por ejemplo `pnpm run format`, `eslint --fix`, `prettier --write` o instalaciones de dependencias).

## 4. Tamaño y alcance de los pull requests

- **Líneas modificadas:** mantén cada PR por debajo de **500 líneas de código** (adiciones + eliminaciones).
- **Archivos modificados:** mantén cada PR por debajo de **10 archivos de código**.
- **Responsabilidad única:** cada PR debe hacer **una sola cosa** y estar pensado para ser fácil de entender y revisar.

Si un cambio supera estos límites, divídelo en PRs más pequeños y coherentes antes de continuar.

## 5. Requerimientos del producto

El producto es un portal de planes y soporte para una empresa de telecomunicaciones. Debe incluir:

- Catálogo de planes con precios, datos y beneficios.
- Filtros por precio, GB y tipo de plan.
- Simulador de costos según líneas, meses de contrato y descuentos.
- Comparador de planes y favoritos.
- Artículos de soporte con búsqueda.
- Área privada con login, roles de cliente y administrador.
- Panel de administración para crear y editar planes y artículos.

El desarrollo es incremental por niveles. Un nivel se considera terminado solo cuando lint, typecheck, tests y build pasan, y la funcionalidad cumple los criterios de accesibilidad y rendimiento.

### Roadmap por niveles

| Nivel                       | Alcance                           | Entregables y conceptos                                                                                                                                                                                                                            |
| --------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0. Base                     | Proyecto y red de seguridad       | Vite + React + TypeScript estricto, Tailwind, ESLint, Prettier, pnpm y CI con lint y tests; Vitest, React Testing Library, jest-dom y user-event; componente `Badge` con TDD.                                                                      |
| 1. Catálogo estático        | Lista de planes con datos locales | `Card`, `CardHeader`, `PlanCard` y `Button` con variantes tipadas; composición, listas con `key`, HTML semántico y consultas por rol.                                                                                                              |
| 2. Filtros y simulador      | Búsqueda y cálculo de precios     | Formularios controlados, `useState`, `useReducer`, `useMemo` y `useCallback`; función pura de cálculo con casos borde; tests de interacción.                                                                                                       |
| 3. Hooks y contexto         | Estado compartido y utilidades    | `useLocalStorage`, `useDebounce`, contexto de comparación, tema claro/oscuro, `useRef` para foco y `useEffect` para el título; tests con `renderHook` y providers.                                                                                 |
| 4. API REST                 | Datos remotos y estados de red    | MSW o json-server, búsqueda, paginación y favoritos; TanStack Query, caché, `staleTime`, invalidación y mutaciones optimistas; tests de éxito, error 500, respuesta lenta y lista vacía.                                                           |
| 5. Navegación y rendimiento | Rutas y optimización              | React Router, filtros en la URL, `React.lazy`, `Suspense`, code splitting, `React.memo` y optimización de imágenes; medición con React Profiler y Lighthouse.                                                                                      |
| 6. Sitio público            | Contenido estático e islas        | Astro con islas React, artículos estáticos, buscador, comparador y simulador como islas; SSG/SSR, SEO técnico, sitemap, Open Graph, Pagefind/Algolia/OpenSearch, Core Web Vitals, Playwright y despliegue en S3 + CloudFront.                      |
| 7. Accesibilidad            | Interacción sin barreras          | Modal accesible con foco atrapado y Escape, combobox con teclado y formulario multipaso con errores anunciados; WCAG, ARIA, axe y revisión manual solo con teclado.                                                                                |
| 8. Backend y auth           | API y panel privado               | Lambda + API Gateway + DynamoDB, Terraform, CloudWatch, Cognito con grupos cliente/admin, rutas protegidas y CRUD de planes/artículos; tests con `aws-sdk-client-mock`, DynamoDB Local, claims simulados y Playwright; CI/CD y Docker multi-stage. |

## 6. Stack tecnológico

### Frontend

- React + TypeScript en modo `strict`, Vite y Tailwind CSS.
- React Router para navegación y TanStack Query para datos remotos.
- Astro con islas React para el sitio público.
- MSW para simular APIs en desarrollo y tests.
- React Hook Form + Zod para formularios y validación.
- Storybook para documentar componentes y mantener consistencia visual.
- Opcionales según el alcance: Zustand para estado global simple, Next.js/React Server Components como alternativa a Astro, CMS headless (Strapi, Contentful o Sanity), i18n y feature flags.

### Testing

- Vitest, React Testing Library, jest-dom, user-event y `renderHook`.
- MSW para integración, Playwright para E2E, axe para accesibilidad y Lighthouse CI para rendimiento.
- `aws-sdk-client-mock`, DynamoDB Local o Testcontainers para el backend.

### Backend y cloud

- Node.js + TypeScript, AWS Lambda y API Gateway.
- DynamoDB con diseño de claves, índices secundarios y patrones de acceso.
- Cognito o SSO para autenticación y autorización por grupos.
- S3 + CloudFront para el sitio; CloudWatch para logs y monitoreo.
- SNS, SQS y EventBridge cuando el caso lo requiera.
- Terraform como herramienta de infraestructura como código.

### Tooling y DevOps

- pnpm, ESLint, Prettier y GitHub Actions.
- Pipelines con lint, tests unitarios y de integración, build, E2E y despliegue.
- Docker multi-stage para builds y tests locales.

## 7. Lineamientos de desarrollo

### Testing y calidad

- TDD obligatorio: escribir el test, verlo fallar, implementar lo mínimo y refactorizar.
- Muchos tests unitarios, algunos de integración y pocos E2E.
- Consultar por rol y nombre accesible; evitar selectores CSS y detalles de implementación.
- Probar casos borde: descuentos, redondeo, valores inválidos, estados de carga/error/vacío, 500 y respuestas lentas.
- Cada nivel debe quedar con lint, typecheck, tests y build en verde.

### Frontend

- Componentes reutilizables, props tipadas, composición con `children` y `key` estables.
- HTML semántico y accesibilidad WCAG: foco visible, navegación por teclado, ARIA solo cuando aporte significado.
- Formularios controlados; usar React Hook Form + Zod cuando el formulario crezca.
- Mostrar siempre estados de carga, error y vacío; usar skeletons cuando corresponda.
- Rendimiento: lazy/Suspense, code splitting, memoización medida, imágenes optimizadas y Core Web Vitals (LCP, CLS, INP).
- SEO técnico: metadatos, sitemap y Open Graph en el sitio público.
- Añadir Error Boundaries y logging en rutas y paneles críticos.
- Medir errores y rendimiento real con RUM, Sentry o CloudWatch RUM cuando esté disponible.
- Virtualizar listas largas cuando el volumen lo justifique.
- Usar feature flags para cambios riesgosos e i18n cuando el producto lo requiera.
- TypeScript estricto: evitar `any`, usar uniones discriminadas y tipos utilitarios; considerar `noUncheckedIndexedAccess`.
- Evitar class components y CSS-in-JS. Preferir `useReducer` + Context + TanStack Query antes que estado global adicional; Zustand es opcional para casos simples.
- Documentar decisiones y medir antes/después de optimizar.

### Backend y cloud

- Toda la infraestructura se define con Terraform; no hacer cambios manuales en la consola de AWS.
- Modelar DynamoDB por patrones de acceso, con claves de partición/ordenamiento e índices secundarios justificados.
- Aplicar autenticación y autorización por grupos de Cognito; no confiar en validaciones solo del frontend.
- Usar logs y métricas en CloudWatch; no registrar secretos ni datos sensibles.
- Gestionar credenciales de forma segura y no subirlas al repositorio.
- CI/CD debe ejecutar lint, tests, integración, build, E2E y despliegue.

### Diseño y legibilidad

- Cada función, hook y componente debe tener una responsabilidad clara y un motivo principal para cambiar.
- Aplicar SRP (principio de responsabilidad única), composición y bajo acoplamiento. Usar SOLID como guía cuando aporte; evitar abstracciones prematuras y herencia innecesaria.
- Mantener la complejidad ciclomática ≤ 5 en lógica de dominio (cálculos, utilidades, reducers y validaciones) y ≤ 10 en componentes y hooks. Si se mide complejidad cognitiva, el techo es 15.
- Limitar el anidamiento a 3 niveles. Evitar funciones largas (≤ 50 líneas en lógica de dominio y ≤ 80 en componentes) y archivos monolíticos (≤ 300 líneas). Las excepciones son datos estáticos, tipos, tests y configuración.
- La complejidad algorítmica lineal O(n) es deseable, no un problema. Evitar complejidad accidental O(n²) o peor cuando el tamaño de los datos pueda crecer, por ejemplo búsquedas o filtros dentro de bucles. En colecciones pequeñas y acotadas, priorizar la claridad; si hace falta un algoritmo peor que O(n log n), justificarlo y medirlo con datos representativos.
- Priorizar nombres descriptivos y código fácil de leer sobre soluciones "ingeniosas" u optimizaciones prematuras.

### Comentarios

- El código debe explicarse por sí mismo; los comentarios existen para explicar el **porqué**, no para repetir el **qué**.
- Cuando la intención no sea evidente, añadir un comentario que la explique o complemente: decisiones no obvias, supuestos, casos borde, workarounds, reglas de negocio y cualquier contexto que el código no pueda expresar. Si la decisión tiene una fuente (issue, documento o normativa), referenciarla.
- No comentar lo que el código ya dice, no dejar código comentado y no conservar comentarios desactualizados: si un cambio invalida un comentario, actualizarlo o eliminarlo en el mismo PR.
- Documentar con JSDoc/TSDoc las APIs públicas (componentes, hooks y utilidades): propósito, props/parámetros, valor de retorno y efectos secundarios.
- Mantener los comentarios en el mismo idioma que el resto del proyecto y con un formato consistente.
- Un comentario no sustituye un buen nombre ni una función bien extraída; si hace falta explicar demasiado, probablemente el código deba simplificarse.

### Seguridad

- La seguridad es un requisito no negociable; no se sacrifica por conveniencia.
- No incluir secretos, credenciales ni datos sensibles en el repositorio, logs o mensajes de error.
- Validar entradas y permisos en el backend; no confiar solo en el frontend.
- Aplicar mínimo privilegio en Cognito e IAM, y gestionar credenciales de forma segura.
- Ante cualquier duda o trade-off de seguridad, detenerse y preguntar antes de implementar.

### Auditoría de dependencias

- Antes de cada PR, el audit completo debe estar verde. El CI lo ejecuta como gate con `--audit-level=high` en pushes y PRs hacia `main` y `dev`, junto con `pnpm audit --prod`.
- Si un advisory tiene parche disponible, actualizar la dependencia en el propio PR antes de fusionar; no se ignora.
- Si no existe parche, se requiere una excepción explícita y documentada, aprobada por el usuario: identificador GHSA, motivo y fecha de caducidad. Se implementa como `--ignore <GHSA>` en el comando del CI y en local. Mientras exista, el CI mantiene visible la alerta (paso informativo que no bloquea). Al salir el parche, se revierte la excepción y se actualiza la dependencia.
- Al 2026-11-20 no hay excepciones vigentes.
- En desarrollo: ejecutar `pnpm audit` completo cuando cambien `package.json` o `pnpm-lock.yaml`, al cerrar un nivel o PR y al menos una vez por semana. Un hallazgo en dependencias de producción detiene el trabajo y se pregunta al usuario; un hallazgo solo de desarrollo sin parche se documenta, sin bloquear.
- Nunca ejecutar `pnpm audit --fix`, `pnpm update` ni overrides sin autorización explícita.

### Validación con ESLint

Estos lineamientos se validan con `pnpm run lint`.

- `complexity` cuenta `if`, `else if`, `for`, `while`, `case`, `catch`, ternarios, `&&`, `||`, `??`, optional chaining y parámetros con valor por defecto. Por eso el umbral de 5 se reserva para lógica de dominio y el de 10 para componentes y hooks.
- `pnpm run lint` usa `--max-warnings 0`, así que los `warn` también hacen fallar el comando. Si se necesita una adopción gradual, cambiar temporalmente el script o elevar los límites a `error` cuando el código esté estable.
- La complejidad cognitiva (techo 15) requiere `eslint-plugin-sonarjs` y su regla `sonarjs/cognitive-complexity`; es opcional y solo se activa si el equipo decide medirla.
- Revisar las rutas de los overrides al crear nuevas carpetas; lo importante es que la lógica de dominio quede separada de los componentes.

### Proceso

- Respetar los límites de PR de la sección 4: menos de 500 líneas, menos de 10 archivos y una sola responsabilidad.
- El usuario crea los commits y tags de cada nivel; el agente no los ejecuta.
