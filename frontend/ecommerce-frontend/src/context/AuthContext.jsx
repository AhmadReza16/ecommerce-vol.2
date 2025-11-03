import { createContext, useContext, useEffect, useState } from "react";
import authApi from "../api/authApi";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // در صورتی که توکن داشته باشیم، پروفایل رو می‌گیریم
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        // axiosClient خودش header رو از localStorage می‌خواند (interceptor)
        const res = await authApi.getProfile();
        setUser(res.data);
      } catch (err) {
        // توکن باطل / خطا -> پاک میکنیم
        localStorage.removeItem("access_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = async (credentials) => {
    // credentials: {email/username, password}
    const res = await authApi.login(credentials);
    // انتظار داریم سرور access token را در res.data.access برگرداند
    const token = res?.data?.access || res?.data?.token || null;
    if (!token) throw new Error("No access token returned from server");
    localStorage.setItem("access_token", token);
    // force axiosClient interceptor to use new token (it reads localStorage on each request)
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
    // data: {username, email, password, ...}
    return authApi.register(data);
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      // ignore server logout errors
    } finally {
      localStorage.removeItem("access_token");
      setUser(null);
    }
  };

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const res = await axiosClient.post("users/token/refresh/", {
        refresh: refreshToken,
      });
      setToken(res.data.access);
      localStorage.setItem("token", res.data.access);
    } catch {
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, refreshToken }}
    >
      {!loading ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
