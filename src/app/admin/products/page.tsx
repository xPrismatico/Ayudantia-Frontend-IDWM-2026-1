import { Suspense } from "react";

import AdminProductsView from "@/views/admin/products/admin-products-view";

export default function AdminProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[50vh] items-center justify-center text-slate-500">
          <div className="animate-pulse">Cargando panel de administración...</div>
        </div>
      }
    >
      <AdminProductsView />
    </Suspense>
  );
}
