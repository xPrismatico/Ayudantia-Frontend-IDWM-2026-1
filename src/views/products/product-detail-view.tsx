"use client";

import { ArrowLeft, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { formatPriceCLP } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { useProductDetail } from "@/hooks/useProductDetail";

interface ProductDetailViewProps {
  id: number;
}

export default function ProductDetailView({ id }: ProductDetailViewProps) {
  const { data: product, isLoading, isError } = useProductDetail(id);

  // 1. Estado de Carga Dedicado para la Ficha Técnica (Skeleton)
  if (isLoading) {
    return (
      <div className="grid animate-pulse grid-cols-1 gap-10 py-6 md:grid-cols-2">
        <div className="h-[400px] w-full rounded-xl bg-slate-200" />
        <div className="space-y-4">
          <div className="h-4 w-1/4 rounded bg-slate-200" />
          <div className="h-10 w-3/4 rounded bg-slate-200" />
          <div className="h-6 w-1/3 rounded bg-slate-200" />
          <div className="h-24 w-full rounded bg-slate-200" />
          <div className="mt-6 h-12 w-full rounded bg-slate-200" />
        </div>
      </div>
    );
  }

  // 2. Control de error
  if (isError || !product) {
    return (
      <div className="py-16 text-center">
        <p className="font-medium text-red-500">
          El producto solicitado no está disponible o no existe.
        </p>
        <Link href="/products" className="mt-4 inline-block text-blue-600 underline">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const mainImage = product.imagesURL?.[0] || "https://placehold.co/600x400?text=Sin+Imagen";
  const isOutOfStock = !product.inStock;

  return (
    <div className="space-y-6">
      {/* Botón de retorno con historial limpio */}
      <Link
        href="/products"
        className="inline-flex items-center text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver al listado
      </Link>

      {/* Requerimiento UX: Grilla de 2 columnas adaptativa */}
      <div className="grid grid-cols-1 gap-10 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
        {/* Columna Izquierda: Galería de Imágenes */}
        <div className="flex flex-col gap-4">
          <div className="relative h-[350px] w-full overflow-hidden rounded-xl border border-slate-100 bg-slate-50 md:h-[450px]">
            <Image
              src={mainImage}
              alt={`Imagen detallada de ${product.name}`}
              fill
              priority // Carga prioritaria al ser el elemento visual principal (LCP)
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Columna Derecha: Información Comercial e Identidad de Marca */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            {/* Badges de Clasificación */}
            <div className="flex items-center gap-2">
              <span className="rounded bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                {product.categoryName}
              </span>
              <span className="rounded bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-800">
                {product.brandName}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>

            <div className="border-b border-slate-100 py-2 text-3xl font-extrabold text-slate-900">
              {formatPriceCLP(product.price)}
            </div>

            {/* Ficha descriptiva */}
            <div className="space-y-1">
              <h2 className="text-sm font-bold tracking-wider text-slate-400 uppercase">
                Descripción
              </h2>
              <p className="text-base leading-relaxed text-slate-600">
                {product.description || "Sin descripción disponible por el momento."}
              </p>
            </div>

            {/* Sub-paneles informativos de UX */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
                <Truck className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-xs font-medium text-slate-400">Despacho</p>
                  <p className="text-sm font-bold text-slate-700">A todo Chile</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-xs font-medium text-slate-400">Disponibilidad</p>
                  <p
                    className={`text-sm font-bold ${isOutOfStock ? "text-red-600" : "text-emerald-700"}`}
                  >
                    {isOutOfStock ? "Sin stock" : "En stock"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Botón de Transacción Comercial */}
          <div className="pt-8">
            <Button
              className="flex h-12 w-full items-center justify-center gap-2 bg-blue-600 text-base font-bold text-white shadow-sm transition-all hover:bg-blue-700"
              disabled={isOutOfStock}
            >
              <ShoppingCart className="h-5 w-5" />
              {isOutOfStock ? "Producto Agotado" : "Agregar al Carrito de Compras"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
