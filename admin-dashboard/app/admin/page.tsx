export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">Users</div>
        <div className="bg-white p-6 rounded shadow">Products</div>
        <div className="bg-white p-6 rounded shadow">Orders</div>
      </div>
    </div>
  );
}
