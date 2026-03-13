"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Textarea } from "@/components/ui/Input";
import { adminFetch } from "@/lib/adminFetch";
import { slugify } from "@/lib/utils";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import type { Product } from "@/types";

interface ProductFormProps {
  product?: Product;
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const isEdit = !!product;

  const [name, setName] = useState(product?.name || "");
  const [slug, setSlug] = useState(product?.slug || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [category, setCategory] = useState(product?.category || "");
  const [image, setImage] = useState(product?.image || "");
  const [inStock, setInStock] = useState(product?.inStock || false);
  const [comingSoon, setComingSoon] = useState(product?.comingSoon ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleNameChange = (value: string) => {
    setName(value);
    if (!isEdit) setSlug(slugify(value));
  };

  const handleSave = async () => {
    if (!name.trim()) { setError("Name is required"); return; }

    setError("");
    setSaving(true);

    const body = {
      name,
      slug,
      description,
      price,
      currency: "USD",
      category,
      image,
      inStock,
      comingSoon,
    };

    try {
      const url = isEdit ? `/api/admin/shop/${product.id}` : "/api/admin/shop";
      const method = isEdit ? "PUT" : "POST";
      const res = await adminFetch(url, { method, body: JSON.stringify(body) });
      if (!res.ok) throw new Error("Failed to save");
      router.push("/admin/shop");
    } catch {
      setError("Failed to save product. Please try again.");
    }
    setSaving(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {error && (
        <div className="p-3 rounded-[var(--radius-sm)] bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      <Input label="Name" value={name} onChange={(e) => handleNameChange(e.target.value)} placeholder="Product name" />
      <Input label="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="product-slug" />
      <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Product description..." />
      <Input label="Price" type="number" step="0.01" value={price || ""} onChange={(e) => setPrice(Number(e.target.value))} />

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-[var(--color-text-primary)]">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full h-11 px-4 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text-primary)]"
        >
          <option value="">Select category</option>
          {PRODUCT_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <Input label="Image URL" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
      <p className="text-xs text-[var(--color-text-tertiary)]">Image upload coming soon. For now, paste an image URL.</p>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
            className="w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
          />
          <span className="text-sm font-medium">In Stock</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={comingSoon}
            onChange={(e) => setComingSoon(e.target.checked)}
            className="w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
          />
          <span className="text-sm font-medium">Coming Soon</span>
        </label>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[var(--color-border)]">
        <button
          onClick={handleSave}
          disabled={saving}
          className="h-11 px-6 rounded-[var(--radius-sm)] bg-[var(--color-primary)] text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
        </button>
        <button
          onClick={() => router.push("/admin/shop")}
          className="h-11 px-6 rounded-[var(--radius-sm)] text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
