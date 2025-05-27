"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  Container,
  Box,
  CircularProgress,
  Typography,
  Alert,
} from "@mui/material";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check for OAuth error in URL params
        const errorParam = searchParams.get('error');
        if (errorParam) {
          console.error('OAuth error:', errorParam);
          setError('Authentication failed. Please try again.');
          setTimeout(() => router.push('/login'), 3000);
          return;
        }

        // Check for the code parameter
        const code = searchParams.get('code');
        if (code) {
          // Exchange the code for a session
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          
          if (exchangeError) {
            console.error('Error exchanging code for session:', exchangeError);
            setError('Failed to complete authentication. Please try again.');
            setTimeout(() => router.push('/login'), 3000);
            return;
          }

          // Check if we have a valid session after exchange
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();
          
          if (sessionError) {
            console.error('Error getting session:', sessionError);
            setError('Authentication session error. Please try again.');
            setTimeout(() => router.push('/login'), 3000);
            return;
          }

          if (session) {
            // Successfully authenticated, wait a moment for auth state to propagate
            console.log('Authentication successful, redirecting to home...');
            setTimeout(() => {
              router.push('/');
            }, 500);
          } else {
            // No session found, redirect to login
            router.push('/login');
          }
        } else {
          // No code parameter, this might be a direct access
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        setError('An unexpected error occurred. Please try again.');
        setTimeout(() => router.push('/login'), 3000);
      }
    };

    handleAuthCallback();
  }, [router, searchParams]);

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        gap={2}
      >
        {error ? (
          <>
            <Alert severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
            <Typography variant="body2" color="text.secondary">
              Redirecting to login page...
            </Typography>
          </>
        ) : (
          <>
            <CircularProgress />
            <Typography variant="h6">
              Completing authentication...
            </Typography>
          </>
        )}
      </Box>
    </Container>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          gap={2}
        >
          <CircularProgress />
          <Typography variant="h6">
            Loading...
          </Typography>
        </Box>
      </Container>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}