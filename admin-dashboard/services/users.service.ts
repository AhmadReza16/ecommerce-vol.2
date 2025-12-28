import { api } from "./api";

export interface UsersQuery {
  page?: number;
  search?: string;
}

export const usersService = {
  getUsers(params: UsersQuery) {
    return api.get("/users/", { params }).then(res => res.data);
  },

  deleteUser(userId: number) {
    return api.delete(`/users/${userId}/delete/`);
  },

  toggleActive(userId: number) {
    return api.patch(`/users/${userId}/toggle/`);
  },

  toggleStaff(userId: number) {
    return api.patch(`/users/${userId}/toggle-staff/`);
  },
};
