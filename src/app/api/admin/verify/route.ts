import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ isAdmin: false }, { status: 401 });
    }

    const decodedToken = await adminAuth.verifyIdToken(token);
    const userEmail = decodedToken.email;
    const adminEmails = (process.env.ADMIN_EMAIL || "").split(",").map(e => e.trim().toLowerCase());
    const isAdmin = adminEmails.includes(userEmail?.toLowerCase() || "");

    if (!isAdmin) {
      return NextResponse.json({ isAdmin: false }, { status: 403 });
    }

    return NextResponse.json({ isAdmin: true });
  } catch (error) {
    console.error("Admin verify error:", error);
    return NextResponse.json({ isAdmin: false }, { status: 401 });
  }
}
