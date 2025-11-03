import axiosClient from "./axiosClient";

const cartApi = {
  getCart: () => axiosClient.get("cart/"),
  addItem: (data) => axiosClient.post("cart/add/", data),
  removeItem: (id) => axiosClient.delete(`cart/remove/${id}/`),
  updateItem: (id, data) => axiosClient.put(`cart/update/${id}/`, data),
  clearCart: () => axiosClient.post("cart/clear/"),
};

export default cartApi;