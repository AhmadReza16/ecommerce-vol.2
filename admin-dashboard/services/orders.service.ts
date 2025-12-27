import { api } from "./api";

export interface OrdersQuery {
  page?: number;
  status?: string;
}

export const ordersService = {
  getOrders(params: OrdersQuery) {
    return api.get("/orders/admin/", { params }).then(res => res.data);
  },

  getOrder(id: number) {
    return api.get(`/orders/admin/${id}/`);
  },

  updateStatus(id: number, status: string) {
    return api.patch(`/orders/admin/${id}/`, { status });
  },
};

import { OrderStatus } from '@/types/order';

export const getOrders = async (params: { page: number }) => {
  const res = await api.get('/orders/admin/', { params });
  return res.data;
};

export const updateOrderStatus = async (
  id: number,
  status: OrderStatus
) => {
  const res = await api.patch(`/orders/admin/${id}/`, { status });
  return res.data;
};
