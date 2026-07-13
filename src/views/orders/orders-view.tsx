"use client";

import { ChevronRight, Package, Receipt } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { formatPriceCLP } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/hooks/useOrders";

export function OrdersView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialPage = Number(searchParams.get("PageNumber")) || 1;
  const [page, setPage] = useState(initialPage);
  const pageSize = 10;

  // Actualizar URL cuando cambia la página
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("PageNumber", page.toString());
    params.set("PageSize", pageSize.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [page, pathname, router]);

  const { ordersData, isOrdersLoading, isOrdersError } = useOrders({
    pageNumber: page,
    pageSize: pageSize,
  });

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-full bg-blue-100 p-3 text-blue-600">
          <Receipt size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Mis Compras</h1>
          <p className="text-slate-500">Revisa el historial de tus pedidos anteriores.</p>
        </div>
      </div>

      {isOrdersError ? (
        <div className="rounded-xl bg-red-50 p-6 text-center text-red-600">
          Ocurrió un error al cargar tu historial de compras.
        </div>
      ) : isOrdersLoading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-slate-200" />
          ))}
        </div>
      ) : !ordersData || ordersData.orders.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-white p-12 text-center">
          <Package className="mx-auto mb-4 h-12 w-12 text-slate-300" />
          <h2 className="text-xl font-bold text-slate-900">Aún no tienes compras</h2>
          <p className="mt-2 mb-6 text-slate-500">
            Explora nuestro catálogo y realiza tu primer pedido.
          </p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/products">Ver Catálogo</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {ordersData.orders.map((order) => (
            <Link
              key={order.code}
              href={`/orders/${order.code}`}
              className="group flex flex-col justify-between rounded-xl border bg-white p-5 transition-shadow hover:shadow-md sm:flex-row sm:items-center"
            >
              <div>
                <p className="mb-1 font-bold text-slate-900">{order.code}</p>
                <p className="text-sm text-slate-500">
                  {new Date(order.transactionDate).toLocaleDateString("es-CL")} •{" "}
                  {order.items.length} {order.items.length === 1 ? "producto" : "productos"}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4 sm:mt-0 sm:justify-end">
                <span className="text-lg font-extrabold text-blue-600">
                  {formatPriceCLP(order.totalPrice)}
                </span>
                <ChevronRight className="text-slate-400 transition-colors group-hover:text-blue-600" />
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Paginación */}
      {ordersData && ordersData.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Anterior
          </Button>
          <span className="text-sm font-medium text-slate-700">
            Página {ordersData.currentPage} de {ordersData.totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(ordersData.totalPages, p + 1))}
            disabled={page === ordersData.totalPages}
          >
            Siguiente
          </Button>
        </div>
      )}
    </div>
  );
}
