export interface ProductDetailCustomer {
  id: number;
  name: string;
  description: string | null;
  price: string; // Ya formateado desde el backend (Ej: "$1.200.000")
  stockIndicator: string; // Ej: "Con Stock" o "Sin stock"
  brandName: string;
  brandDescription: string;
  categoryName: string;
  categoryDescription: string;
  imagesURL: string[]; // Colección de URLs completas para la galería
}
