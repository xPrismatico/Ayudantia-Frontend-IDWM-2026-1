import { Brand } from "./brand";
import { Category } from "./category";
import { ProductImage } from "./product-image";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  brandId: number;
  brand: Brand;
  categoryId: number;
  category: Category;
  images: ProductImage[];
  isActive: boolean;
  createdAt: string;
  isDeleted: boolean;
}
