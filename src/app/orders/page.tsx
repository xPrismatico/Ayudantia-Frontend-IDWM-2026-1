import { Metadata } from "next";
import { Suspense } from "react";

import { OrdersView } from "@/views/orders/orders-view";

export const metadata: Metadata = {
  title: "Mis Compras | Tienda UCN",
};

export default function OrdersPage() {
  return (
    <main className="min-h-[80vh] bg-slate-50 py-8">
      <Suspense fallback={<div className="py-20 text-center">Cargando compras...</div>}>
        <OrdersView />
      </Suspense>
    </main>
  );
}
