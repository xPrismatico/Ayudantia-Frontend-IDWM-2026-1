import { useQuery } from "@tanstack/react-query";

import { catalogService } from "@/services/catalog-service";

export function useCatalogFilters() {
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () => catalogService.getActiveCategories(),
  });

  const brandsQuery = useQuery({
    queryKey: ["brands"],
    queryFn: () => catalogService.getActiveBrands(),
  });

  return {
    categories: categoriesQuery.data ?? [],
    brands: brandsQuery.data ?? [],
    isLoading: categoriesQuery.isLoading || brandsQuery.isLoading,
    isError: categoriesQuery.isError || brandsQuery.isError,
  };
}
