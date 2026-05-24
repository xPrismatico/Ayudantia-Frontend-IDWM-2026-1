"use client";

import { CatalogItem } from "@/types/responses/catalog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCatalogFilters } from "@/hooks/useCatalogFilters";

interface ProductFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

function FilterPills({
  items,
  searchTerm,
  onQuickFilter,
}: {
  items: CatalogItem[];
  searchTerm: string;
  onQuickFilter: (filter: string) => void;
}) {
  return (
    <>
      {items.map((item) => {
        const isActive = searchTerm.toLowerCase() === item.name.toLowerCase();
        return (
          <Button
            key={item.id}
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => onQuickFilter(item.name)}
            className="h-8 rounded-full"
          >
            {item.name}
          </Button>
        );
      })}
    </>
  );
}

export function ProductFilters({ searchTerm, onSearchChange }: ProductFiltersProps) {
  const { categories, brands, isLoading, isError } = useCatalogFilters();

  const handleQuickFilter = (filter: string) => {
    onSearchChange(searchTerm.toLowerCase() === filter.toLowerCase() ? "" : filter);
  };

  return (
    <div className="space-y-4">
      <div className="w-full md:w-1/3">
        <Input
          type="search"
          placeholder="Buscar productos, marcas o categorías..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-white"
        />
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm font-medium text-slate-500">Filtros rápidos:</span>
          <Button
            variant={searchTerm === "" ? "default" : "outline"}
            size="sm"
            onClick={() => onSearchChange("")}
            className="h-8 rounded-full"
          >
            Todos
          </Button>
        </div>

        {isLoading && <p className="text-sm text-slate-500">Cargando filtros…</p>}

        {!isLoading && !isError && (
          <>
            {categories.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-2 text-sm font-medium text-slate-500">Categorías:</span>
                <FilterPills
                  items={categories}
                  searchTerm={searchTerm}
                  onQuickFilter={handleQuickFilter}
                />
              </div>
            )}

            {brands.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-2 text-sm font-medium text-slate-500">Marcas:</span>
                <FilterPills
                  items={brands}
                  searchTerm={searchTerm}
                  onQuickFilter={handleQuickFilter}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
