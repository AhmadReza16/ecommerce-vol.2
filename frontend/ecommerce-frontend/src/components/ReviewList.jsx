import { useEffect, useState } from "react";
import reviewApi from "../api/reviewApi";

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await reviewApi.list(productId);
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  if (loading) return <p className="text-gray-500">Loading reviews...</p>;
  if (reviews.length === 0)
    return <p className="text-gray-500">No reviews yet.</p>;

  return (
    <div className="space-y-4 mt-4">
      <h3 className="text-lg font-semibold border-b pb-2">Customer Reviews</h3>
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-gray-50 p-4 rounded-lg shadow-sm border"
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-800">
              {review.user.username}
            </h4>
            <p className="text-yellow-500">⭐ {review.rating}/5</p>
          </div>
          <p className="text-gray-700">{review.comment}</p>
          <p className="text-gray-400 text-sm mt-1">
            {new Date(review.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
