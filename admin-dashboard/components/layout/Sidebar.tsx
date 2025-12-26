"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const menuItems = [
  { label: "Dashboard", href: "/" },
  { label: "Users", href: "/users" },
  { label: "Products", href: "/products" },
  { label: "Orders", href: "/orders" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6 text-xl font-bold border-b border-gray-700">
        Admin Panel
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "block px-4 py-2 rounded transition",
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
