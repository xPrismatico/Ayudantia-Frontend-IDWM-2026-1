export interface ProductForCustomer {
  id: number;
  name: string;
  description: string;
  mainImageURL: string | null;
  price: number;
  inStock: boolean;
}
