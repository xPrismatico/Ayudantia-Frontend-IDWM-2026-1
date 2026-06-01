"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// Importamos nuestro componente de formulario modularizado
import { CreateProductForm } from "@/components/admin/create-product-form";

export default function CreateProductView() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* 1. Navegación / Layout */}
      <Link
        href="/admin/products"
        className="inline-flex items-center text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver al listado
      </Link>

      {/* 2. Encabezado de la Vista */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Crear Nuevo Producto</h1>
        <p className="text-slate-500">
          Ingresa los detalles técnicos, precio y material gráfico para publicar un nuevo producto
          en el catálogo.
        </p>
      </header>

      {/* 3. Inyección del Formulario de Negocio */}
      <CreateProductForm />
    </div>
  );
}
