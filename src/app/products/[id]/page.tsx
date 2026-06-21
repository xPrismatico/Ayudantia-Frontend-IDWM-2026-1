import { Metadata } from "next";

import ProductDetailView from "@/views/products/product-detail-view";

interface Props {
  params: Promise<{ id: string }>;
}

// BUENAS PRÁCTICAS SEO: Metadata Dinámica (SSR)
// Esta función se ejecuta en el servidor. Obtiene los datos de la API y construye
// las etiquetas <meta> para que los motores de búsqueda y redes sociales lean el producto exacto.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    // Usamos fetch nativo en el servidor para evitar dependencias de cliente (Axios/NextAuth).
    // El endpoint GetProductByIdForCustomer tiene [AllowAnonymous], así que funcionará perfecto sin token.
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`);

    if (!res.ok) throw new Error("Producto no encontrado");

    const json = await res.json();
    const product = json.data; // Desestructuramos el GenericResponse

    if (!product) {
      return { title: "Producto no encontrado | Tienda UCN" };
    }

    // Extraemos la imagen principal o usamos un placeholder
    const mainImage = product.imagesURL?.[0] || "https://placehold.co/600x400?text=Sin+Imagen";

    return {
      title: `${product.name} | Tienda UCN`,
      description: product.description || `Compra ${product.name} al mejor precio en Tienda UCN.`,
      openGraph: {
        title: `${product.name} | Tienda UCN`,
        description: product.description || `Compra ${product.name} al mejor precio en Tienda UCN.`,
        url: `/products/${id}`,
        siteName: "Tienda UCN",
        images: [
          {
            url: mainImage,
            width: 800,
            height: 600,
            alt: `Imagen de ${product.name}`,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.name} | Tienda UCN`,
        description: product.description,
        images: [mainImage],
      },
    };
  } catch (error) {
    // Fallback seguro en caso de que la API esté caída en el momento del renderizado
    return {
      title: "Detalle de Producto | Tienda UCN",
      description: "Revisa los detalles de este producto en nuestra tienda.",
    };
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const productId = Number(id);
  return <ProductDetailView id={productId} />;
}
