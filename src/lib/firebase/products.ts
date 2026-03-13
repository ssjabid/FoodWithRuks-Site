import { adminDb } from "./admin";
import type { Product } from "@/types";

function docToProduct(doc: FirebaseFirestore.QueryDocumentSnapshot): Product {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    slug: data.slug,
    description: data.description || "",
    price: data.price || 0,
    currency: data.currency || "USD",
    category: data.category || "",
    image: data.image || "",
    inStock: data.inStock || false,
    comingSoon: data.comingSoon ?? true,
  };
}

export async function getPublishedProducts(): Promise<Product[]> {
  const snapshot = await adminDb
    .collection("products")
    .orderBy("name", "asc")
    .get();

  return snapshot.docs.map(docToProduct);
}

// Admin CRUD

export async function getAllProducts(): Promise<Product[]> {
  const snapshot = await adminDb
    .collection("products")
    .orderBy("name", "asc")
    .get();

  return snapshot.docs.map(docToProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  const doc = await adminDb.collection("products").doc(id).get();
  if (!doc.exists) return null;
  return docToProduct(doc as FirebaseFirestore.QueryDocumentSnapshot);
}

export async function createProduct(data: Omit<Product, "id">): Promise<string> {
  const ref = await adminDb.collection("products").add(data);
  return ref.id;
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
  const updateData = { ...data };
  delete (updateData as Record<string, unknown>).id;
  await adminDb.collection("products").doc(id).update(updateData);
}

export async function deleteProduct(id: string): Promise<void> {
  await adminDb.collection("products").doc(id).delete();
}
