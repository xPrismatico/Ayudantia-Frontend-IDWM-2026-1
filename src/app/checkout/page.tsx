import { Metadata } from "next";

import { CheckoutView } from "@/views/checkout/checkout-view";

export const metadata: Metadata = {
  title: "Checkout | Tienda UCN",
};

export default function CheckoutPage() {
  return (
    <main className="min-h-[80vh] bg-slate-50 py-8">
      <CheckoutView />
    </main>
  );
}
