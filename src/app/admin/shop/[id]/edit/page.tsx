"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { adminFetch } from "@/lib/adminFetch";
import { ProductForm } from "@/components/admin/ProductForm";
import type { Product } from "@/types";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await adminFetch(`/api/admin/shop/${id}`);
        if (res.ok) setProduct(await res.json());
      } catch { /* silent */ }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!product) return <div className="text-center py-20 text-[var(--color-text-secondary)]">Product not found.</div>;

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-6">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  );
}
