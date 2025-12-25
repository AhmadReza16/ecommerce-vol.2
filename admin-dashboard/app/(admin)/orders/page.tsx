import { apiFetch } from "@/lib/api";
import Table from "@/components/table/Table";

type Order = {
  id: number;
  user: string;
  total: number;
  status: string;
};

export default async function OrdersPage() {
  let orders: Order[] = [];

  try {
    orders = await apiFetch<Order[]>("/orders/");
  } catch {
    return <div className="text-red-600">Failed to load orders</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Orders</h1>

      <Table
        columns={[
          { key: "id", label: "ID" },
          { key: "user", label: "User" },
          { key: "total", label: "Total" },
          { key: "status", label: "Status" },
        ]}
        data={orders}
      />
    </div>
  );
}
