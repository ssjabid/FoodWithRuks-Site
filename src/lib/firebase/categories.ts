import { adminDb } from "./admin";
import type { Category } from "@/types";

function docToCategory(doc: FirebaseFirestore.QueryDocumentSnapshot): Category {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    slug: data.slug,
    description: data.description || "",
    image: data.image || "",
    order: data.order || 0,
    recipeCount: data.recipeCount || 0,
  };
}

export async function getCategories(): Promise<Category[]> {
  const snapshot = await adminDb
    .collection("categories")
    .orderBy("order", "asc")
    .get();

  return snapshot.docs.map(docToCategory);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const snapshot = await adminDb
    .collection("categories")
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (snapshot.empty) return null;
  return docToCategory(snapshot.docs[0]);
}
