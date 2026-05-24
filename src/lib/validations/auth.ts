import { z } from "zod";

const RUT_REGEX = /^\d{7,8}-[0-9kK]$/;
const PHONE_REGEX = /^\+569\s\d{8}$/;
const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).*$/;
const NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s\-]+$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export const loginSchema = z.object({
  email: z.string().email({ message: "El email no tiene un formato válido." }),
  password: z.string().min(1, { message: "La contraseña es obligatoria." }),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "El nombre debe tener mínimo 2 letras." })
      .max(20, { message: "El nombre debe tener máximo 20 letras." })
      .regex(NAME_REGEX, {
        message: "El Nombre solo puede contener caracteres del abecedario español.",
      }),
    email: z.string().email({ message: "El email no tiene un formato válido." }),
    rut: z.string().regex(RUT_REGEX, { message: "El Rut debe tener formato XXXXXXXX-X" }),
    phoneNumber: z.string().regex(PHONE_REGEX, {
      message: "El número de teléfono debe tener el formato +569 XXXXXXXX.",
    }),
    birthDate: z
      .string()
      .regex(DATE_REGEX, { message: "La fecha de nacimiento debe tener el formato YYYY-MM-DD." }),
    gender: z.enum(["Masculino", "Femenino", "Otro"], { message: "El género es obligatorio." }),
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
      .max(20, { message: "La contraseña debe tener como máximo 20 caracteres" })
      .regex(PASSWORD_REGEX, {
        message:
          "La contraseña debe ser alfanumérica, contener al menos una mayúscula y un caracter especial.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

export const verifyEmailSchema = z.object({
  code: z.string().length(6, { message: "El código debe tener exactamente 6 dígitos." }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;
