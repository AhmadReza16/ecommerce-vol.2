import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // گرفتن اطلاعات کاربر وقتی لاگین هست
  useEffect(() => {
    if (token) {
      axiosClient
        .get("users/me/")
        .then((res) => setUser(res.data))
        .catch(() => logout());
    }
    setLoading(false);
  }, [token]);

  // ثبت‌نام کاربر
  const register = async (data) => {
    try {
      const res = await axiosClient.post("users/register/", data);
      toast.success("ثبت‌نام موفق!");
      return res.data;
    } catch (err) {
      toast.error("خطا در ثبت‌نام");
      throw err;
    }
  };

  // ورود
  const login = async (data) => {
    try {
      const res = await axiosClient.post("users/login/", data);
      setToken(res.data.access);
      localStorage.setItem("token", res.data.access);
      await fetchUser();
      toast.success("با موفقیت وارد شدید");
    } catch {
      toast.error("ایمیل یا رمز اشتباه است");
    }
  };

  // گرفتن اطلاعات کاربر بعد از لاگین
  const fetchUser = async () => {
    const res = await axiosClient.get("users/me/");
    setUser(res.data);
  };

  // خروج
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    toast.info("از حساب خارج شدید");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        register,
        loading,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
