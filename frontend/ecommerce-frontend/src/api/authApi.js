import axiosClient from "./axiosClient";

const authApi = {
  register: (data) => axiosClient.post("users/register/", data),
  login: (data) => axiosClient.post("users/login/", data),
  logout: () => axiosClient.post("users/logout/"),
  getProfile: () => axiosClient.get("users/profile/"),
  updateProfile: (data) => axiosClient.put("users/profile/", data),
};

export default authApi;
