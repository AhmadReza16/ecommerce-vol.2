import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import productApi from "../api/productApi";
import reviewApi from "../api/reviewApi";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";

const ProductDetail = () => {
  const { id } = useParams(); // گرفتن id از URL
  const [product, setProduct] = useState(null); // get id from URL
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);

  // fetch product details and reviews
  // fetch helper used on mount and after adding reviews
  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const [pRes, rRes] = await Promise.all([
          productApi.getById(id),
          reviewApi.getReviews(id),
        ]);
        if (!mounted) return;
        setProduct(pRes.data);
        setReviews(rRes.data || []);
      } catch {
        // ignore - will show product not found or empty reviews
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, [id]);

  // submit a new review
  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    try {
      const res = await reviewApi.addReview(id, { text: newReview });
      setReviews((prev) => [res.data, ...prev]);
      setNewReview("");
    } catch {
      alert("Error submitting review");
    }
  };

  if (loading)
    return <p className="text-gray-600 text-center mt-10">Loading...</p>;
  if (!product)
    return (
      <p className="text-gray-600 text-center mt-10">Product not found.</p>
    );

  return (
    <>
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* تصویر محصول */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="rounded-2xl shadow-lg w-full h-96 object-cover"
            />
          </div>

          {/* اطلاعات محصول */}
          <div>
            <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-2xl font-semibold text-indigo-600 mb-4">
              {product.price} $
            </p>

            <button
              onClick={() => addToCart(product.id)}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Add to Cart 🛒
            </button>
          </div>
        </div>

        {/* بخش نظرات */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Your Reviews 💬</h2>

          <form onSubmit={handleAddReview} className="mb-6">
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write your review..."
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows="3"
            />
            <button
              type="submit"
              className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Submit Review
            </button>
          </form>

          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet 😐</p>
          ) : (
            <ul className="space-y-4">
              {reviews.map((r) => (
                <li
                  key={r.id}
                  className="border-b border-gray-200 pb-3 text-gray-800"
                >
                  <p className="font-semibold">
                    {r.user?.username || "Anonymous user"}
                  </p>
                  <p className="text-sm">{r.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{r.created_at}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="mt-10">
          <ReviewList productId={product.id} />
          <ReviewForm
            productId={product.id}
            onReviewAdded={async () => {
              // re-fetch product and reviews after a new review
              setLoading(true);
              try {
                const [pRes, rRes] = await Promise.all([
                  productApi.getById(product.id),
                  reviewApi.getReviews(product.id),
                ]);
                setProduct(pRes.data);
                setReviews(rRes.data || []);
              } catch {
                // ignore
              } finally {
                setLoading(false);
              }
            }}
          />
        </div>
      </main>
    </>
  );
};

export default ProductDetail;
