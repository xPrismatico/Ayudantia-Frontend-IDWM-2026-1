import { Metadata } from "next";

import { CartView } from "@/views/cart/cart-view";

export const metadata: Metadata = {
  title: "Carrito de Compras | Tienda UCN",
  description: "Revisa los productos en tu carrito antes de proceder al pago.",
};

export default function CartPage() {
  // Aquí podríamos hacer pre-fetching de datos en el servidor si quisiéramos,
  // pero como el carrito depende del usuario (cookie/token local),
  // delegarlo a la vista del cliente es la aproximación correcta en este caso.

  return (
    <main className="min-h-screen bg-white">
      <CartView />
    </main>
  );
}
