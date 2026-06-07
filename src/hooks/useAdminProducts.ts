import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

import { SearchParamsDTO } from "@/types/responses/product";
import { CreateProductPayload } from "@/types/responses/product/admin";
import { adminProductService } from "@/services/admin-product-service";

// 1. Hook para listar los productos (Formato Tabla Admin)
export function useAdminProducts(params: SearchParamsDTO) {
  return useQuery({
    queryKey: ["admin-products", params.pageNumber, params.pageSize, params.searchTerm],
    queryFn: () => adminProductService.getProductsForAdmin(params),
    placeholderData: (previousData) => previousData, // Mantiene la data vieja mientras pagina
  });
}

// 2. Hook para ver el detalle de un producto específico (Admin)
export function useAdminProductDetail(id: number) {
  return useQuery({
    queryKey: ["admin-product", id],
    queryFn: () => adminProductService.getProductByIdForAdmin(id),
    enabled: !isNaN(id) && id > 0, // Evita disparar la petición si el ID es inválido
  });
}

// 3. Hook para cambiar el estado (Activar/Desactivar)
export function useSwitchProductStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => adminProductService.switchProductStatus(id),
    onSuccess: (_, id) => {
      // Invalida el catálogo general del admin y el detalle específico para forzar un refetch
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["admin-product", id] });
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message || "Error al cambiar el estado del producto.";
        toast.error(msg);
      } else {
        toast.error("Error inesperado al cambiar el estado del producto.");
      }
    },
  });
}

// 4. Hook para crear un producto
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProductPayload) => adminProductService.createProduct(payload),
    onSuccess: () => {
      // Invalida la lista para que la tabla administrativa muestre el nuevo producto
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message || "Error al crear el producto.";
        toast.error(msg);
      } else {
        toast.error("Error inesperado al crear el producto.");
      }
    },
  });
}
