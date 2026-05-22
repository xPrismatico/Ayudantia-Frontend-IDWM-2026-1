import { ProductForCustomer } from "./product-customer";

export interface ListedProductsForCustomer {
  products: ProductForCustomer[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  productsInPage: number;
}
