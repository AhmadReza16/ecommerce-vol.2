import axiosClient from "./axiosClient";

// Backend exposes reviews at /api/reviews/<product_id>/ and a detail endpoint
// at /api/reviews/detail/<pk>/ (see backend/reviews/urls.py). Adjust calls
// accordingly so frontend and backend match.
const reviewApi = {
  getReviews: (productId) => axiosClient.get(`reviews/${productId}/`),
  addReview: (productId, data) => axiosClient.post(`reviews/${productId}/`, data),
  deleteReview: (productId, reviewId) =>
    axiosClient.delete(`reviews/detail/${reviewId}/`),
};

export default reviewApi;