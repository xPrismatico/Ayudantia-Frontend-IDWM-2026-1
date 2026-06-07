export interface ProductDetailCustomer {
  id: number;
  name: string;
  description: string | null;
  price: number;
  inStock: boolean;
  brandName: string;
  brandDescription: string;
  categoryName: string;
  categoryDescription: string;
  imagesURL: string[]; // Colección de URLs completas para la galería
}
