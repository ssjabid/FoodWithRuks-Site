import { adminAuth } from "./admin";

export async function verifyAdminRequest(request: Request): Promise<boolean> {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) return false;

    const token = authHeader.split("Bearer ")[1];
    const decoded = await adminAuth.verifyIdToken(token);
    return decoded.email === process.env.ADMIN_EMAIL;
  } catch {
    return false;
  }
}
