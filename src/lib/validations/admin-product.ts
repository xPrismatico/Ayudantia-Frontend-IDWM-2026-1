import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres." })
    .max(20, { message: "El nombre no puede exceder los 20 caracteres." }),

  description: z
    .string()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres." })
    .max(100, { message: "La descripción no puede exceder los 100 caracteres." }),

  price: z
    .number()
    .int({ message: "El precio debe ser un número entero." })
    .positive({ message: "El precio debe ser mayor a cero." }),

  stock: z
    .number()
    .int({ message: "El stock debe ser un número entero." })
    .positive({ message: "El stock debe ser mayor a cero." }),
  categoryName: z
    .string()
    .min(3, { message: "El nombre de la categoría debe tener al menos 3 caracteres." })
    .max(25, { message: "El nombre de la categoría no puede exceder los 25 caracteres." }),

  brandName: z
    .string()
    .min(3, { message: "El nombre de la marca debe tener al menos 3 caracteres." })
    .max(25, { message: "El nombre de la marca no puede exceder los 25 caracteres." }),

  imagesFiles: z
    .array(z.any())
    .min(1, { message: "Debe proporcionar al menos una imagen para el producto." }),
});

export type CreateProductFormValues = z.infer<typeof createProductSchema>;
