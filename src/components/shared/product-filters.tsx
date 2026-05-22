import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Las constantes que no dependen del componente van por fuera para no recrearse en cada render
//TODO: PR a backend solicitando endpoint que exponga categorías y marcas para no hardcodear estos filtros rápidos
const QUICK_FILTERS = ["Notebooks", "Periféricos", "Componentes", "Asus", "Apple", "Monitores"];

interface ProductFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function ProductFilters({ searchTerm, onSearchChange }: ProductFiltersProps) {
  const handleQuickFilter = (filter: string) => {
    // Si cliquea el filtro que ya está activo, lo limpia. Si no, lo aplica.
    onSearchChange(searchTerm.toLowerCase() === filter.toLowerCase() ? "" : filter);
  };

  return (
    <div className="space-y-4">
      {/* Barra de Búsqueda */}
      <div className="w-full md:w-1/3">
        <Input
          type="search"
          placeholder="Buscar productos, marcas o categorías..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-white"
        />
      </div>

      {/* Filtros Rápidos (Pills) */}
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

        {QUICK_FILTERS.map((filter) => {
          const isActive = searchTerm.toLowerCase() === filter.toLowerCase();
          return (
            <Button
              key={filter}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => handleQuickFilter(filter)}
              className="h-8 rounded-full"
            >
              {filter}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
