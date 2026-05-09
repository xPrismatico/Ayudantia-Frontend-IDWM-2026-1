import { Product } from "@/interfaces/Product";

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Laptop ASUS ROG Zephyrus G14",
    description: "Notebook gamer con procesador AMD Ryzen 9 y tarjeta gráfica RTX 4060, ideal para desarrollo y gaming de alto rendimiento.",
    price: 1500000,
    stock: 5,
    brandId: 1,
    brand: { id: 1, name: "ASUS", isDeleted: false },
    categoryId: 1,
    category: { id: 1, name: "Computación", isDeleted: false },
    images: [
      {
        id: 1,
        imageUrl: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg", // Placeholder seguro
        publicId: "sample_1",
        productId: 1,
      }
    ],
    isActive: true,
    createdAt: new Date().toISOString(),
    isDeleted: false,
  },
  {
    id: 2,
    name: "Teclado Mecánico Keychron K2",
    description: "Teclado mecánico inalámbrico 75% con switches brown, perfecto para programar largas horas.",
    price: 85000,
    stock: 12,
    brandId: 2,
    brand: { id: 2, name: "Keychron", isDeleted: false },
    categoryId: 2,
    category: { id: 2, name: "Periféricos", isDeleted: false },
    images: [
      {
        id: 2,
        imageUrl: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
        publicId: "sample_2",
        productId: 2,
      }
    ],
    isActive: true,
    createdAt: new Date().toISOString(),
    isDeleted: false,
  }
];