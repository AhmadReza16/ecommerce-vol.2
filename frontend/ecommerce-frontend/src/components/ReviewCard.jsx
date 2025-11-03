import RatingStars from "./RatingStars";

const ReviewCard = ({ review }) => {
  const username = review?.user?.username || review?.user_name || "کاربر";
  const text = review?.comment || review?.text || "";
  const rating = review?.rating ?? 0;
  const date = review?.created_at
    ? new Date(review.created_at).toLocaleString()
    : "";

  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
            {username.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold">{username}</div>
            <div className="text-xs text-gray-500">{date}</div>
          </div>
        </div>
        <RatingStars value={rating} />
      </div>
      <p className="text-gray-700">{text}</p>
    </div>
  );
};

export default ReviewCard;
