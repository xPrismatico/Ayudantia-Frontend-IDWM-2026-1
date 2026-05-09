export interface Brand {
  id: number;
  name: string;
  description?: string | null;
  isDeleted: boolean;
}

export interface Category {
  id: number;
  name: string;
  description?: string | null;
  isDeleted: boolean;
}

export interface ProductImage {
  id: number;
  imageUrl: string;
  publicId: string;
  productId: number;
}

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
  createdAt: string; // En TS manejamos las fechas de la API como strings (ISO 8601) o Date
  isDeleted: boolean;
}