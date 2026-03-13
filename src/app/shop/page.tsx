import type { Metadata } from "next";
import { ShopClient } from "./ShopClient";
import { getPublishedProducts } from "@/lib/firebase/products";
import { SAMPLE_PRODUCTS } from "@/lib/sampleData";

export const metadata: Metadata = {
  title: "Shop",
  description: "Handpicked products from my kitchen to yours — coming soon.",
};

export default async function ShopPage() {
  let products;
  try {
    products = await getPublishedProducts();
    if (products.length === 0) products = SAMPLE_PRODUCTS;
  } catch {
    products = SAMPLE_PRODUCTS;
  }

  return <ShopClient initialProducts={products} />;
}
