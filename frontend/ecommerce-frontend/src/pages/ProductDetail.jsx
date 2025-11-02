import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";

const ProductDetail = () => {
  const { id } = useParams(); // گرفتن id از URL
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const { addToCart } = useCart();

  // گرفتن جزئیات محصول
  useEffect(() => {
    axiosClient.get(`products/${id}/`).then((res) => setProduct(res.data));
    axiosClient.get(`reviews/${id}/`).then((res) => setReviews(res.data));
  }, [id]);

  // ارسال نظر جدید
  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    try {
      const res = await axiosClient.post("reviews/create/", {
        product: id,
        text: newReview,
      });
      setReviews([res.data, ...reviews]);
      setNewReview("");
    } catch {
      alert("خطا در ثبت نظر");
    }
  };

  if (!product) return <p className="text-center mt-10">در حال بارگذاری...</p>;

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
              {product.price} تومان
            </p>

            <button
              onClick={() => addToCart(product.id)}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              افزودن به سبد خرید 🛒
            </button>
          </div>
        </div>

        {/* بخش نظرات */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">نظرات کاربران 💬</h2>

          <form onSubmit={handleAddReview} className="mb-6">
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="نظر خود را بنویسید..."
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows="3"
            />
            <button
              type="submit"
              className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              ثبت نظر
            </button>
          </form>

          {reviews.length === 0 ? (
            <p className="text-gray-500">هنوز نظری ثبت نشده 😐</p>
          ) : (
            <ul className="space-y-4">
              {reviews.map((r) => (
                <li
                  key={r.id}
                  className="border-b border-gray-200 pb-3 text-gray-800"
                >
                  <p className="font-semibold">
                    {r.user?.username || "کاربر ناشناس"}
                  </p>
                  <p className="text-sm">{r.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{r.created_at}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
};

export default ProductDetail;
