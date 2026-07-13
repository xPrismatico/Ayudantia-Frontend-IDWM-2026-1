import { OrderDetailDTO } from ".";

export interface ListedOrderDetailDTO {
  orders: OrderDetailDTO[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  ordersInPage: number;
}
