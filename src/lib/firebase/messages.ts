import { adminDb } from "./admin";
import type { ContactMessage } from "@/types";

function docToMessage(doc: FirebaseFirestore.QueryDocumentSnapshot): ContactMessage {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    read: data.read || false,
    createdAt: data.createdAt?.toDate() || new Date(),
  };
}

export async function getAllMessages(): Promise<ContactMessage[]> {
  const snapshot = await adminDb
    .collection("contactMessages")
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map(docToMessage);
}

export async function markMessageRead(id: string, read: boolean): Promise<void> {
  await adminDb.collection("contactMessages").doc(id).update({ read });
}

export async function deleteMessage(id: string): Promise<void> {
  await adminDb.collection("contactMessages").doc(id).delete();
}
