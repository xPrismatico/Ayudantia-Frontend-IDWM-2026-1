import { Metadata } from "next";

import { OrderDetailView } from "@/views/orders/order-detail-view";

export const metadata: Metadata = {
  title: "Detalle de Orden | Tienda UCN",
};

interface Props {
  params: Promise<{ code: string }>;
}

export default async function OrderDetailPage({ params }: Props) {
  const { code } = await params;

  return (
    <main className="min-h-[80vh] bg-slate-50 py-8">
      <OrderDetailView orderCode={code} />
    </main>
  );
}
