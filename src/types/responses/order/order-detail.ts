import { OrderItemDTO } from ".";

export interface OrderDetailDTO {
  code: string;
  transactionDate: string;
  totalPrice: number;
  items: OrderItemDTO[];
}
