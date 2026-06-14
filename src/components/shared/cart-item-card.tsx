"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

import { CartItemDTO } from "@/types/responses/cart";
import { useCart } from "@/hooks/useCart";

interface CartItemCardProps {
  item: CartItemDTO;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeCartItem, isMutating } = useCart();

  const handleIncrease = () => {
    updateQuantity({ productId: item.productId, quantity: item.quantity + 1 });
  };

  const handleDecrease = () => {
    if (item.quantity === 1) {
      removeCartItem(item.productId);
    } else {
      updateQuantity({ productId: item.productId, quantity: item.quantity - 1 });
    }
  };

  const handleRemove = () => {
    removeCartItem(item.productId);
  };

  // Formateador de moneda (pueden extraer esto a un utils/formatters.ts)
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(price);

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border bg-white p-4 shadow-sm sm:flex-row">
      {/* Imagen del Producto */}
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
        <Image
          src={item.productImageUrl}
          alt={item.productName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 96px"
        />
      </div>

      {/* Info del Producto */}
      <div className="w-full flex-1 text-center sm:text-left">
        <h3 className="line-clamp-2 font-medium text-gray-900">{item.productName}</h3>
        <p className="mt-1 text-sm text-gray-500">{formatPrice(item.productPrice)} c/u</p>
      </div>

      {/* Controles y Total */}
      <div className="flex w-full items-center justify-between gap-6 sm:w-auto sm:justify-end">
        {/* Selector de Cantidad */}
        <div className="flex items-center rounded-md border">
          <button
            onClick={handleDecrease}
            disabled={isMutating}
            className="p-2 text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-50"
            aria-label="Disminuir cantidad"
          >
            {item.quantity === 1 ? (
              <Trash2 size={16} className="text-red-500" />
            ) : (
              <Minus size={16} />
            )}
          </button>

          <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>

          <button
            onClick={handleIncrease}
            disabled={isMutating}
            className="p-2 text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-50"
            aria-label="Aumentar cantidad"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Subtotal del Item */}
        <div className="min-w-[90px] text-right">
          <p className="font-semibold text-gray-900">{formatPrice(item.totalPrice)}</p>
        </div>

        {/* Botón de Eliminación Directa */}
        <button
          onClick={handleRemove}
          disabled={isMutating}
          className="rounded-md p-2 text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50"
          aria-label="Eliminar producto"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
