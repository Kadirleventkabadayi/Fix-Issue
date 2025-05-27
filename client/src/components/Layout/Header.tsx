"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";
import { themeAtomWithPersistence } from "@/store/atoms";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth";
import Link from "next/link";

export default function Header() {
  const [user, setUser] = useAtom(userAtom);
  const [themeMode, setThemeMode] = useAtom(themeAtomWithPersistence);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  const toggleTheme = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {" "}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
            My App
          </Link>
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip
            title={`Switch to ${themeMode === "light" ? "dark" : "light"} mode`}
          >
            <IconButton color="inherit" onClick={toggleTheme}>
              {themeMode === "light" ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
          </Tooltip>

          {user && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Link
                href="/profile"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Button color="inherit">Profile</Button>
              </Link>
              <Avatar
                src={user.user_metadata?.avatar_url}
                alt={user.user_metadata?.full_name || user.email}
                sx={{ width: 32, height: 32 }}
              />
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
