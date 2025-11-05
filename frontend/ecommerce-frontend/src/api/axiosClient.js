import axios from "axios";


const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // Django API URL
    headers: {
    "Content-Type": "application/json",
  },
});


axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// اضافه کردن error interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // If 401 and we haven't retried yet, try to refresh token
    if (status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          // use plain axios to avoid interceptor loops
          const resp = await axios.post(
            "http://127.0.0.1:8000/api/users/token/refresh/",
            { refresh: refreshToken },
            { headers: { "Content-Type": "application/json" } }
          );
          const newToken = resp.data?.access || resp.data?.token || null;
          if (newToken) {
            localStorage.setItem("token", newToken);
            // update axiosClient headers and retry original request
            axiosClient.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return axiosClient(originalRequest);
          }
        } catch (refreshErr) {
          // refresh failed -> clear and redirect to login
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login";
          return Promise.reject(refreshErr);
        }
      }
      // no refresh token -> force logout
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;