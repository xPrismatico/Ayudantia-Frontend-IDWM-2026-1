"use client";

import { ArrowLeft, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { formatPriceCLP } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useOrders } from "@/hooks/useOrders";

export function CheckoutView() {
  const router = useRouter();
  const { cart, isLoading: isCartLoading } = useCart();
  const { createOrder, isCreating } = useOrders();
  // Flag para saber si estamos en medio de un proceso exitoso de creación de orden
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConfirmPurchase = async () => {
    try {
      setIsSuccess(true); // Levantamos la flag de éxito "compra en proceso, no me redirecciones"
      const orderCode = await createOrder();
      // Redirigimos al detalle de la orden generada
      router.push(`/orders/${orderCode}`);
    } catch (error) {
      setIsSuccess(false); // Bajamos la flag porque hubo un error
      console.error("Error confirmando la compra", error);
    }
  };

  // Redirecciones de guardas en un useEffect (buena práctica) para evitar problemas de renderizado condicional
  useEffect(() => {
    if (!isCartLoading && (!cart || cart.items.length === 0) && !isSuccess) {
      router.replace("/cart");
    }
  }, [cart, isCartLoading, isSuccess, router]);

  // Pantalla de carga genérica mientras validamos
  if (isCartLoading || !cart || cart.items.length === 0) {
    return <div className="animate-pulse py-20 text-center">Cargando detalles del pago...</div>;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Ocultamos el Volver si ya se está Procesando la Compra */}
      {!isCreating && !isSuccess && (
        <Link
          href="/cart"
          className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Carrito
        </Link>
      )}

      <div>
        <h1 className="text-3xl font-bold text-slate-900">Confirmar Pago</h1>
        <p className="text-slate-600">Revisa los detalles finales de tu orden.</p>
      </div>

      <div className="space-y-6 rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3 border-b pb-4">
          <ShieldCheck className="h-6 w-6 text-emerald-600" />
          <span className="font-medium text-slate-800">Transacción segura encriptada</span>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-slate-900">Resumen de Productos</h3>
          <ul className="divide-y">
            {cart.items.map((item) => (
              <li key={item.productId} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded bg-slate-100">
                    <Image
                      src={item.productImageUrl}
                      alt={item.productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="line-clamp-1 text-sm font-medium text-slate-900">
                      {item.productName}
                    </p>
                    <p className="text-xs text-slate-500">Cantidad: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-semibold text-slate-900">
                  {formatPriceCLP(item.totalPrice)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-lg font-bold text-slate-900">Total Definitivo</span>
          <span className="text-3xl font-extrabold text-blue-600">
            {formatPriceCLP(cart.totalPrice)}
          </span>
        </div>

        <Button
          onClick={handleConfirmPurchase}
          disabled={isCreating || isSuccess}
          className="h-14 w-full bg-emerald-600 text-lg font-bold hover:bg-emerald-700"
        >
          {isCreating || isSuccess ? (
            <>
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              Procesando pago y generando orden...
            </>
          ) : (
            <>
              <CheckCircle2 className="mr-2 h-6 w-6" />
              Confirmar y Comprar
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
