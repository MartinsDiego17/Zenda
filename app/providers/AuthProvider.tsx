"use client"

import { useEffect } from "react"
import { supabaseClient } from "@/lib/supabaseClient"
import { useAuthStore } from "@/store/AuthStore"

export function AuthProvider({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data }) => {
      useAuthStore.setState({ session: data.session })
    })

    const { data: { subscription } } =
      supabaseClient.auth.onAuthStateChange((_event, session) => {
        useAuthStore.setState({ session })
      })

    return () => subscription.unsubscribe()
  }, [])

  return <>{children}</>
}
