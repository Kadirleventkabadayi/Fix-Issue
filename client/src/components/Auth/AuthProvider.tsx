"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom, sessionAtom, isLoadingAtom } from "@/store/auth";
import { getCurrentUser, getCurrentSession, onAuthStateChange } from "@/lib/auth";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [, setUser] = useAtom(userAtom);
  const [, setSession] = useAtom(sessionAtom);
  const [, setIsLoading] = useAtom(isLoadingAtom);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      
      try {
        const [currentUser, currentSession] = await Promise.all([
          getCurrentUser(),
          getCurrentSession()
        ]);

        if (currentSession && currentUser) {
          setUser(currentUser);
          setSession(currentSession);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      
      if (session) {
        setUser(session.user);
        setSession(session);
      } else {
        setUser(null);
        setSession(null);
      }
      setIsLoading(false);
    });

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setSession, setIsLoading]);

  return <>{children}</>;
}
