import type { Metadata } from "next";

import { ToastProvider } from "@/context/ToastContext";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import AdminGuard from "@/components/layout/AdminGuard";

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
        <ToastProvider>
          <AdminGuard>
            <div className="flex min-h-screen bg-gray-200">
              <Sidebar />
              <div className="flex-1">
                <Header />
                <main className="p-6">{children}</main>
              </div>
            </div>
          </AdminGuard>
        </ToastProvider>
      </body>
    </html>
  );
}
