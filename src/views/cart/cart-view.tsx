"use client";

import { ArrowRight, Loader2, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { CartItemCard } from "@/components/shared/cart-item-card";
import { useCart } from "@/hooks/useCart";

export function CartView() {
  const router = useRouter();
  const { cart, isLoading, clearCart, checkoutCart, isMutating } = useCart();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(price);

  // Manejar el proceso de checkout con validación de stock
  const handleCheckout = async () => {
    try {
      const result = await checkoutCart();

      const { updatedItemsNames, removedItemsNames } = result.cartUpdatesDTO;

      // Si el backend modificó el carrito por falta de stock, avisamos y detenemos la redirección
      if (updatedItemsNames.length > 0 || removedItemsNames.length > 0) {
        toast.warning(
          "Algunos productos en tu carrito fueron modificados o eliminados debido a cambios en nuestro stock. Por favor, revisa tu carrito nuevamente.",
          { duration: 6000 }
        );
        return; // Detenemos el flujo aquí
      }

      // Si el carrito está intacto, avanzamos a la pantalla de pago final
      router.push("/checkout");
    } catch (error) {
      // El error ya es manejado por handleMutationError en useCart
      console.error("Fallo al validar el checkout", error);
    }
  };

  // 1. Estado de Carga
  if (isLoading) {
    return (
      <div className="container mx-auto animate-pulse p-4 md:p-8">
        <div className="mb-8 h-8 w-1/4 rounded bg-gray-200"></div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 w-full rounded-lg bg-gray-200"></div>
            ))}
          </div>
          <div className="h-64 w-full rounded-lg bg-gray-200 lg:col-span-4"></div>
        </div>
      </div>
    );
  }

  // 2. Estado Vacío
  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center p-4 text-center md:p-8">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <ShoppingCart size={48} />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Tu carrito está vacío</h1>
        <p className="mb-8 max-w-md text-gray-500">
          Parece que aún no has agregado ningún producto. Explora nuestro catálogo y encuentra lo
          que buscas.
        </p>
        <Link
          href="/products"
          className="rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
        >
          Volver a la tienda
        </Link>
      </div>
    );
  }

  // 3. Estado con Productos
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold text-gray-900">Carrito de Compras</h1>

        <button
          onClick={() => clearCart()}
          disabled={isMutating}
          className="flex items-center text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
        >
          <Trash2 size={16} className="mr-2" />
          Vaciar carrito
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Listado de Productos (Ocupa 8 columnas en Desktop) */}
        <div className="space-y-4 lg:col-span-8">
          {cart.items.map((item) => (
            <CartItemCard key={item.productId} item={item} />
          ))}
        </div>

        {/* Resumen de Compra (Ocupa 4 columnas en Desktop) */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 rounded-xl border bg-gray-50 p-6">
            <h2 className="mb-6 text-lg font-bold text-gray-900">Resumen de la orden</h2>

            <div className="mb-6 space-y-4 border-b pb-6 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>
                  Subtotal ({cart.items.length} {cart.items.length === 1 ? "producto" : "productos"}
                  )
                </span>
                <span className="font-medium text-gray-900">{formatPrice(cart.totalPrice)}</span>
              </div>

              <div className="flex justify-between">
                <span>Costo de envío</span>
                <span className="font-medium text-green-600">Por calcular</span>
              </div>
            </div>

            <div className="mb-8 flex items-center justify-between">
              <span className="text-base font-bold text-gray-900">Total a pagar</span>
              <span className="text-2xl font-bold text-blue-600">
                {formatPrice(cart.totalPrice)}
              </span>
            </div>

            {/* Botón Checkout */}
            <button
              onClick={handleCheckout}
              disabled={isMutating}
              className="flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isMutating ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={18} />
                  Validando stock...
                </>
              ) : (
                <>
                  Proceder al Checkout
                  <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
