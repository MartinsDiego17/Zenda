"use client";
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/AuthStore"

export const useRedirectUser = (path = "/dashboard") => {
  const session = useAuthStore(state => state.session)
  const router = useRouter()

  const current_path = window.location.pathname;

  useEffect(() => {
    if (current_path === "/dashboard" && !session) return router.replace("/");
    if (session) {
      return router.replace(path)
    }
  }, [session, path, router])
}
