"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { VerifyEmailFormValues, verifyEmailSchema } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/auth-service";

export default function VerifyView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";

  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const form = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailSchema),
    mode: "onTouched",
    defaultValues: { code: "" },
  });

  async function onSubmit(data: VerifyEmailFormValues) {
    if (!email) {
      toast.error("No se detectó un correo electrónico.");
      return;
    }

    try {
      setIsLoading(true);
      await authService.verifyEmail({
        Email: email,
        VerificationCode: data.code,
      });

      toast.success("¡Cuenta verificada exitosamente!");
      router.push("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const serverMsg = error.response?.data?.message || "Error al procesar la solicitud.";
        toast.error(serverMsg);
      } else {
        toast.error("Ocurrió un error inesperado.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendCode() {
    if (!email) return;
    try {
      setIsResending(true);
      const message = await authService.resendVerificationCode({ Email: email });
      toast.info(message || "Código reenviado.");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const serverMsg = error.response?.data?.message || "Error al reenviar.";
        toast.error(serverMsg);
      } else {
        toast.error("Error inesperado al reenviar.");
      }
    } finally {
      setIsResending(false);
    }
  }

  if (!email) {
    return (
      <div className="mx-auto max-w-md space-y-4 px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Enlace inválido</h1>
        <p className="text-slate-500">No se encontró un correo para verificar.</p>
        <Button asChild variant="outline">
          <Link href="/register">Ir al Registro</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md space-y-6 px-4 py-12 sm:px-0">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Verificar Cuenta</h1>
        <p className="text-sm text-slate-500">
          Ingresa el código enviado a <br />
          <span className="font-semibold text-slate-800">{email}</span>
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="123456"
                    className="h-16 text-center text-4xl font-bold tracking-[0.5em]"
                    maxLength={6}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="h-11 w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Verificando..." : "Confirmar Cuenta"}
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <Button
          variant="ghost"
          onClick={handleResendCode}
          disabled={isResending || isLoading}
          className="text-blue-600 hover:text-blue-800"
        >
          {isResending ? "Enviando..." : "¿No recibiste el código? Reenviar"}
        </Button>
      </div>
    </div>
  );
}
