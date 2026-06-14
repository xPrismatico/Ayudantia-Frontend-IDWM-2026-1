import { atom } from "jotai";

import { CartDTO } from "@/types/responses/cart";

// Átomo principal que almacenará la data del carrito
export const cartAtom = atom<CartDTO | null>(null);

// Átomo para manejar la apertura/cierre de la UI del carrito (útil si hacen un Drawer/Sidebar)
export const isCartOpenAtom = atom<boolean>(false);

// Átomo derivado: Calcula la cantidad total de unidades en el carrito
export const cartTotalItemsAtom = atom((get) => {
  const cart = get(cartAtom);
  if (!cart || !cart.items) return 0;

  return cart.items.reduce((total, item) => total + item.quantity, 0);
});
