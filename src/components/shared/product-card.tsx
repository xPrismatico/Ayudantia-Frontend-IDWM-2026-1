"use client";

import { Loader2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ProductForCustomer } from "@/types/responses/product";
import { formatPriceCLP } from "@/lib/currency";
import { Button, Card, CardContent, CardFooter } from "@/components/ui";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: ProductForCustomer;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.mainImageURL || "https://placehold.co/600x400?text=Producto";
  const isOutOfStock = !product.inStock;

  const { addCartItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  // Manejador del evento de agregar al carrito
  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      await addCartItem({ productId: product.id, quantity: 1 });
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
    } finally {
      setIsAdding(false); // Detenemos el spinner independientemente de si funcionó o falló
    }
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-md">
      {/* Contenedor de la Imagen */}
      <Link href={`/products/${product.id}`} className="relative h-48 w-full bg-slate-100">
        <Image
          src={imageUrl}
          alt={`Imagen de ${product.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      {/* Contenido de la Tarjeta */}
      <CardContent className="flex-1 p-4">
        <h3 className="mt-1 line-clamp-1 text-lg font-semibold text-slate-900" title={product.name}>
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-500">{product.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">{formatPriceCLP(product.price)}</span>

          <span
            className={
              isOutOfStock ? "text-xs font-semibold text-red-600" : "text-xs text-slate-500"
            }
          >
            {isOutOfStock ? "Sin stock" : "En stock"}
          </span>
        </div>
      </CardContent>

      {/* Pie de la Tarjeta con el Botón */}
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock || isAdding}
          aria-label={`Agregar ${product.name} al carrito`}
          className="w-full bg-blue-600 text-white transition-all hover:bg-blue-700 disabled:opacity-70"
        >
          {/* Alternancia visual del icono dependiendo del estado */}
          {isAdding ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <ShoppingCart className="mr-2 h-4 w-4" aria-hidden="true" />
          )}
          {isAdding ? "Agregando..." : "Agregar"}
        </Button>
      </CardFooter>
    </Card>
  );
}
