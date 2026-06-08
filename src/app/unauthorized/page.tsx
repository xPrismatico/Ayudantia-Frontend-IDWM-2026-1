import { ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 rounded-full bg-red-50 p-6">
        <ShieldAlert className="h-16 w-16 text-red-500" />
      </div>

      <h1 className="mb-2 text-3xl font-bold text-slate-900">Acceso Restringido</h1>
      <p className="mb-8 max-w-md text-slate-600">
        No tienes los permisos necesarios para acceder a esta sección. Esta área está reservada.
      </p>

      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Inicio
          </Link>
        </Button>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/products">Ir al Catálogo</Link>
        </Button>
      </div>
    </div>
  );
}
