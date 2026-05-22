import { useQuery } from "@tanstack/react-query";

import { SearchParamsDTO } from "@/types/responses/product";
import { productService } from "@/services/product-service";

export function useProducts(params: SearchParamsDTO) {
  return useQuery({
    queryKey: ["products", params.PageNumber, params.PageSize, params.SearchTerm],
    queryFn: () => productService.getProductsForCustomer(params),
    placeholderData: (previousData) => previousData,
  });
}
