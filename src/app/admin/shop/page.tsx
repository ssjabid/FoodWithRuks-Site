"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { adminFetch } from "@/lib/adminFetch";
import { Modal } from "@/components/ui/Modal";
import type { Product } from "@/types";

export default function AdminShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    try {
      const res = await adminFetch("/api/admin/shop");
      if (res.ok) setProducts(await res.json());
    } catch { /* silent */ }
    setLoading(false);
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      await adminFetch(`/api/admin/shop/${deleteId}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p.id !== deleteId));
    } catch { /* silent */ }
    setDeleteId(null);
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Shop Products</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">{products.length} total</p>
        </div>
        <Link
          href="/admin/shop/new"
          className="h-9 px-4 rounded-[var(--radius-sm)] bg-[var(--color-primary)] text-white text-sm font-medium inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          New Product
        </Link>
      </div>

      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-elevated)] overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-sm text-[var(--color-text-secondary)]">Loading...</div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-sm text-[var(--color-text-secondary)]">No products yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)] text-left">
                  <th className="px-4 py-3 font-medium text-[var(--color-text-secondary)]">Name</th>
                  <th className="px-4 py-3 font-medium text-[var(--color-text-secondary)] hidden sm:table-cell">Category</th>
                  <th className="px-4 py-3 font-medium text-[var(--color-text-secondary)]">Price</th>
                  <th className="px-4 py-3 font-medium text-[var(--color-text-secondary)]">Status</th>
                  <th className="px-4 py-3 font-medium text-[var(--color-text-secondary)]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {products.map((product, i) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="hover:bg-[var(--color-secondary)] transition-colors"
                  >
                    <td className="px-4 py-3 font-medium">{product.name}</td>
                    <td className="px-4 py-3 hidden sm:table-cell text-[var(--color-text-secondary)]">{product.category}</td>
                    <td className="px-4 py-3">${product.price.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      {product.comingSoon ? (
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Coming Soon</span>
                      ) : product.inStock ? (
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">In Stock</span>
                      ) : (
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">Out of Stock</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link href={`/admin/shop/${product.id}/edit`} className="text-[var(--color-primary)] hover:underline">Edit</Link>
                        <button onClick={() => setDeleteId(product.id)} className="text-red-600 dark:text-red-400 hover:underline">Delete</button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Product">
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">Are you sure? This action cannot be undone.</p>
        <div className="flex gap-3 justify-end">
          <button onClick={() => setDeleteId(null)} className="h-9 px-4 rounded-[var(--radius-sm)] border border-[var(--color-border)] text-sm font-medium hover:bg-[var(--color-secondary)] transition-colors">Cancel</button>
          <button onClick={handleDelete} className="h-9 px-4 rounded-[var(--radius-sm)] bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors">Delete</button>
        </div>
      </Modal>
    </div>
  );
}
