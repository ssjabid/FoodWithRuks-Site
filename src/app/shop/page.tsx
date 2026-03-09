import type { Metadata } from "next";
import { ShopClient } from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop",
  description: "Handpicked products from my kitchen to yours — coming soon.",
};

export default function ShopPage() {
  return <ShopClient />;
}
