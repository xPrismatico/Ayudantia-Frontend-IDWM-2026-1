"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ProductFilters } from "@/components/shared/product-filters";
import { AdminProductTable } from "@/components/admin/admin-product-table";
import { AdminTableSkeleton } from "@/components/admin/admin-product-table-skeleton";
import { useAdminProducts, useSwitchProductStatus } from "@/hooks/useAdminProducts";
import { useDebounce } from "@/hooks/useDebounce";

export default function AdminProductsView() {
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

  const { data, isLoading, isError } = useAdminProducts({
    pageNumber: page,
    pageSize: pageSize,
    searchTerm: debouncedSearchTerm || undefined,
  });

  const { mutate: switchStatus, isPending: isSwitching } = useSwitchProductStatus();

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Gestión de Productos</h1>
          <p className="text-slate-600">Administra el catálogo y visibilidad de los productos.</p>
        </div>
        <Button asChild className="bg-emerald-600 text-white hover:bg-emerald-700">
          <Link href="/admin/products/create">
            <Plus className="mr-2 h-4 w-4" /> Nuevo Producto
          </Link>
        </Button>
      </header>

      <ProductFilters searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {isError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 py-10 text-center text-red-600">
          Ocurrió un error al conectar con la API administrativa.
        </div>
      ) : isLoading ? (
        <AdminTableSkeleton rows={pageSize} />
      ) : (
        <AdminProductTable
          products={data?.products || []}
          onSwitchStatus={switchStatus}
          isSwitching={isSwitching}
        />
      )}

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
