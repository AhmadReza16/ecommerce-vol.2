import type { Metadata } from "next";

import "./globals.css";

import { ToastProvider } from "@/context/ToastContext";

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
      <body>{children}</body>
    </html>
  );
}
