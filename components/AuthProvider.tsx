"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, isLoaded } = useAuth();

  useEffect(() => {
    const syncUser = async () => {
      if (userId) {
        try {
          const response = await fetch("/api/auth/sync", {
            method: "POST",
          });
          if (!response.ok) {
            console.error("Failed to sync user");
          }
        } catch (error) {
          console.error("Error syncing user:", error);
        }
      }
    };

    if (isLoaded && userId) {
      syncUser();
    }
  }, [isLoaded, userId]);

  return <>{children}</>;
}