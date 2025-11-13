import { useState } from "react";
import { Star } from "lucide-react";
import reviewApi from "../api/reviewApi";
import { useAuth } from "../context/AuthContext";

const ReviewForm = ({ productId, onReviewAdded }) => {
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!user) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
        <p className="text-gray-700">
          Please <span className="text-indigo-600 font-semibold">login</span> to
          write a review.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || rating === 0) {
      setError("Please provide a rating and comment.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      // addReview sends {rating, comment} without product_id (it's in the URL)
      await reviewApi.addReview(productId, { rating, comment });
      setComment("");
      setRating(0);
      onReviewAdded?.(); // Reload reviews
    } catch (err) {
      console.error("Review submission error:", err);
      setError(
        err?.response?.data?.detail ||
          err?.response?.data?.comment?.[0] ||
          err?.response?.data?.rating?.[0] ||
          err.message ||
          "Failed to submit review."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-8 border border-gray-100">
      <h3 className="text-xl font-bold mb-4 text-gray-800">
        Write your comment
      </h3>

      <form onSubmit={handleSubmit}>
        {/* Rating Stars */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={32}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                className={`cursor-pointer transition-colors ${
                  star <= (hovered || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 hover:text-yellow-300"
                }`}
              />
            ))}
            {rating > 0 && (
              <span className="text-sm text-gray-600 ml-2">
                {rating} / 5 stars
              </span>
            )}
          </div>
        </div>

        {/* Comment */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Your Comment
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
            rows="4"
            placeholder="Share your thoughts about this product..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            {comment.length} / 500 characters
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            <p className="text-sm">⚠️ {error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !comment.trim() || rating === 0}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
            loading || !comment.trim() || rating === 0
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
