"use client";

import { useEffect, useState } from "react";

import Table from "@/components/table/Table";
import Pagination from "@/components/table/Pagination";
import Loader from "@/components/feedback/Loader";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

import { getOrders, updateOrderStatus } from "@/services/orders.service";
import { Order, OrderStatus } from "@/types/order";
import { useConfirm } from "@/hooks/useConfirm";
import OrderDetailModal from "@/components/modal/OrderDetailModal";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const pageSize = 10;
  const { confirm } = useConfirm();

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getOrders({ page });
      setOrders(res.results);
      setTotal(res.count);
    } catch {
      console.error("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatus = async (order: Order, status: OrderStatus) => {
    const ok = await confirm({
      title: "Change Order Status",
      message: `Change status of order #${order.id}?`,
      confirmText: "Confirm",
    });

    if (!ok) return;

    try {
      await updateOrderStatus(order.id, status);

      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, status } : o)),
      );
    } catch {
      console.error("Error changing order status");
    }
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const statusColor = (status: OrderStatus) => {
    switch (status) {
      case "paid":
        return "blue";
      case "shipped":
        return "green";
      case "delivered":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  const columns = [
    { key: "id", label: "Order ID" },
    { key: "user_email", label: "Customer Email" },
    { key: "total_price", label: "Total Price ($)" },
    {
      key: "status",
      label: "Status",
      render: (value: OrderStatus) => (
        <Badge color={statusColor(value)}>{value}</Badge>
      ),
    },
    {
      key: "created_at",
      label: "Created At",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_: any, row: Order) => (
        <div className="flex gap-2 flex-wrap">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleViewDetails(row)}
          >
            Details
          </Button>

          {row.status === "pending" && (
            <Button size="sm" onClick={() => handleChangeStatus(row, "paid")}>
              Mark Paid
            </Button>
          )}

          {row.status === "paid" && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleChangeStatus(row, "shipped")}
            >
              Mark Shipped
            </Button>
          )}

          {row.status === "shipped" && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleChangeStatus(row, "delivered")}
            >
              Mark Delivered
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Orders</h1>

      {loading ? (
        <Loader />
      ) : (
        <>
          <Table
            columns={columns}
            data={orders}
            keyExtractor={(item) => item.id}
          />

          <Pagination
            currentPage={page}
            totalItems={total}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </>
      )}

      {selectedOrder && (
        <OrderDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          order={selectedOrder}
        />
      )}
    </div>
  );
}
