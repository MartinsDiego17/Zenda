"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/AuthStore";
import { PropsFetchAdminUser } from "@/schemas/responseFetchAdminUser";

export const useRedirectUser = (redirectTo = "/dashboard") => {
  const getAdminUser = useAuthStore((state) => state.getAdminUser);
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
        const response = await getAdminUser({ adminUserId: userId });

        if (response?.role === "ADMIN") router.replace("/dashboard/admin");
      }
    };

    handleRedirect();
  }, [session, pathname, redirectTo, router, getAdminUser]);
};