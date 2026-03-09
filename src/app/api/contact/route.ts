import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (message.length < 10) {
      return NextResponse.json({ error: "Message must be at least 10 characters" }, { status: 400 });
    }

    // TODO: Save to Firestore when connection is tested
    // const { adminDb } = await import("@/lib/firebase/admin");
    // await adminDb.collection("contactMessages").add({
    //   name, email, subject, message,
    //   read: false,
    //   createdAt: new Date(),
    // });

    console.log("Contact form submission:", { name, email, subject, message: message.substring(0, 50) });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
