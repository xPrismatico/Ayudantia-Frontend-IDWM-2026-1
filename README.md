# Tienda UCN — Frontend

Cliente web del taller de Introducción al Desarrollo Web/Móvil (UCN). Construido con Next.js 15 y React 19.

## Stack

- **Core:** Next.js 15 (App Router, Turbopack), React 19, TypeScript (strict, ES2022).
- **React 19**
- **TypeScript** (strict, ES2022)
- **Estilos y UI:** Tailwind CSS v4, Shadcn UI, Lucide React (iconos), Sonner (notificaciones).
- **Cliente HTTP y Caché:** Axios, TanStack Query (Estado del servidor).
- **Estado Global:** Jotai (Estado del cliente para carrito de compras).
- **Formularios y Validación:** React Hook Form, Zod, `@t3-oss/env-nextjs` (validación estricta de variables de entorno).
- **Autenticación:** NextAuth.js (Gestión de sesiones y JWT en cookies).
- **Utilidades:** `pdf-lib` (Generación de comprobantes PDF en el navegador).
- **Calidad y Testing:** ESLint, Prettier, Playwright (Testing End-to-End).
- **Automatización (Git):** Husky, commitlint, lint-staged (Protección de commits y pushes).

## Requisitos

- Node.js 20+ y npm.
- Backend del taller en ejecución para consumir la API, debe estar en ejecución localmente para que la API responda a las peticiones y pruebas E2E ([Repositorio del Backend](https://github.com/carlos44440/Taller-Backend-IDWM-1erSem-2026)).

## Quick start (Instalación y ejecución)

1. Clonar el repositorio.

   ```bash
   git clone https://github.com/xPrismatico/Ayudantia-Frontend-IDWM-2026-1.git
   ```

2. Entrar al directorio del proyecto.

   ```bash
   cd Ayudantia-Frontend-IDWM-2026-1
   ```

3. Instalar dependencias (también activa los hooks de Husky vía `prepare`).

   ```bash
   npm install
   ```

4. Crear el archivo `.env` a partir del ejemplo versionado.

   ```bash
   cp .env.example .env
   ```

5. Editar `.env` con valores reales (ver [Variables de entorno](#variables-de-entorno)). Si quedan vacíos, el siguiente paso falla.

6. Levantar el servidor de desarrollo en `http://localhost:3000`.

   ```bash
   npm run dev
   ```

## Variables de entorno

| Variable              | Ámbito | Descripción                                                | Ejemplo dev               |
| --------------------- | ------ | ---------------------------------------------------------- | ------------------------- |
| `NEXT_PUBLIC_API_URL` | client | URL base del API (debe ser una URL válida).                | `http://localhost:5254`   |
| `DOMAIN`              | server | Hostname permitido por `next/image` en HTTP (sin esquema). | `localhost`               |
| `NEXTAUTH_URL`        | server | URL del sitio para NextAuth.                               | `http://localhost:3000`   |
| `NEXTAUTH_SECRET`     | server | Secreto de NextAuth para encriptar tokens de NextAuth.     | `openssl rand -base64 32` |

Validadas al iniciar en [`src/env.ts`](src/env.ts) con `@t3-oss/env-nextjs`. Si alguna queda vacía o malformada, `npm run dev` y `npm run build` fallan inmediatamente (fail-fast).

## Scripts

| Comando                | Acción                               |
| ---------------------- | ------------------------------------ |
| `npm run dev`          | Servidor de desarrollo (Turbopack).  |
| `npm run build`        | Build de producción.                 |
| `npm run start`        | Sirve el build de producción.        |
| `npm run lint`         | ESLint (flat config).                |
| `npm run type-check`   | `tsc --noEmit`.                      |
| `npm run format`       | Prettier sobre todo el repo (write). |
| `npm run format:check` | Prettier sobre todo el repo (check). |
| `npm run test:e2e`     | Pruebas End-to-End (Playwright).     |
| `npm run test:e2e:ui`  | Pruebas End-to-End UI (Playwright).  |

## Automatización y Git Hooks (Husky)

El proyecto cuenta con políticas estrictas de calidad aplicadas automáticamente mediante Git Hooks:

- pre-commit: Antes de cada commit, ejecuta `npm run format` y `npm run lint` para formatear (Prettier), validar (ESLint) los archivos. Además, se aplican convenciones estrictas en el mensaje del commit (commitlint). Otra opción es ejecutar `lint-staged` para formatear (Prettier) y validar (ESLint) únicamente los archivos modificados

- pre-push: Antes de subir código a una rama remota, se ejecuta automáticamente la suite de pruebas E2E (npm run test:e2e). Si las pruebas del flujo de Compra o Login fallan, el push es bloqueado.

## Backend y Autor

- Backend del taller: <https://github.com/carlos44440/Taller-Backend-IDWM-1erSem-2026>.
- Autor: Samuel Fuentes — <samuel.fuentes@alumnos.ucn.cl>.
