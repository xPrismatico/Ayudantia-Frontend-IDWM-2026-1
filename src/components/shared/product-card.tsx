import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ProductForCustomer } from "@/types/responses/product";
import { Button, Card, CardContent, CardFooter } from "@/components/ui";

interface ProductCardProps {
  product: ProductForCustomer;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.mainImageURL || "https://placehold.co/600x400?text=Producto";
  //TODO: PR a Backend indicando cambiar el campo a un bool o int para evitar strings que pueden variar
  const isOutOfStock = product.stockIndicator.toLowerCase() === "sin stock";
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
          {/* El precio ya es un string formateado por la API (Ej: "$900.000"), lo imprimimos directo */}
          <span className="text-xl font-bold text-slate-900">{product.price}</span>

          <span
            className={
              isOutOfStock ? "text-xs font-semibold text-red-600" : "text-xs text-slate-500"
            }
          >
            {product.stockIndicator}
          </span>
        </div>
      </CardContent>

      {/* Pie de la Tarjeta con el Botón */}
      <CardFooter className="p-4 pt-0">
        <Button
          aria-label={`Agregar ${product.name} al carrito`}
          disabled={isOutOfStock}
          className="w-full bg-blue-600 text-white hover:bg-blue-700"
        >
          <ShoppingCart className="mr-2 h-4 w-4" aria-hidden="true" />
          Agregar
        </Button>
      </CardFooter>
    </Card>
  );
}
