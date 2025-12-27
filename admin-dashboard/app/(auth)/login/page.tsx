"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { authService } from "@/services/auth.service";
import { setTokens } from "@/utils/token";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      setLoading(true);

      const data = await authService.login({
        email,
        password,
      });

      /**
       * انتظار داریم از بک‌اند:
       * {
       *   access: string;
       *   refresh: string;
       *   user: { is_staff: boolean; ... }
       * }
       */

      if (!data.email) {
        throw new Error("You don't have admin access");
      }

      setTokens(data.access, data.refresh);

      router.replace("/admin");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(
        err.message ||
          err?.response?.data?.detail ||
          err?.response?.data?.non_field_errors?.[0] ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow"
      >
        <h1 className="text-xl font-semibold text-center mb-6"> Admin Login</h1>

        <div className="space-y-4">
          <Input
            label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <Button
            type="submit"
            isLoading={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
