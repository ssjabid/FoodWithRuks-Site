"use client";

import { useState, useEffect, useCallback } from "react";
import { onAuthStateChanged, signInWithPopup, signOut, User } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase/config";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminChecked, setAdminChecked] = useState(false);

  const verifyAdmin = useCallback(async (firebaseUser: User) => {
    try {
      const token = await firebaseUser.getIdToken();
      const response = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      setIsAdmin(data.isAdmin === true);
    } catch {
      setIsAdmin(false);
    }
    setAdminChecked(true);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await verifyAdmin(firebaseUser);
      } else {
        setIsAdmin(false);
        setAdminChecked(true);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [verifyAdmin]);

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    await verifyAdmin(result.user);
    return result.user;
  };

  const logout = async () => {
    setIsAdmin(false);
    await signOut(auth);
  };

  return { user, loading, isAdmin, adminChecked, signInWithGoogle, logout };
}
