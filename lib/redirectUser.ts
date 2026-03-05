"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/AuthStore";

export const useRedirectUser = () => {
  const findOneUser = useAuthStore((state) => state.findOneUser);
  const session = useAuthStore((state) => state.session);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleRedirect = async () => {

      // Sin sesión en rutas privadas → login
      if (!session && (pathname.startsWith("/dashboard") || pathname.startsWith("/admin"))) {
        router.replace("/login");
        return;
      }

      // Con sesión → evaluar rol para cualquier redirección
      if (session) {
        const userId = session.user.id;
        const response = await findOneUser({ userId });
        const isAdmin = response?.role === "ADMIN";

        // En rutas públicas → redirigir según rol
        if (pathname === "/" || pathname === "/login") {
          router.replace(isAdmin ? "/admin/dashboard" : "/dashboard");
          return;
        }

        // Admin intentando acceder al dashboard de usuario normal
        if (isAdmin && pathname.startsWith("/dashboard")) {
          router.replace("/admin/dashboard");
          return;
        }

        // Usuario normal intentando acceder al dashboard de admin
        if (!isAdmin && pathname.startsWith("/admin")) {
          router.replace("/dashboard");
          return;
        }
      }
    };

    handleRedirect();
  }, [session, pathname, router, findOneUser]);
};