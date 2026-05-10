# Tienda UCN — Frontend

Cliente web del taller de Introducción al Desarrollo Web/Móvil (UCN). Construido con Next.js 15 y React 19.

## Stack

- **Next.js 15** (App Router, Turbopack)
- **React 19**
- **TypeScript** (strict, ES2022)
- **Tailwind CSS v4**
- **Shadcn UI**
- **Lucide React** (iconos)
- **Sonner** (notificaciones)
- **Zod** + **`@t3-oss/env-nextjs`** (validación de variables de entorno)
- **ESLint** + **Prettier**
- **Husky** + **commitlint** + **lint-staged**

## Requisitos

- Node.js 20+ y npm.
- Backend del taller en ejecución para consumir la API ([repositorio](https://github.com/carlos44440/Taller-Backend-IDWM-1erSem-2026)).

## Quick start

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

| Variable              | Ámbito | Descripción                                                | Ejemplo dev             |
| --------------------- | ------ | ---------------------------------------------------------- | ----------------------- |
| `NEXT_PUBLIC_API_URL` | client | URL base del API (debe ser una URL válida).                | `http://localhost:5000` |
| `DOMAIN`              | server | Hostname permitido por `next/image` en HTTP (sin esquema). | `localhost`             |

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

## Backend y autor

- Backend del taller: <https://github.com/carlos44440/Taller-Backend-IDWM-1erSem-2026>.
- Autor: Samuel Fuentes — <samuel.fuentes@alumnos.ucn.cl>.
