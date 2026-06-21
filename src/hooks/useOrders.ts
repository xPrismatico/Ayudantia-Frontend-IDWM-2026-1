import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSetAtom } from "jotai";
import { toast } from "sonner";

import { SearchParamsDTO } from "@/types/responses/product";
import { orderService } from "@/services/order-service";
import { cartAtom } from "@/store/cartAtom";

// Función auxiliar transversal para errores
const handleOrderError = (error: unknown, fallbackMessage: string) => {
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    toast.error(error.response.data.message);
  } else {
    toast.error(fallbackMessage);
  }
};

export function useOrders(params?: SearchParamsDTO) {
  const queryClient = useQueryClient();
  const setCart = useSetAtom(cartAtom);

  // Mutación para confirmar la compra y generar la orden
  const createOrderMutation = useMutation({
    mutationFn: () => orderService.createOrder(),
    onSuccess: () => {
      toast.success("¡Compra realizada con éxito!");
      // Limpiamos el carrito local y en caché porque el backend ya lo vació
      setCart(null);
      queryClient.setQueryData(["cart"], null);
      // Invalidamos el historial de órdenes para que se actualice la lista
      queryClient.invalidateQueries({ queryKey: ["user-orders"] });
    },
    onError: (error) => handleOrderError(error, "Error al procesar la compra"),
  });

  // Query para obtener el historial paginado de compras del usuario
  const userOrdersQuery = useQuery({
    queryKey: ["user-orders", params?.pageNumber, params?.pageSize],
    queryFn: () => orderService.getUserOrders(params!),
    enabled: !!params, // Solo se ejecuta si se pasan parámetros
    placeholderData: (previousData) => previousData,
  });

  return {
    createOrder: createOrderMutation.mutateAsync,
    isCreating: createOrderMutation.isPending,
    ordersData: userOrdersQuery.data,
    isOrdersLoading: userOrdersQuery.isLoading,
    isOrdersError: userOrdersQuery.isError,
  };
}

// Hook individual para el detalle de una orden
export function useOrderDetail(orderCode: string) {
  return useQuery({
    queryKey: ["order-detail", orderCode],
    queryFn: () => orderService.getOrderDetail(orderCode),
    enabled: !!orderCode,
  });
}
