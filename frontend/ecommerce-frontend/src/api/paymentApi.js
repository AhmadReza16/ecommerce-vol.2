import axiosClient from "./axiosClient";

const paymentApi = {
  payOrder: (id, data) => axiosClient.post(`payments/${id}/pay/`, data),
  verifyPayment: (id) => axiosClient.get(`payments/${id}/verify/`),
};

export default paymentApi;