import axios from "axios";

import { GenericResponse } from "@/types/responses/generic-response";
import {
  ListedProductsForCustomer,
  ProductDetailCustomer,
  SearchParamsDTO,
} from "@/types/responses/product";
import { apiClient } from "@/clients/axios";

export const productService = {
  // 1. Obtener listado con Omni-Filtro controlado
  getProductsForCustomer: async (params: SearchParamsDTO): Promise<ListedProductsForCustomer> => {
    try {
      const response = await apiClient.get<GenericResponse<ListedProductsForCustomer>>(
        "/api/product",
        {
          params,
        }
      );
      return response.data.data;
    } catch (error) {
      // Si es un error de Axios y el backend arrojó 404 por falta de resultados
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        // Retornamos un DTO vacío estructurado para que el componente lo renderice de forma limpia
        return {
          products: [],
          totalCount: 0,
          totalPages: 0,
          currentPage: params.pageNumber,
          pageSize: params.pageSize,
          productsInPage: 0,
        };
      }
      // Si es otro tipo de error (500, error de red), lo relanzamos para que lo capture error.tsx
      throw error;
    }
  },

  // 2. Obtener el detalle de un producto individual por ID
  getProductByIdForCustomer: async (id: number): Promise<ProductDetailCustomer> => {
    const response = await apiClient.get<GenericResponse<ProductDetailCustomer>>(
      `/api/product/${id}`
    );
    return response.data.data;
  },
};
