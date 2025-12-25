"use client";

import { useState } from "react";
import { adminLogin } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminLogin(username, password);
      router.push("/users");
    } catch (err: any) {
      setError("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={submitHandler}
        className="w-96 p-6 bg-white shadow rounded"
      >
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          className="w-full border p-2 mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white py-2">Login</button>
      </form>
    </div>
  );
}
