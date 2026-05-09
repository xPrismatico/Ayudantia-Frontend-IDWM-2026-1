// src/views/products/ProductsPage.tsx

import ProductGrid from "@/components/ui/ProductGrid";
import { mockProducts } from "@/data/mockProducts";

export default function ProductsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Nuestros Productos</h1>
        <p className="text-slate-600">Explora el catálogo disponible.</p>
      </div>
      
      <ProductGrid products={mockProducts} />
    </div>
  );
}