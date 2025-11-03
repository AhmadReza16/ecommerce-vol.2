import axiosClient from "./axiosClient";

const orderApi = {
  getOrders: () => axiosClient.get("orders/"),
  getOrderById: (id) => axiosClient.get(`orders/${id}/`),
  createOrder: (data) => axiosClient.post("orders/", data),
};

export default orderApi;