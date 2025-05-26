export interface User {
  id: string;
  login: string;
  name: string;
  avatar_url: string;
  email?: string;
}

// GitHub OAuth configuration
export const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;
export const REDIRECT_URI =
  process.env.NEXT_PUBLIC_REDIRECT_URI || "http://localhost:3000/auth/callback";

export const getGitHubUser = async (token: string): Promise<User | null> => {
  try {
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
};

export const exchangeCodeForToken = async (
  code: string
): Promise<string | null> => {
  try {
    const response = await fetch("/api/auth/github", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.access_token || null;
  } catch {
    return null;
  }
};

export const getGitHubAuthUrl = (): string => {
  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: "read:user user:email",
    state: Math.random().toString(36).substring(2, 15), // CSRF protection
  });

  return `https://github.com/login/oauth/authorize?${params.toString()}`;
};
