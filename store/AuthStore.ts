import { create } from 'zustand'
import { supabaseClient } from '@/lib/supabaseClient'
import { Session } from '@supabase/supabase-js'
import { Profile } from '@/schemas/profile'
import { serverConfig } from '@/lib/serverConfig'
import axios from 'axios'

interface AuthStore {
  adminUser: Profile | null,
  session: Session | null
  setSessionFromSupabase: () => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  getAdminUser: ({ adminUserId }: { adminUserId: string }) => Promise<Profile | null>
}

export const useAuthStore = create<AuthStore>((set) => ({

  adminUser: null,
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
  getAdminUser: async ({ adminUserId }: { adminUserId: string }) => {

    const localUrl = serverConfig.profile.findOne({ adminUserId });

    try {
      const { data } = await axios(localUrl);
      return data.data[0];
    } catch (error) {
      throw error;
    }

    return null
  }
}))
