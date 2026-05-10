import { ProductGrid } from "@/components/shared";
import { mockProducts } from "@/data/mock-products";

export default function ProductsView() {
  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Nuestros Productos</h1>
        <p className="text-slate-600">Explora el catálogo disponible.</p>
      </header>

      <ProductGrid products={mockProducts} />
    </>
  );
}
