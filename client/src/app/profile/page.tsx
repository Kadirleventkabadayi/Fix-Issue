"use client";

import {
  Container,
  Typography,
  Paper,
  Box,
  Avatar,
  Divider,
} from "@mui/material";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";
import Layout from "@/components/Layout/Layout";
import AuthGuard from "@/components/Auth/AuthGuard";

export default function ProfilePage() {
  const [user] = useAtom(userAtom);

  if (!user) return null;

  return (
    <AuthGuard>
      <Layout>
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" gutterBottom>
            Profile
          </Typography>

          <Paper elevation={2} sx={{ p: 4 }}>
            <Box display="flex" alignItems="center" gap={3} mb={3}>
              <Avatar
                src={user.avatar_url}
                alt={user.name}
                sx={{ width: 100, height: 100 }}
              />
              <Box>
                <Typography variant="h4" gutterBottom>
                  {user.name || user.login}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  @{user.login}
                </Typography>
                {user.email && (
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                )}
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box>
              <Typography variant="h6" gutterBottom>
                Account Information
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                User ID: {user.id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This profile is connected to your GitHub account.
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Layout>
    </AuthGuard>
  );
}
