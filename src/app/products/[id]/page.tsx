import ProductDetailView from "@/views/products/product-detail-view";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const productId = Number(id);
  return <ProductDetailView id={productId} />;
}
