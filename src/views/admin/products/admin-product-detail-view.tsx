"use client";

import { ArrowLeft, Calendar, Info, Package, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useAdminProductDetail, useSwitchProductStatus } from "@/hooks/useAdminProducts";

export default function AdminProductDetailView({ id }: { id: number }) {
  const { data: product, isLoading, isError } = useAdminProductDetail(id);
  const { mutate: switchStatus, isPending } = useSwitchProductStatus();

  if (isLoading) {
    return (
      <div className="grid animate-pulse grid-cols-1 gap-10 md:grid-cols-2">
        <div className="h-[400px] w-full rounded-xl bg-slate-200" />
        <div className="space-y-4">
          <div className="h-10 w-3/4 rounded bg-slate-200" />
          <div className="h-6 w-1/3 rounded bg-slate-200" />
          <div className="h-24 w-full rounded bg-slate-200" />
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return <div className="py-16 text-center text-red-500">Producto no encontrado.</div>;
  }

  const mainImage = product.imagesURL?.[0] || "https://placehold.co/600x400?text=Sin+Imagen";

  return (
    <div className="space-y-6">
      <Link
        href="/admin/products"
        className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a gestión
      </Link>

      <div className="grid grid-cols-1 gap-10 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:grid-cols-2">
        {/* Imágenes */}
        <div className="space-y-4">
          <div className="relative h-[400px] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <Image src={mainImage} alt={product.name} fill className="object-cover" />
          </div>
          {/* Si hay más imágenes, podrían listarse aquí en formato miniatura */}
        </div>

        {/* Panel Administrativo */}
        <div className="flex flex-col space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${product.isActive ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-800"}`}
              >
                {product.isActive ? "Activo" : "Inactivo"}
              </span>
            </div>
            <div className="mt-2 text-2xl font-bold text-blue-600">{product.price}</div>
          </div>

          <p className="text-slate-600">{product.description || "Sin descripción."}</p>

          <div className="grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4">
            <div className="flex flex-col gap-1">
              <span className="flex items-center text-xs font-semibold text-slate-500">
                <Tag className="mr-1 h-3 w-3" /> Categoría
              </span>
              <span className="text-sm font-medium text-slate-900">{product.categoryName}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex items-center text-xs font-semibold text-slate-500">
                <Info className="mr-1 h-3 w-3" /> Marca
              </span>
              <span className="text-sm font-medium text-slate-900">{product.brandName}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex items-center text-xs font-semibold text-slate-500">
                <Package className="mr-1 h-3 w-3" /> Stock Real
              </span>
              <span className="text-sm font-medium text-slate-900">{product.stock} unidades</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex items-center text-xs font-semibold text-slate-500">
                <Calendar className="mr-1 h-3 w-3" /> Registro
              </span>
              <span className="text-sm font-medium text-slate-900">
                {new Date(product.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="mt-auto border-t border-slate-100 pt-6">
            <Button
              onClick={() => switchStatus(product.id)}
              disabled={isPending}
              variant={product.isActive ? "destructive" : "default"}
              className="w-full"
            >
              {product.isActive ? "Desactivar Producto" : "Activar Producto"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
