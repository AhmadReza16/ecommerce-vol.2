import { useState, useEffect } from "react";
import { Star, Trash2 } from "lucide-react";
import reviewApi from "../api/reviewApi";
import { useAuth } from "../context/AuthContext";

const ReviewList = ({ productId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await reviewApi.getReviews(productId);
        const reviewsData = Array.isArray(res.data)
          ? res.data
          : res.data?.results || [];
        setReviews(reviewsData);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [productId]);

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await reviewApi.deleteReview(productId, reviewId);
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    } catch (err) {
      console.error("Error deleting review:", err);
      setError("Failed to delete review.");
    }
  };

  const renderStars = (rating) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }
        />
      ))}
    </div>
  );

  if (loading) {
    return (
      <p className="text-gray-500 dark:text-gray-400 text-center mt-6">
        Loading reviews...
      </p>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg mt-6">
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mt-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          No reviews yet. Be the first to review this product! 🌟
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Customer Reviews ({reviews.length})
      </h3>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            {/* Header: User name and rating */}
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  {review.user_name || "Anonymous"}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {renderStars(review.rating)}
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {review.rating}/5
                  </span>
                </div>
              </div>

              {/* Delete button if user is the reviewer */}
              {user?.id === review.user && (
                <button
                  onClick={() => handleDelete(review.id)}
                  className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900 p-2 rounded transition"
                  title="Delete review"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>

            {/* Comment */}
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
              {review.comment}
            </p>

            {/* Date */}
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {new Date(review.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
