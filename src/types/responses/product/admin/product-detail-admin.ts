export interface ProductDetailAdmin {
  id: number;
  name: string;
  description: string | null;
  price: string;
  stock: number;
  brandName: string;
  brandDescription: string;
  categoryName: string;
  categoryDescription: string;
  imagesURL: string[];
  isActive: boolean;
  createdAt: string; // ISO Date string
}
