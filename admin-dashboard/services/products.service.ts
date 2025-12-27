import { api } from "./api";

export interface ProductsQuery {
  page?: number;
  search?: string;
}

export const productsService = {
  getProducts(params: ProductsQuery) {
    return api.get("/products/admin/", { params }).then(res => res.data);
  },

  getProduct(id: number) {
    return api.get(`/products/admin/${id}/`);
  },

  createProduct(data: FormData) {
    return api.post("/products/admin/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  updateProduct(id: number, data: FormData) {
    return api.put(`/products/admin/${id}/`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  deleteProduct(id: number) {
    return api.delete(`/products/admin/${id}/`);
  },

  toggleActive(id: number) {
    return api.patch(`/products/admin/${id}/toggle-active/`);
  },
};