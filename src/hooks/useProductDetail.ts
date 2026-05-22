import { useQuery } from "@tanstack/react-query";

import { productService } from "@/services/product-service";

export function useProductDetail(id: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getProductByIdForCustomer(id),
    enabled: !isNaN(id) && id > 0,
  });
}
