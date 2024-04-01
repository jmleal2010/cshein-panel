"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import Cookies from "js-cookie";
import {AUTH_TOKEN} from "@/config/consts";

type AuthTokens = {
  token: string;
  refreshToken: string;
};

export const AuthContext = createContext({
  login: (authTokens: AuthTokens) => {},
  logout: () => {},
});

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const login = useCallback((authTokens: AuthTokens) => {
    Cookies.set(AUTH_TOKEN, JSON.stringify(authTokens))
  }, []);

  const logout = useCallback(() => {
    Cookies.remove(AUTH_TOKEN)
  }, []);

  const value = useMemo(
    () => ({
      login,
      logout,
    }),
    [login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
