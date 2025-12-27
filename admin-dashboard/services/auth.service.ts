import axios from "axios";
import { setTokens, clearTokens } from "@/utils/token";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  email: string;
  access: string;
  refresh: string;
}

// Create axios instance for auth requests
const authApi = axios.create({
  baseURL: API_BASE_URL,
});

export const authService = {
  async login(data: LoginPayload): Promise<LoginResponse> {
    try {
      const res = await authApi.post("/users/login/", data);
      setTokens(res.data.access, res.data.refresh);
      return res.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.detail ||
          error.response?.data?.non_field_errors?.[0] ||
          "Login failed"
      );
    }
  },

  logout() {
    clearTokens();
    window.location.href = "/login";
  },
};

// Alias function for backward compatibility
export const loginAdmin = async (payload: LoginPayload) => {
  return authService.login(payload);
};