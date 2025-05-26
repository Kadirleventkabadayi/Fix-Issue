"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";
import { useRouter } from "next/navigation";
import { Container, Paper, Typography, Button, Box } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { getGitHubAuthUrl } from "@/lib/auth";

export default function LoginPage() {
  const [user] = useAtom(userAtom);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleGitHubLogin = () => {
    window.location.href = getGitHubAuthUrl();
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

            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                mb: 2,
                py: 1.5,
                backgroundColor: "#24292e",
                "&:hover": {
                  backgroundColor: "#1c2126",
                },
              }}
              onClick={handleGitHubLogin}
              startIcon={<GitHubIcon />}
            >
              Sign in with GitHub
            </Button>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 2, textAlign: "center" }}
            >
              By signing in, you agree to our terms of service and privacy
              policy
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
