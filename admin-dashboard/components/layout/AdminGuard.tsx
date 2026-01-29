"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAccessToken, isTokenExpired } from "@/utils/token";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();

    // اگر مسیر login است، نیاز به check نیست
    if (pathname === "/login") {
      setLoading(false);
      return;
    }

    // اگر توکن وجود ندارد یا منقضی است
    if (!token || isTokenExpired(token)) {
      router.push("/login");
      setLoading(false);
      return;
    }

    setIsAuthenticated(true);
    setLoading(false);
  }, [pathname, router]);

  // اگر loading است
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // اگر در صفحه login است
  if (pathname === "/login") {
    return <>{children}</>;
  }

  // اگر authenticated نیست
  if (!isAuthenticated) {
    return null;
  }

  // Admin dashboard layout
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-gray-100">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
