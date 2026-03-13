import { adminAuth } from "./admin";

export async function verifyAdminRequest(request: Request): Promise<boolean> {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) return false;

    const token = authHeader.split("Bearer ")[1];
    const decoded = await adminAuth.verifyIdToken(token);
    const adminEmails = (process.env.ADMIN_EMAIL || "").split(",").map(e => e.trim().toLowerCase());
    return adminEmails.includes(decoded.email?.toLowerCase() || "");
  } catch {
    return false;
  }
}
