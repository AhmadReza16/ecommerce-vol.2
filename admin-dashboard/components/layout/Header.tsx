"use client";

import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">Admin Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {user?.username ? `${user.username}` : "Admin"}
        </span>

        <button
          onClick={logout}
          className="px-3 py-1 text-sm  border rounded  text-red-600 hover:bg-red-50"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
