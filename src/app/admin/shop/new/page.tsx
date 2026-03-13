"use client";

import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-6">New Product</h1>
      <ProductForm />
    </div>
  );
}
