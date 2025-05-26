"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { exchangeCodeForToken, getGitHubUser } from "@/lib/auth";
import {
  Container,
  Box,
  CircularProgress,
  Typography,
  Alert,
  Button,
} from "@mui/material";

export default function AuthCallbackPage() {
  const [, setUser] = useAtom(userAtom);
  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState("");
  const [, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get("code");
        const error = searchParams.get("error");

        setDebugInfo(`Code: ${code}, Error: ${error}`);

        if (error) {
          setError("Authentication failed: " + error);
          setLoading(false);
          return;
        }

        if (!code) {
          setError("No authorization code received.");
          setLoading(false);
          return;
        }

        setDebugInfo("Exchanging code for token...");

        // Exchange code for access token
        const token = await exchangeCodeForToken(code);

        if (!token) {
          setError(
            "Failed to get access token. Check your environment variables."
          );
          setLoading(false);
          return;
        }

        setDebugInfo("Getting user data...");

        // Get user data
        const userData = await getGitHubUser(token);

        if (userData) {
          setDebugInfo("Setting user and redirecting...");
          setUser(userData);
          localStorage.setItem("github_token", token);

          // Small delay to ensure state is updated
          setTimeout(() => {
            router.push("/");
          }, 100);
        } else {
          setError("Failed to get user information.");
          setLoading(false);
        }
      } catch (err) {
        console.error("Auth callback error:", err);
        setError("An error occurred during authentication: " + String(err));
        setLoading(false);
      }
    };

    handleCallback();
  }, [searchParams, setUser, router]);

  if (error) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          {debugInfo && (
            <Alert severity="info" sx={{ mb: 2 }}>
              Debug: {debugInfo}
            </Alert>
          )}
          <Button variant="contained" onClick={() => router.push("/login")}>
            Try Again
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CircularProgress size={60} sx={{ mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Completing sign in...
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Please wait while we verify your GitHub account.
        </Typography>
        {debugInfo && (
          <Typography variant="caption" color="text.secondary">
            {debugInfo}
          </Typography>
        )}
      </Box>
    </Container>
  );
}
