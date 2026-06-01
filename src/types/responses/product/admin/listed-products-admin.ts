import { ProductForAdmin } from "./product-admin";

export interface ListedProductsForAdmin {
  products: ProductForAdmin[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  productsInPage: number;
}
