"use client";

import { useEffect, useState, Suspense } from "react";
import { useAtom } from "jotai";
import { userAtom, isLoadingAtom } from "@/store/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { Container, Paper, Typography, Button, Box, Alert, CircularProgress } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { signInWithGitHub, getCurrentUser } from "@/lib/auth";

function LoginContent() {
  const [user, setUser] = useAtom(userAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [error, setError] = useState<string | null>(null);
  const [loginInProgress, setLoginInProgress] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for auth errors in URL params
    const authError = searchParams.get('error');
    if (authError === 'auth_failed') {
      setError('Authentication failed. Please try again.');
    } else if (authError === 'oauth_failed') {
      setError('OAuth authentication failed. Please try again.');
    }

    // Check if user is already logged in
    const checkUser = async () => {
      setIsLoading(true);
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          router.push("/");
        }
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, [user, router, searchParams, setUser, setIsLoading]);

  const handleGitHubLogin = async () => {
    try {
      setError(null);
      setLoginInProgress(true);
      await signInWithGitHub();
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to sign in with GitHub. Please try again.');
      setLoginInProgress(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <GitHubIcon sx={{ fontSize: 60, mb: 2, color: "#333" }} />
            
            {user ? (
              <>
                <Typography component="h1" variant="h4" gutterBottom>
                  Already Signed In
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 4, textAlign: "center" }}
                >
                  You are already signed in. Redirecting to home page...
                </Typography>
                <CircularProgress />
              </>
            ) : (
              <>
                <Typography component="h1" variant="h4" gutterBottom>
                  Welcome
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 4, textAlign: "center" }}
                >
                  Sign in with your GitHub account to continue
                </Typography>

                {error && (
                  <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
                    {error}
                  </Alert>
                )}

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isLoading || loginInProgress || !!user}
                  sx={{
                    mt: 2,
                    mb: 2,
                    py: 1.5,
                    backgroundColor: "#24292e",
                    "&:hover": {
                      backgroundColor: "#1c2126",
                    },
                    "&:disabled": {
                      backgroundColor: "#888",
                    },
                  }}
                  onClick={handleGitHubLogin}
                  startIcon={loginInProgress ? <CircularProgress size={20} color="inherit" /> : <GitHubIcon />}
                >
                  {loginInProgress ? 'Signing in...' : 'Sign in with GitHub'}
                </Button>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 2, textAlign: "center" }}
                >
                  By signing in, you agree to our terms of service and privacy
                  policy
                </Typography>
              </>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    }>
      <LoginContent />
    </Suspense>
  );
}
