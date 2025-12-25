const stats = [
  { label: "Users", value: 120 },
  { label: "Products", value: 45 },
  { label: "Orders", value: 230 },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item) => (
          <div key={item.label} className="bg-white rounded shadow p-6">
            <p className="text-gray-500">{item.label}</p>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
