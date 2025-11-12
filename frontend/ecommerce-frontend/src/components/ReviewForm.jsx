// src/components/ReviewForm.jsx
import { useState } from "react";
import reviewApi from "../api/reviewApi";
import { useAuth } from "../context/AuthContext";

const ReviewForm = ({ productId, onReviewAdded }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    return (
      <p className="text-gray-600 mt-4">
        Please <span className="text-indigo-600 font-medium">login</span> to
        write a review.
      </p>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await reviewApi.create({
        product: productId,
        rating,
        comment,
      });

      setComment("");
      setRating(5);
      if (onReviewAdded) onReviewAdded();
    } catch (err) {
      console.error(err);
      setError("Error submitting review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-4 mt-6"
    >
      <h3 className="text-lg font-semibold mb-3">Leave a Review</h3>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">
          Rating
        </label>
        <select
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          className="mt-1 block w-full border rounded-md p-2"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">
          Comment
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-1 block w-full border rounded-md p-2"
          rows="3"
          placeholder="Write your review here..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition "
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
