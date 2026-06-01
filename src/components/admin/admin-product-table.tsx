import { Eye, Power, PowerOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ProductForAdmin } from "@/types/responses/product/admin";
import { Button } from "@/components/ui/button";

interface AdminProductTableProps {
  products: ProductForAdmin[];
  onSwitchStatus: (id: number) => void;
  isSwitching: boolean;
}

export function AdminProductTable({
  products,
  onSwitchStatus,
  isSwitching,
}: AdminProductTableProps) {
  if (!products || products.length === 0) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center rounded-lg border border-dashed text-center text-slate-500">
        <p>No se encontraron productos disponibles en la administración.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50 text-xs text-slate-700 uppercase">
          <tr>
            <th className="px-6 py-4 font-semibold">Producto</th>
            <th className="px-6 py-4 font-semibold">Precio</th>
            <th className="px-6 py-4 font-semibold">Stock</th>
            <th className="px-6 py-4 font-semibold">Estado</th>
            <th className="px-6 py-4 text-right font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {products.map((product) => {
            const isAvailable = product.available.toLowerCase() === "disponible";
            return (
              <tr key={product.id} className="transition-colors hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded border border-slate-200 bg-slate-100">
                      <Image
                        src={product.mainImageURL || "https://placehold.co/100?text=No+Img"}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <span className="font-medium text-slate-900">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">{product.price}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      product.stock > 0 ? "bg-blue-50 text-blue-700" : "bg-red-50 text-red-700"
                    }`}
                  >
                    {product.stock} un.
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      isAvailable ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {product.available}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button asChild variant="outline" size="icon" className="h-8 w-8">
                      <Link href={`/admin/products/${product.id}`} title="Ver Detalle">
                        <Eye className="h-4 w-4 text-slate-600" />
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onSwitchStatus(product.id)}
                      disabled={isSwitching}
                      title={isAvailable ? "Desactivar Producto" : "Activar Producto"}
                    >
                      {isAvailable ? (
                        <PowerOff className="h-4 w-4 text-red-600" />
                      ) : (
                        <Power className="h-4 w-4 text-emerald-600" />
                      )}
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
