"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/AuthStore";

export const useRedirectUser = (redirectTo = "/dashboard") => {
  const findOneUser = useAuthStore((state) => state.findOneUser);
  const session = useAuthStore((state) => state.session);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleRedirect = async () => {
      // Usuario no logueado intentando entrar al dashboard
      if (!session && pathname.startsWith("/dashboard")) {
        router.replace("/");
        return;
      }

      // Usuario logueado en home
      if (session && pathname === "/") {
        router.replace(redirectTo);
        return;
      }

      if (session) {
        const userId = session.user.id;
        const response = await findOneUser({ userId });

        if (response?.role === "ADMIN") {
          if (pathname.startsWith("/admin/dashboard")) return
          router.replace("/admin/dashboard")
        }
      }

    };

    handleRedirect();
  }, [session, pathname, redirectTo, router, findOneUser]);
};