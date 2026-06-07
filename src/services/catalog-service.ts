import { CatalogItem } from "@/types/responses/catalog";
import { GenericResponse } from "@/types/responses/generic-response";
import { apiClient } from "@/clients/axios";

export const catalogService = {
  getActiveCategories: async (): Promise<CatalogItem[]> => {
    const response = await apiClient.get<GenericResponse<CatalogItem[]>>("/api/category");
    return response.data.data;
  },

  getActiveBrands: async (): Promise<CatalogItem[]> => {
    const response = await apiClient.get<GenericResponse<CatalogItem[]>>("/api/brand");
    return response.data.data;
  },
};
