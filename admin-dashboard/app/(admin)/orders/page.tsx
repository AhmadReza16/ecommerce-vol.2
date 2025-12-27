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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const pageSize = 10;
  const confirm = useConfirm();

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
      console.error("خطا در دریافت سفارش‌ها");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatus = async (order: Order, status: OrderStatus) => {
    const ok = await confirm({
      title: "تغییر وضعیت سفارش",
      message: `وضعیت سفارش #${order.id} تغییر کند؟`,
      confirmText: "تایید",
    });

    if (!ok) return;

    try {
      await updateOrderStatus(order.id, status);

      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, status } : o))
      );
    } catch {
      console.error("خطا در تغییر وضعیت سفارش");
    }
  };

  const statusColor = (status: OrderStatus) => {
    switch (status) {
      case "paid":
        return "blue";
      case "shipped":
        return "green";
      default:
        return "gray";
    }
  };

  const columns = [
    { key: "id", label: "شماره سفارش" },
    { key: "user", label: "کاربر" },
    { key: "total_price", label: "مبلغ (تومان)" },
    {
      key: "status",
      label: "وضعیت",
      render: (value: OrderStatus) => (
        <Badge color={statusColor(value)}>{value}</Badge>
      ),
    },
    { key: "created_at", label: "تاریخ" },
    {
      key: "actions",
      label: "عملیات",
      render: (_: any, row: Order) => (
        <div className="flex gap-2">
          {row.status === "pending" && (
            <Button size="sm" onClick={() => handleChangeStatus(row, "paid")}>
              پرداخت شد
            </Button>
          )}

          {row.status === "paid" && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleChangeStatus(row, "shipped")}
            >
              ارسال شد
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">سفارش‌ها</h1>

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
    </div>
  );
}
