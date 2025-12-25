"use client";

import { useEffect, useState } from "react";
import {
  getAccessToken,
  clearTokens,
  decodeToken,
  isTokenExpired,
  DecodedToken,
} from "@/utils/token";

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: DecodedToken | null;
  loading: boolean;
}

export const useAuth = (): AuthState & { logout: () => void } => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isAdmin: false,
    user: null,
    loading: true,
  });

  useEffect(() => {
    const token = getAccessToken();

    if (!token || isTokenExpired(token)) {
      clearTokens();
      setState({
        isAuthenticated: false,
        isAdmin: false,
        user: null,
        loading: false,
      });
      return;
    }

    const decoded = decodeToken(token);

    setState({
      isAuthenticated: true,
      isAdmin: Boolean(decoded?.is_staff || decoded?.is_superuser),
      user: decoded,
      loading: false,
    });
  }, []);

  const logout = () => {
    clearTokens();
    window.location.href = "/login";
  };

  return { ...state, logout };
};
