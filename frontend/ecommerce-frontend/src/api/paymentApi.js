import axiosClient from "./axiosClient";

const paymentApi = {
  // Backend payment endpoints are under 'payment' (singular)
  payOrder: (id, data) => axiosClient.post(`payment/pay/${id}/`, data),
  verifyPayment: (id) => axiosClient.get(`payment/${id}/verify/`),
};

export default paymentApi;