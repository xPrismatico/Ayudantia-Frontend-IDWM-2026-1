import axios from "axios";
import { getSession, signOut } from "next-auth/react";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de Peticiones para agregar el token de autenticación automáticamente en cada request
apiClient.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  return config;
});

// Interceptor de Respuestas para manejar errores globales (Ej: Token expirado, revocado, etc.)
apiClient.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa (2xx), la dejamos pasar normal
    return response;
  },
  async (error) => {
    // Si el backend nos arroja un 401 Unauthorized (Token expirado, inválido o en blacklist)
    if (error.response?.status === 401) {
      console.warn("Sesión expirada o token revocado por el backend.");

      // Destruimos la sesión frontend de NextAuth y forzamos re-login
      // Esto limpiará la cookie segura y redirigirá al usuario
      // Verificamos window para asegurarnos de que se ejecuta solo del lado del cliente
      if (typeof window !== "undefined") {
        await signOut({ callbackUrl: "/login?session_expired=true" });
      }
    }

    // Rechazamos la promesa para que el hook (TanStack) sepa que falló o los try/catch lo manejen
    return Promise.reject(error);
  }
);
