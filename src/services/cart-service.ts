import { AddChangeCartItemDTO, CartDTO } from "@/types/responses/cart";
import { GenericResponse } from "@/types/responses/generic-response";
import { apiClient } from "@/clients/axios";

export const cartService = {
  getCart: async (): Promise<CartDTO> => {
    const response = await apiClient.get<GenericResponse<CartDTO>>("/api/cart");
    return response.data.data;
  },

  addCartItem: async (data: AddChangeCartItemDTO): Promise<CartDTO> => {
    const response = await apiClient.post<GenericResponse<CartDTO>>("/api/cart/items", data);
    return response.data.data;
  },

  updateCartItemQuantity: async (data: AddChangeCartItemDTO): Promise<CartDTO> => {
    const response = await apiClient.patch<GenericResponse<CartDTO>>("/api/cart/items", data);
    return response.data.data;
  },

  removeCartItem: async (productId: number): Promise<CartDTO> => {
    const response = await apiClient.delete<GenericResponse<CartDTO>>(
      `/api/cart/items/${productId}`
    );
    return response.data.data;
  },

  clearCart: async (): Promise<CartDTO> => {
    const response = await apiClient.put<GenericResponse<CartDTO>>("/api/cart/clear");
    return response.data.data;
  },
};
