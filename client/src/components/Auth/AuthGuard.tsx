"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";
import { getGitHubUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { CircularProgress, Box } from "@mui/material";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("github_token");

      if (!token) {
        router.push("/login");
        return;
      }

      if (!user) {
        const userData = await getGitHubUser(token);
        if (userData) {
          setUser(userData);
        } else {
          localStorage.removeItem("github_token");
          router.push("/login");
        }
      }
    };

    checkAuth();
  }, [user, setUser, router]);

  if (!user) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
}
