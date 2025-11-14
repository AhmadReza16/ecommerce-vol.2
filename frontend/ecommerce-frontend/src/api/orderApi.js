import axiosClient from "./axiosClient";

const orderApi = {
  getOrders: () => axiosClient.get("orders/"),
  getOrderById: (id) => axiosClient.get(`orders/${id}/`),
  // Backend expects POST to 'orders/create/'
  createOrder: (data) => axiosClient.post("orders/create/", data),
};

export default orderApi;