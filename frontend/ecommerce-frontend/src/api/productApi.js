import axiosClient from "./axiosClient";

// Provide both convenience methods that return `res.data` and
// backward-compatible methods that return the full axios response
// because some components expect `response.data` while others call
// `.getById(...).then(res => res.data)`.
const productApi = {
  // convenience (returns parsed data)
  getProducts: async () => {
    const res = await axiosClient.get("products/");
    return res.data;
  },

  getProductDetail: async (id) => {
    const res = await axiosClient.get(`products/${id}/`);
    return res.data;
  },

  // backward-compatible raw axios response (used in some pages)
  getAll: () => axiosClient.get("products/"),
  getById: (id) => axiosClient.get(`products/${id}/`),
};

export default productApi;