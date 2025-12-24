export default function Header() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <span className="font-semibold">Admin Dashboard</span>

      <button className="text-sm text-red-600 hover:underline">Logout</button>
    </header>
  );
}
