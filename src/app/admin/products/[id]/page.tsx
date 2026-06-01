// src/app/admin/products/[id]/page.tsx
import AdminProductDetailView from "@/views/admin/products/admin-product-detail-view";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminProductDetailPage({ params }: Props) {
  const { id } = await params;
  const productId = Number(id);

  return <AdminProductDetailView id={productId} />;
}
