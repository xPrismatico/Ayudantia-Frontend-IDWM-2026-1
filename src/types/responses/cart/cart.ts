import { CartItemDTO } from ".";

export interface CartDTO {
  buyerId: string;
  userId: number | null;
  items: CartItemDTO[];
  totalPrice: number;
}
