"use client";

import {
  Container,
  Typography,
  Paper,
  Box,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";
import { signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout/Layout";
import AuthGuard from "@/components/Auth/AuthGuard";

export default function ProfilePage() {
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  if (!user) return null;

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

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
                src={user.user_metadata?.avatar_url}
                alt={user.user_metadata?.full_name || user.email}
                sx={{ width: 100, height: 100 }}
              />
              <Box>
                <Typography variant="h4" gutterBottom>
                  {user.user_metadata?.full_name || user.user_metadata?.name || 'User'}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  @{user.user_metadata?.user_name || user.user_metadata?.preferred_username}
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
              <Typography variant="body2" color="text.secondary" paragraph>
                This profile is connected to your GitHub account.
              </Typography>
              
              <Button 
                variant="outlined" 
                color="error" 
                onClick={handleSignOut}
                sx={{ mt: 2 }}
              >
                Sign Out
              </Button>
            </Box>
          </Paper>
        </Container>
      </Layout>
    </AuthGuard>
  );
}
