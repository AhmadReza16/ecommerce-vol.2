import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import productApi from "../api/productApi";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";
import Loader from "../components/Loader";
import { handleApiError } from "../utils/errorHandler";
import { getImageUrl } from "../utils/imageUtils";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams(); // گرفتن id از URL
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch product details on mount
  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const pRes = await productApi.getById(id);
        if (!mounted) return;
        setProduct(pRes.data);
      } catch (err) {
        if (!mounted) return;
        const errorMessage = handleApiError(err);
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <Loader />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-6 py-8 dark:bg-gray-900 dark:text-gray-200">
          <div className="text-center">
            <p className="text-red-600 text-lg dark:text-red-400">
              {error || "Product not found."}
            </p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-6 py-8 dark:bg-gray-900 dark:text-gray-200">
        <div className="grid md:grid-cols-2 gap-8">
          {/* تصویر محصول */}
          <div className="group bg-white shadow-md hover:shadow-xl transition rounded-2xl overflow-hidden border border-gray-100 relative dark:bg-gray-800 dark:border-gray-700">
            <div className="overflow-hidden">
              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                className="rounded-2xl shadow-lg w-full h-96 object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />
            </div>
          </div>

          {/* اطلاعات محصول */}
          <div>
            <div className="">
              <h3 className="text-3xl font-bold mb-3 dark:text-gray-200">
                {product.name}
              </h3>
            </div>
            <p className="text-gray-600 mb-4 dark:text-gray-400">
              {product.description}
            </p>
            <p className="text-2xl font-semibold text-indigo-600 mb-4 dark:text-indigo-400">
              {product.price} $
            </p>

            <button
              onClick={() => addToCart(product.id, 1)}
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-green-700 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 dark:bg-green-700 dark:hover:bg-green-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.293 2.293A1 1 0 007 17h10a1 1 0 00.894-.553L21 9M7 13V6h14"
                />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>

        <div className="mt-10">
          <ReviewList productId={product.id} />
          <ReviewForm
            productId={product.id}
            onReviewAdded={() => {
              // ReviewList will refresh its own reviews
            }}
          />
        </div>
      </main>
    </>
  );
};

export default ProductDetail;
