"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider, useAtom } from "jotai";
import { themeAtomWithPersistence } from "@/store/atoms";
import { useMemo, useEffect } from "react";

function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useAtom(themeAtomWithPersistence);

  // Initialize theme from localStorage on client side
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme && savedTheme !== themeMode) {
      setThemeMode(savedTheme);
    }
  }, [themeMode, setThemeMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          primary: {
            main: themeMode === 'light' ? "#1976d2" : "#90caf9",
          },
          secondary: {
            main: themeMode === 'light' ? "#dc004e" : "#f48fb1",
          },
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: themeMode === 'light' ? "#1976d2" : "#1e1e1e",
              },
            },
          },
        },
      }),
    [themeMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <ThemeProviderWrapper>
            {children}
          </ThemeProviderWrapper>
        </Provider>
      </body>
    </html>
  );
}
