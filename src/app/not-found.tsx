import Link from "next/link";

import { Button } from "@/components/ui";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4 text-center">
      <h2 className="text-6xl font-extrabold text-blue-600">404</h2>
      <h3 className="text-2xl font-bold text-slate-900">Página no encontrada</h3>
      <p className="text-slate-600">
        Lo sentimos, la ruta a la que intentas acceder no existe o fue movida.
      </p>
      <Button asChild className="mt-4 bg-blue-600 hover:bg-blue-700">
        <Link href="/">Volver al inicio</Link>
      </Button>
    </div>
  );
}
