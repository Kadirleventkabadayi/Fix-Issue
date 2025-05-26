"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("github_token");
    router.push("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
            My App
          </Link>
        </Typography>

        {user && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Link
              href="/profile"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Button color="inherit">Profile</Button>
            </Link>
            <Avatar
              src={user.avatar_url}
              alt={user.name}
              sx={{ width: 32, height: 32 }}
            />
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
