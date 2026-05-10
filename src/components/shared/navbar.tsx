import Link from "next/link";

import { Button } from "@/components/ui";

export default function Navbar() {
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

        <nav className="flex gap-4">
          <Button
            asChild
            variant="secondary"
            className="border-none bg-blue-500 text-white hover:bg-blue-700 hover:text-white"
          >
            <Link href="/products">Catálogo</Link>
          </Button>

          <Button
            asChild
            variant="secondary"
            className="border-none bg-blue-500 text-white hover:bg-blue-700 hover:text-white"
          >
            <Link href="/login">Ingresar</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
