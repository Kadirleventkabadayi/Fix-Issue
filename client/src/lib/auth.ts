import { supabase } from './supabase'
import type { User, Session } from '@supabase/supabase-js'

export type { User, Session }

// Helper to check if Supabase is properly configured
const isSupabaseConfigured = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL && 
         process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_project_url' &&
         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && 
         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'your_supabase_anon_key'
}

// GitHub OAuth using Supabase
export const signInWithGitHub = async () => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not properly configured. Please check your environment variables.')
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })
  
  if (error) {
    console.error('Error signing in with GitHub:', error.message)
    throw error
  }
  
  return data
}

export const signOut = async () => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not properly configured.')
  }

  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('Error signing out:', error.message)
    throw error
  }
}

export const getCurrentUser = async (): Promise<User | null> => {
  if (!isSupabaseConfigured()) {
    return null
  }

  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error) {
    console.error('Error getting current user:', error.message)
    return null
  }
  
  return user
}

export const getCurrentSession = async (): Promise<Session | null> => {
  if (!isSupabaseConfigured()) {
    return null
  }

  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error) {
    console.error('Error getting current session:', error.message)
    return null
  }
  
  return session
}

// Listen for auth state changes
export const onAuthStateChange = (callback: (event: string, session: Session | null) => void) => {
  if (!isSupabaseConfigured()) {
    // Return a mock subscription that can be unsubscribed
    return { data: { subscription: { unsubscribe: () => {} } } }
  }
  
  return supabase.auth.onAuthStateChange(callback)
}
