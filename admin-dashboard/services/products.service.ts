import { api } from "./api";

export interface ProductsQuery {
  page?: number;
  search?: string;
}

export const productsService = {
  getProducts(params: ProductsQuery) {
    return api.get("/admin/products/", { params });
  },

  getProduct(id: number) {
    return api.get(`/admin/products/${id}/`);
  },

  createProduct(data: FormData) {
    return api.post("/admin/products/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  updateProduct(id: number, data: FormData) {
    return api.put(`/admin/products/${id}/`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  deleteProduct(id: number) {
    return api.delete(`/admin/products/${id}/`);
  },

  toggleActive(id: number) {
    return api.patch(`/admin/products/${id}/toggle-active/`);
  },
};