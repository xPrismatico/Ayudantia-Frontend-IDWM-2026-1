import { Metadata } from "next";
import { Suspense } from "react";

import { ProductGridSkeleton } from "@/components/shared/product-grid-skeleton";
import ProductsView from "@/views/products/products-view";

//  BUENAS PRÁCTICAS SEO: Metadata Estática para la página principal del catálogo
export const metadata: Metadata = {
  title: "Catálogo de Productos | Tienda UCN",
  description:
    "Explora nuestro catálogo completo. Encuentra la mejor tecnología, herramientas y accesorios con despacho a todo Chile.",
  keywords: ["tecnología", "tienda", "UCN", "catálogo", "compras", "ecommerce"],
  openGraph: {
    title: "Catálogo de Productos | Tienda UCN",
    description: "Explora nuestro catálogo completo. Encuentra la mejor tecnología y accesorios.",
    type: "website",
    url: "/products",
    siteName: "Tienda UCN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Catálogo de Productos | Tienda UCN",
    description: "Explora nuestro catálogo completo con despacho a todo Chile.",
  },
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <header className="mb-6 space-y-6">
            <div className="h-10 w-1/3 animate-pulse rounded bg-slate-200" />
          </header>
          <ProductGridSkeleton count={8} />
        </div>
      }
    >
      <ProductsView />
    </Suspense>
  );
}
