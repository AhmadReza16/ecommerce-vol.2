import { createContext, useContext, useEffect, useState } from "react";
import authApi from "../api/authApi";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // initialize: if token exists, fetch profile
  useEffect(() => {
    const init = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const res = await authApi.getProfile();
        setUser(res.data);
      } catch (err) {
        // Only clear tokens if it's an auth error
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          setToken(null);
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [token]);

  const login = async (credentials) => {
    // credentials: {email/username, password}
    const res = await authApi.login(credentials);
    const access =
      res?.data?.access || res?.data?.token || res?.data?.access_token || null;
    const refresh = res?.data?.refresh || res?.data?.refresh_token || null;
    if (!access) throw new Error("No access token returned from server");
    localStorage.setItem("token", access);
    if (refresh) localStorage.setItem("refresh_token", refresh);
    setToken(access);
    // fetch profile
    try {
      const profile = await authApi.getProfile();
      setUser(profile.data);
      return profile.data;
    } catch (err) {
      setUser(null);
      throw err;
    }
  };

  const register = async (data) => {
    return authApi.register(data);
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      setToken(null);
      setUser(null);
    }
  };

  const refreshToken = async () => {
    const refresh = localStorage.getItem("refresh_token");
    if (!refresh) return null;
    try {
      const resp = await axios.post(
        "http://127.0.0.1:8000/api/users/token/refresh/",
        { refresh }
      );
      const newAccess = resp?.data?.access || resp?.data?.token || null;
      if (newAccess) {
        localStorage.setItem("token", newAccess);
        setToken(newAccess);
        return newAccess;
      }
    } catch (err) {
      // couldn't refresh -> logout
      await logout();
      return null;
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        refreshToken,
        isAuthenticated: !!token,
      }}
    >
      {!loading ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
