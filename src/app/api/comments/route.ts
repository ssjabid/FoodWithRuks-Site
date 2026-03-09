import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { recipeId, recipeSlug, text, rating } = await request.json();

    // Validation
    if (!recipeId || !recipeSlug || !text || !rating) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (text.length < 10) {
      return NextResponse.json({ error: "Comment must be at least 10 characters" }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }

    // TODO: Save to Firestore when connection is tested
    // const { adminDb } = await import("@/lib/firebase/admin");
    // await adminDb.collection("comments").add({
    //   recipeId, recipeSlug, text, rating,
    //   status: "pending",
    //   createdAt: new Date(),
    //   ipHash: "",
    // });

    console.log("Comment submission:", { recipeSlug, rating, text: text.substring(0, 50) });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
