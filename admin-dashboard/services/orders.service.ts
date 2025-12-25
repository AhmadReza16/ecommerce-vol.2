import { api } from "./api";

export interface OrdersQuery {
  page?: number;
  status?: string;
}

export const ordersService = {
  getOrders(params: OrdersQuery) {
    return api.get("/admin/orders/", { params });
  },

  getOrder(id: number) {
    return api.get(`/admin/orders/${id}/`);
  },

  updateStatus(id: number, status: string) {
    return api.patch(`/admin/orders/${id}/status/`, { status });
  },
};
