"use client";

import { useEffect, useState } from "react";
import { usersService } from "@/services/users.service";
import { productsService } from "@/services/products.service";
import { getOrders } from "@/services/orders.service";
import Loader from "@/components/feedback/Loader";

interface Stat {
  label: string;
  value: number;
  icon: string;
  color: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stat[]>([
    { label: "Users", value: 0, icon: "👥", color: "bg-blue-500" },
    { label: "Products", value: 0, icon: "📦", color: "bg-green-500" },
    { label: "Orders", value: 0, icon: "🛒", color: "bg-orange-500" },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch users count
      const usersRes = await usersService.getUsers({ page: 1 });
      const usersCount = usersRes.count || 0;

      // Fetch products count
      const productsRes = await productsService.getProducts({ page: 1 });
      const productsCount = productsRes.count || 0;

      // Fetch orders count
      const ordersRes = await getOrders({ page: 1 });
      const ordersCount = ordersRes.count || 0;

      // Update stats
      setStats([
        { label: "Users", value: usersCount, icon: "👥", color: "bg-blue-500" },
        {
          label: "Products",
          value: productsCount,
          icon: "📦",
          color: "bg-green-500",
        },
        {
          label: "Orders",
          value: ordersCount,
          icon: "🛒",
          color: "bg-orange-500",
        },
      ]);
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  {item.label}
                </p>
                <p className="text-4xl font-bold text-gray-900 mt-2">
                  {item.value.toLocaleString()}
                </p>
              </div>
              <div
                className={`${item.color} text-white text-4xl p-4 rounded-lg`}
              >
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Users:</span>
              <span className="font-semibold">{stats[0].value}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active Products:</span>
              <span className="font-semibold">{stats[1].value}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Orders:</span>
              <span className="font-semibold">{stats[2].value}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">System Status</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-sm text-gray-700">Backend Connected</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-sm text-gray-700">Database Active</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-sm text-gray-700">
                All Systems Operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
