"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth-service";

interface LogoutButtonProps {
  token: string;
}

export default function LogoutButton({ token }: LogoutButtonProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    try {
      setIsLoggingOut(true);

      const message = await authService.logout(token);
      await signOut({ callbackUrl: "/login" });

      toast.success(message || "Sesión cerrada correctamente.");
    } catch {
      await signOut({ callbackUrl: "/login" });
      toast.error("Sesión expirada o error en servidor.");
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <Button
      variant="destructive"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="border-none bg-red-500 font-medium text-white shadow-none hover:bg-red-600"
    >
      {isLoggingOut ? "Saliendo..." : "Cerrar Sesión"}
    </Button>
  );
}
