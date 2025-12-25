import axios from "axios";
import { setTokens, clearTokens } from "@/utils/token";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface LoginPayload {
  username: string;
  password: string;
}

export const authService = {
  async login(data: LoginPayload) {
    const res = await axios.post(
      `${API_BASE_URL}/auth/token/`,
      data
    );

    setTokens(res.data.access, res.data.refresh);
    return res.data;
  },

  logout() {
    clearTokens();
    window.location.href = "/login";
  },
};
