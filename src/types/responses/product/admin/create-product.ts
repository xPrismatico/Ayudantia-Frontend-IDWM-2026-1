// Interfaz para el envío de datos al crear un producto (FormData)
export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryName: string;
  brandName: string;
  imagesFiles: File[];
}
