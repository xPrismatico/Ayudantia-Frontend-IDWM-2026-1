import axios from "axios";

import { GenericResponse } from "@/types/responses/generic-response";
import { SearchParamsDTO } from "@/types/responses/product";
import {
  CreateProductPayload,
  ListedProductsForAdmin,
  ProductDetailAdmin,
} from "@/types/responses/product/admin";
import { apiClient } from "@/clients/axios";

export const adminProductService = {
  // 1. Obtener listado de productos para el Admin
  getProductsForAdmin: async (params: SearchParamsDTO): Promise<ListedProductsForAdmin> => {
    try {
      const response = await apiClient.get<GenericResponse<ListedProductsForAdmin>>(
        "/api/product/admin",
        { params }
      );
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return {
          products: [],
          totalCount: 0,
          totalPages: 0,
          currentPage: params.pageNumber,
          pageSize: params.pageSize,
          productsInPage: 0,
        };
      }
      throw error;
    }
  },

  // 2. Obtener el detalle de un producto específico para el Admin
  getProductByIdForAdmin: async (id: number): Promise<ProductDetailAdmin> => {
    const response = await apiClient.get<GenericResponse<ProductDetailAdmin>>(
      `/api/product/admin/${id}`
    );
    return response.data.data;
  },

  // 3. Cambiar el estado del producto (Activar/Desactivar)
  switchProductStatus: async (id: number): Promise<string> => {
    const response = await apiClient.patch<GenericResponse<string>>(
      `/api/product/switch-status/${id}`
    );
    return response.data.message;
  },

  // 4. Crear un nuevo producto (Usa FormData para enviar archivos)
  createProduct: async (payload: CreateProductPayload): Promise<string> => {
    const formData = new FormData();

    // Agregamos los campos de texto
    formData.append("Name", payload.name);
    formData.append("Description", payload.description);
    formData.append("Price", payload.price.toString());
    formData.append("Stock", payload.stock.toString());
    formData.append("CategoryName", payload.categoryName);
    formData.append("BrandName", payload.brandName);

    // Agregamos las imágenes (El backend espera un List<IFormFile> llamado "ImagesFiles")
    payload.imagesFiles.forEach((file) => {
      formData.append("ImagesFiles", file);
    });

    // Importante: Al usar interceptores, Axios detectará automáticamente el FormData
    // y establecerá el Content-Type correcto como 'multipart/form-data'.
    const response = await apiClient.post<GenericResponse<string>>("/api/product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.data; // Retorna el ID del producto creado según el backend
  },

  deleteProduct: async (id: number): Promise<string> => {
    const response = await apiClient.delete<GenericResponse<string>>(`/api/product/${id}`);
    return response.data.message;
  },
};
