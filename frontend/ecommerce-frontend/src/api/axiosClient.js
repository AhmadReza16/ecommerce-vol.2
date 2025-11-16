import axios from "axios";


const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/",
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
          const refreshUrl = import.meta.env.VITE_API_BASE_URL 
            ? `${import.meta.env.VITE_API_BASE_URL}/users/token/refresh/`
            : "http://127.0.0.1:8000/api/users/token/refresh/";
          const resp = await axios.post(
            refreshUrl,
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
          // refresh failed -> just clear tokens, let React handle redirect
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          return Promise.reject(refreshErr);
        }
      }
      // no refresh token -> just clear token
      localStorage.removeItem("token");
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;