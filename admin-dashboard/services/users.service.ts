import { api } from "./api";

export interface UsersQuery {
  page?: number;
  search?: string;
}

export const usersService = {
  getUsers(params: UsersQuery) {
    return api.get("/admin/users/", { params });
  },

  deleteUser(userId: number) {
    return api.delete(`/admin/users/${userId}/`);
  },

  toggleActive(userId: number) {
    return api.patch(`/admin/users/${userId}/toggle-active/`);
  },

  toggleStaff(userId: number) {
    return api.patch(`/admin/users/${userId}/toggle-staff/`);
  },
};
