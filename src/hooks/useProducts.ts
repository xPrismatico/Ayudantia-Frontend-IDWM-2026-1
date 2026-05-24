import { useQuery } from "@tanstack/react-query";

import { SearchParamsDTO } from "@/types/responses/product";
import { productService } from "@/services/product-service";

export function useProducts(params: SearchParamsDTO) {
  return useQuery({
    queryKey: ["products", params.pageNumber, params.pageSize, params.searchTerm],
    queryFn: () => productService.getProductsForCustomer(params),
    placeholderData: (previousData) => previousData,
  });
}
