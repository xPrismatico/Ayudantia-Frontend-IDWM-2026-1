"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/shared";
import { ProductFilters } from "@/components/shared/product-filters";
import { ProductGridSkeleton } from "@/components/shared/product-grid-skeleton";
import { useDebounce } from "@/hooks/useDebounce";
import { useProducts } from "@/hooks/useProducts";

export default function ProductsView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialPage = Number(searchParams.get("PageNumber")) || 1;
  const initialSearch = searchParams.get("SearchTerm") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);
  const pageSize = 8;

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("PageNumber", page.toString());
    params.set("PageSize", pageSize.toString());
    if (debouncedSearchTerm) {
      params.set("SearchTerm", debouncedSearchTerm);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedSearchTerm, page, pathname, router]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  const { data, isLoading, isError } = useProducts({
    pageNumber: page,
    pageSize: pageSize,
    searchTerm: debouncedSearchTerm || undefined,
  });

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <header className="mb-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Nuestros Productos</h1>
          <p className="text-slate-600">Explora el catálogo disponible desde el backend.</p>
        </div>

        {/* 💡 AQUÍ INYECTAMOS EL COMPONENTE SEPARADO */}
        <ProductFilters searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </header>

      {/* Control de Flujo */}
      {isError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 py-10 text-center">
          <p className="font-medium text-red-600">Ocurrió un error al conectar con la API.</p>
        </div>
      ) : isLoading ? (
        <ProductGridSkeleton count={8} />
      ) : data?.products && data.products.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-16 text-center">
          <h3 className="text-lg font-bold text-slate-900">No encontramos resultados</h3>
          <p className="mt-1 text-slate-500">
            No hay productos que coincidan con &#34;{searchTerm}&#34;.
          </p>
        </div>
      ) : (
        <ProductGrid products={data?.products || []} />
      )}

      {/* Paginación */}
      {data && data.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Anterior
          </Button>
          <span className="text-sm font-medium text-slate-700">
            Página {data.currentPage} de {data.totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
            disabled={page === data.totalPages}
          >
            Siguiente
          </Button>
        </div>
      )}
    </div>
  );
}
