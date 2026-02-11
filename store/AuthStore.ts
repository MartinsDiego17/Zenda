import { create } from 'zustand'
import { supabaseClient } from '@/lib/supabaseClient'
import { Session } from '@supabase/supabase-js'

interface AuthStore {
  session: Session | null
  setSessionFromSupabase: () => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  session: null,

  setSessionFromSupabase: async () => {
    const { data, error } = await supabaseClient.auth.getSession()

    if (error) {
      console.error('Error getting session:', error)
      set({ session: null })
      return
    }

    set({ session: data.session })
  },

  loginWithGoogle: async () => {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error('Google login error:', error)
    }
  },

  logout: async () => {
    const { error } = await supabaseClient.auth.signOut()

    if (error) {
      console.error('Logout error:', error)
      return
    }

    set({ session: null })
  },
}))
