import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSetAtom } from "jotai";
import { toast } from "sonner";

import { AddChangeCartItemDTO } from "@/types/responses/cart";
import { cartService } from "@/services/cart-service";
import { cartAtom } from "@/store/cartAtom";

export function useCart() {
  const setCart = useSetAtom(cartAtom);
  const queryClient = useQueryClient();

  // Función auxiliar para extraer el mensaje de error del backend
  const handleMutationError = (error: unknown, fallbackMessage: string) => {
    if (axios.isAxiosError(error) && error.response?.data) {
      const data = error.response.data;

      // Según el middleware de C#: new ErrorDetail(title, ex.Message)
      // Buscamos el ex.Message que suele estar en data.detail, data.details, data.error.
      // O si está en data.message, nos aseguramos que no sea el título genérico.
      const actualMessage =
        data.detail ||
        data.details ||
        data.error ||
        (data.message && data.message !== "Error interno del servidor" ? data.message : null);

      if (actualMessage) {
        toast.error(actualMessage);
        return; // Salimos de la función si encontramos el mensaje
      }
    }
    // Si no logramos extraer el mensaje exacto, usamos el genérico
    toast.error(fallbackMessage);
  };

  // 1. Obtener el carrito y sincronizarlo con Jotai
  const query = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const cartData = await cartService.getCart();
      setCart(cartData); // Sincronizamos el átomo de Jotai tras el fetch
      return cartData;
    },
  });

  // 2. Mutación para agregar producto
  const addMutation = useMutation({
    mutationFn: (data: AddChangeCartItemDTO) => cartService.addCartItem(data),
    onSuccess: (updatedCart) => {
      setCart(updatedCart); // Actualizamos Jotai instantáneamente
      queryClient.setQueryData(["cart"], updatedCart); // Actualizamos caché
      toast.success("Producto agregado al carrito");
    },
    onError: (error) => handleMutationError(error, "Error al agregar el producto"),
  });

  // 3. Mutación para cambiar cantidad
  const updateQuantityMutation = useMutation({
    mutationFn: (data: AddChangeCartItemDTO) => cartService.updateCartItemQuantity(data),
    onSuccess: (updatedCart) => {
      setCart(updatedCart);
      queryClient.setQueryData(["cart"], updatedCart);
    },
    onError: (error) => handleMutationError(error, "Error al actualizar la cantidad"),
  });

  // 4. Mutación para eliminar un producto
  const removeMutation = useMutation({
    mutationFn: (productId: number) => cartService.removeCartItem(productId),
    onSuccess: (updatedCart) => {
      setCart(updatedCart);
      queryClient.setQueryData(["cart"], updatedCart);
      toast.info("Producto eliminado del carrito");
    },
    onError: (error) => handleMutationError(error, "Error al eliminar el producto"),
  });

  // 5. Mutación para limpiar todo el carrito
  const clearMutation = useMutation({
    mutationFn: () => cartService.clearCart(),
    onSuccess: (updatedCart) => {
      setCart(updatedCart);
      queryClient.setQueryData(["cart"], updatedCart);
      toast.info("Carrito vaciado correctamente");
    },
    onError: (error) => handleMutationError(error, "Error al vaciar el carrito"),
  });

  return {
    cart: query.data,
    isLoading: query.isLoading,
    addCartItem: addMutation.mutateAsync,
    updateQuantity: updateQuantityMutation.mutateAsync,
    removeCartItem: removeMutation.mutateAsync,
    clearCart: clearMutation.mutateAsync,
    isMutating:
      addMutation.isPending ||
      updateQuantityMutation.isPending ||
      removeMutation.isPending ||
      clearMutation.isPending,
  };
}
