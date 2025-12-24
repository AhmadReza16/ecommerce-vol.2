import Table from "@/components/Table";

type Order = {
  id: number;
  user: string;
  total: number;
  status: string;
};

const orders: Order[] = [
  { id: 1, user: "admin", total: 2000, status: "Paid" },
  { id: 2, user: "user1", total: 800, status: "Pending" },
];

export default function OrdersPage() {
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
