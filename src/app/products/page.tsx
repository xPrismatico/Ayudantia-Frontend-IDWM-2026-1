import type { Metadata } from "next";

import ProductsView from "@/views/products/products-view";

export const metadata: Metadata = {
  title: "Catálogo - Tienda UCN",
  description: "Explora el catálogo de productos disponibles en la Tienda UCN.",
};

export default function ProductsPage() {
  return <ProductsView />;
}
