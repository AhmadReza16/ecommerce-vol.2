import type { Metadata } from "next";

import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import AdminGuard from "@/components/AdminGuard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Dashboard for managing the e-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AdminGuard>
          <div className="flex min-h-screen bg-gray-200">
            <Sidebar />
            <div className="flex-1">
              <Header />
              <main className="p-6">{children}</main>
            </div>
          </div>
        </AdminGuard>
      </body>
    </html>
  );
}
