"use client";

// Obligatorio para atrapar errores en el cliente
import { useEffect } from "react";

import { Button } from "@/components/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Aquí el error se podría enviar a un servicio de monitoreo
    console.error("Error capturado por Next.js:", error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4 text-center">
      <h2 className="text-3xl font-bold text-slate-900">¡Ups! Algo salió mal.</h2>
      <p className="text-slate-600">
        Ha ocurrido un error inesperado al intentar cargar esta sección.
      </p>
      {/* La función reset() intenta volver a renderizar el componente que falló */}
      <Button onClick={() => reset()} className="bg-blue-600 hover:bg-blue-700">
        Intentar de nuevo
      </Button>
    </div>
  );
}
