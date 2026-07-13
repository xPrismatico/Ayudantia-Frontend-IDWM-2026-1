"use client";

import { ArrowLeft, Calendar, Download, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { formatPriceCLP } from "@/lib/currency";
import { generateInvoicePDF } from "@/lib/pdf-generator";
import { Button } from "@/components/ui/button";
import { useOrderDetail } from "@/hooks/useOrders";

export function OrderDetailView({ orderCode }: { orderCode: string }) {
  const { data: order, isLoading, isError } = useOrderDetail(orderCode);

  if (isLoading) {
    return <div className="animate-pulse py-20 text-center">Cargando detalles de tu orden...</div>;
  }

  if (isError || !order) {
    return (
      <div className="py-20 text-center text-red-500">Error al cargar la orden o no existe.</div>
    );
  }

  const formattedDate = new Date(order.transactionDate).toLocaleString("es-CL");

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        href="/orders"
        className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a mis pedidos
      </Link>

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Pedido {order.code}</h1>
          <p className="mt-1 flex items-center text-slate-500">
            <Calendar className="mr-2 h-4 w-4" />
            {formattedDate}
          </p>
        </div>

        {/* 💡 Botón que gatilla la creación del PDF */}
        <Button
          onClick={() => generateInvoicePDF(order)}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Download className="mr-2 h-4 w-4" />
          Descargar Boleta PDF
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="border-b bg-slate-50 p-6">
          <h2 className="flex items-center font-semibold text-slate-800">
            <Package className="mr-2 h-5 w-5" /> Productos de esta orden
          </h2>
        </div>

        <ul className="divide-y p-6">
          {order.items.map((item, index) => (
            <li key={index} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded bg-slate-100">
                  <Image
                    src={item.mainImageURL}
                    alt={item.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-slate-900">{item.productName}</p>
                  <p className="text-sm text-slate-500">
                    Cantidad: {item.quantity} x {formatPriceCLP(item.unitPriceAtMoment)}
                  </p>
                </div>
              </div>
              <span className="font-bold text-slate-900">{formatPriceCLP(item.subtotalPrice)}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between border-t bg-slate-50 p-6">
          <span className="text-lg font-bold text-slate-900">Total Pagado:</span>
          <span className="text-2xl font-extrabold text-blue-600">
            {formatPriceCLP(order.totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}
