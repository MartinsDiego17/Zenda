import { create } from 'zustand'
import { supabaseClient } from '@/lib/supabaseClient'
import { Session } from '@supabase/supabase-js'
import { Profile } from '@/schemas/profile'
import { serverConfig } from '@/lib/serverConfig'
import { axiosClient } from '@/lib/axiosClient'

interface AuthStore {
  user: Profile | null,
  session: Session | null
  setSessionFromSupabase: () => Promise<Session | null | undefined>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  findOneUser: ({ userId }: { userId: string }) => Promise<Profile | null>
}

export const useAuthStore = create<AuthStore>((set) => ({

  user: null,
  session: null,

  setSessionFromSupabase: async () => {
    const { data, error } = await supabaseClient.auth.getSession()
    if (error) {
      console.error('Error getting session:', error)
      set({ session: null })
      return
    }
    set({ session: data.session })
    return data.session;
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
    window.location.href = "/";
  },

  findOneUser: async ({ userId }: { userId: string }) => {
    const localUrl = serverConfig.profile.findOne({ userId });
    try {
      const { data } = await axiosClient(localUrl);
      return data.data[0];
    } catch (error) {
      throw error;
    }
  }

}))