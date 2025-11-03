import axiosClient from "./axiosClient";

const reviewApi = {
  getReviews: (productId) => axiosClient.get(`products/${productId}/reviews/`),
  addReview: (productId, data) =>
    axiosClient.post(`products/${productId}/reviews/`, data),
  deleteReview: (productId, reviewId) =>
    axiosClient.delete(`products/${productId}/reviews/${reviewId}/`),
};

export default reviewApi;