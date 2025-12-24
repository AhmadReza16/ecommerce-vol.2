import Link from "next/link";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Users", href: "/admin/users" },
  { label: "Products", href: "/admin/products" },
  { label: "Orders", href: "/admin/orders" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen">
      <div className="p-6 text-xl font-bold border-b border-slate-700">
        Admin Panel
      </div>

      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded px-3 py-2 hover:bg-slate-700 transition"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
