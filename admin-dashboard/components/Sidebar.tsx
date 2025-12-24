import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-6 font-bold text-xl">Admin</div>

      <nav className="px-4 space-y-2">
        <Link href="/admin" className="block p-2 rounded hover:bg-gray-100">
          Dashboard
        </Link>
        <Link
          href="/admin/users"
          className="block p-2 rounded hover:bg-gray-100"
        >
          Users
        </Link>
        <Link
          href="/admin/products"
          className="block p-2 rounded hover:bg-gray-100"
        >
          Products
        </Link>
        <Link
          href="/admin/orders"
          className="block p-2 rounded hover:bg-gray-100"
        >
          Orders
        </Link>
      </nav>
    </aside>
  );
}
