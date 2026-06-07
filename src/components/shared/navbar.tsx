"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/shared/logout-button";

export default function Navbar() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && !!session?.accessToken;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-blue-600 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-white transition-colors hover:text-blue-100"
        >
          Tienda UCN
        </Link>

        {/* Navegación Principal */}
        <nav className="flex items-center gap-4">
          <Button
            asChild
            variant="secondary"
            className="border-none bg-blue-500 text-white hover:bg-blue-700 hover:text-white"
          >
            <Link href="/products">Catálogo</Link>
          </Button>

          {/* Renderizado Condicional basado en el estado de autenticación */}
          {isAuthenticated ? (
            <LogoutButton token={session.accessToken!} />
          ) : (
            <Button
              asChild
              variant="secondary"
              className="border-none bg-blue-500 text-white hover:bg-blue-700 hover:text-white"
            >
              <Link href="/login">Ingresar</Link>
            </Button>
          )}

          {/*TO DO: Visualizacion condicional para administradores en Ayudantia 5*/}
          <Button
            asChild
            variant="secondary"
            className="border-none bg-blue-500 text-white hover:bg-blue-700 hover:text-white"
          >
            <Link href="/admin/products">Administracion</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
