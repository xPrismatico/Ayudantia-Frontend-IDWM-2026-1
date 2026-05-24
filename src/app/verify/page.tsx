import { Suspense } from "react";

import VerifyView from "@/views/auth/verify-view";

export default function VerifyPage() {
  return (
    // Es obligatorio usar Suspense si la vista consume useSearchParams()
    <Suspense fallback={<div className="py-10 text-center">Cargando...</div>}>
      <VerifyView />
    </Suspense>
  );
}
