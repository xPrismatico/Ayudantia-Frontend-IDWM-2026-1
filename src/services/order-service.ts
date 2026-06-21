import axios from "axios";

import { GenericResponse } from "@/types/responses/generic-response";
import { ListedOrderDetailDTO, OrderDetailDTO } from "@/types/responses/order";
import { SearchParamsDTO } from "@/types/responses/product";
import { apiClient } from "@/clients/axios";

export const orderService = {
  // Confirma la orden descontando stock y limpiando el carrito
  createOrder: async (): Promise<string> => {
    const response = await apiClient.post<GenericResponse<string>>("/api/order");
    return response.data.data;
  },

  // Obtiene los detalles de una compra específica
  getOrderDetail: async (orderCode: string): Promise<OrderDetailDTO> => {
    const response = await apiClient.get<GenericResponse<OrderDetailDTO>>(
      `/api/order/${orderCode}`
    );
    return response.data.data;
  },

  // Obtiene el historial de compras del usuario paginado
  getUserOrders: async (params: SearchParamsDTO): Promise<ListedOrderDetailDTO> => {
    try {
      const response = await apiClient.get<GenericResponse<ListedOrderDetailDTO>>(
        "/api/order/user-orders",
        {
          params,
        }
      );
      return response.data.data;
    } catch (error) {
      // Si el backend arroja 404 porque el usuario no tiene órdenes,
      // lo interceptamos y devolvemos un listado vacío en lugar de un error duro.
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return {
          orders: [],
          totalCount: 0,
          totalPages: 0,
          currentPage: params.pageNumber,
          pageSize: params.pageSize,
          ordersInPage: 0,
        };
      }
      // Si es un error 500 o de red, lo dejamos pasar para que useQuery muestre el error real
      throw error;
    }
  },
};
