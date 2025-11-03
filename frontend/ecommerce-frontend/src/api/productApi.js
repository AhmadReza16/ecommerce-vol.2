import axiosClient from "./axiosClient";

const productApi = {
  getAll: () => axiosClient.get("products/"),
  getById: (id) => axiosClient.get(`products/${id}/`),
  getByCategory: (category) =>
    axiosClient.get(`products/?category=${category}`),
  search: (query) => axiosClient.get(`products/?search=${query}`),
};

export default productApi;