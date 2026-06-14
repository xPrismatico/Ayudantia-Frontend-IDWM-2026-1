"use client";

import { useAtomValue } from "jotai";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { cartTotalItemsAtom } from "@/store/cartAtom";

export function CartWidget() {
  // Al instanciar useCart aquí (que vivirá en la Navbar),
  // disparamos el fetch inicial del carrito para toda la app.
  const { isLoading } = useCart();

  // Obtenemos el total derivado directamente del átomo de Jotai
  const totalItems = useAtomValue(cartTotalItemsAtom);

  return (
    <Button
      asChild
      variant="ghost"
      className="relative p-2 text-white hover:bg-blue-700 hover:text-white"
    >
      <Link href="/cart" aria-label="Ver carrito de compras">
        <ShoppingCart className="h-5 w-5" />

        {/* Renderizado condicional del badge numérico */}
        {!isLoading && totalItems > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-sm ring-2 ring-blue-600">
            {totalItems > 99 ? "+99" : totalItems}
          </span>
        )}
      </Link>
    </Button>
  );
}
