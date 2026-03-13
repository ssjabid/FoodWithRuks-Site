import { adminDb } from "./admin";
import type { Comment } from "@/types";

function docToComment(doc: FirebaseFirestore.QueryDocumentSnapshot): Comment {
  const data = doc.data();
  return {
    id: doc.id,
    recipeId: data.recipeId,
    recipeSlug: data.recipeSlug,
    text: data.text,
    rating: data.rating,
    status: data.status || "pending",
    createdAt: data.createdAt?.toDate() || new Date(),
    ipHash: data.ipHash || "",
  };
}

export async function getAllComments(): Promise<Comment[]> {
  const snapshot = await adminDb
    .collection("comments")
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map(docToComment);
}

export async function updateCommentStatus(id: string, status: "pending" | "approved"): Promise<void> {
  await adminDb.collection("comments").doc(id).update({ status });
}

export async function deleteComment(id: string): Promise<void> {
  await adminDb.collection("comments").doc(id).delete();
}
