import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/interfaces/Product";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Tomamos la primera imagen del arreglo
  const imageUrl = product.images[0]?.imageUrl || "/placeholder.png";

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
        <div className="absolute left-2 top-2">
          <span className="rounded bg-white/90 px-2 py-1 text-[11px] font-semibold text-slate-800 shadow-sm">
            {product.brand.name}
          </span>
        </div>
      </Link>

      {/* Contenido de la Tarjeta */}
      <CardContent className="flex-1 p-4">
        <span className="text-xs font-medium text-blue-600">
          {product.category.name}
        </span>
        <h3 className="line-clamp-1 text-lg font-semibold text-slate-900 mt-1" title={product.name}>
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-500">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">
            ${product.price.toLocaleString("es-CL")}
          </span>
          <span className="text-xs text-slate-500">
            Stock: {product.stock}
          </span>
        </div>
      </CardContent>

      {/* Pie de la Tarjeta con el Botón */}
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Agregar
        </Button>
      </CardFooter>
    </Card>
  );
}