import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { authService } from "@/services/auth-service";

interface DotNetJwtPayload extends JwtPayload {
  role?: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Faltan credenciales");
        }

        try {
          const token = await authService.login({
            email: credentials.email,
            password: credentials.password,
          });

          if (token) {
            return { id: "1", accessToken: token };
          }
          return null;
        } catch (error: unknown) {
          if (axios.isAxiosError(error) && error.response) {
            const errorMessage = error.response.data?.message || "Credenciales inválidas";
            throw new Error(errorMessage);
          }

          throw new Error("Credenciales inválidas");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.accessToken) {
        token.accessToken = user.accessToken;
        try {
          const decoded = jwtDecode<DotNetJwtPayload>(user.accessToken);

          const roleClaim =
            decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || decoded.role;
          token.role = roleClaim;
        } catch (error) {
          console.error("Error al decodificar el token JWT:", error);
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
