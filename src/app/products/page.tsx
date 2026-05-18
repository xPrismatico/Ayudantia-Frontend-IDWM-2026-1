import { Suspense } from "react";

import { ProductGridSkeleton } from "@/components/shared/product-grid-skeleton";
import ProductsView from "@/views/products/products-view";

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
