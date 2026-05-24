"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { RegisterFormValues, registerSchema } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authService } from "@/services/auth-service";

export default function RegisterView() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      rut: "",
      phoneNumber: "",
      gender: "Masculino",
      birthDate: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    try {
      setIsLoading(true);

      const requestData = {
        name: data.name,
        email: data.email,
        rut: data.rut,
        phoneNumber: data.phoneNumber,
        birthDate: data.birthDate,
        gender: data.gender,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      await authService.register(requestData);
      toast.success("Registro exitoso. Verifica tu correo.");
      router.push(`/verify?email=${encodeURIComponent(data.email)}`);
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 400 &&
        error.response?.data?.errors
      ) {
        const backendErrors = error.response.data.errors;

        Object.entries(backendErrors).forEach(([key, messages]) => {
          const fieldName = (key.charAt(0).toLowerCase() +
            key.slice(1)) as keyof RegisterFormValues;
          const errorMessage = Array.isArray(messages) ? messages[0] : (messages as string);

          form.setError(fieldName, {
            type: "server",
            message: errorMessage,
          });
        });
        toast.error("Por favor, corrige los errores en el formulario.");
      } else if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Ocurrió un error en el registro.");
      } else {
        toast.error("Ocurrió un error inesperado.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl space-y-6 px-4 py-12 sm:px-0">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Crear Cuenta</h1>
        <p className="text-slate-500">Completa tus datos para registrarte en la plataforma</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Juan Pérez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="juan@ejemplo.cl" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RUT</FormLabel>
                  <FormControl>
                    <Input placeholder="12345678-9" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="+569 12345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Nacimiento</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Género</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un género" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Masculino">Masculino</SelectItem>
                      <SelectItem value="Femenino">Femenino</SelectItem>
                      <SelectItem value="Otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4 pt-4">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Registrando usuario..." : "Crear Cuenta"}
            </Button>

            <p className="text-center text-sm text-slate-500">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="font-semibold text-blue-600 hover:underline">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
