import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getImageUrl } from "../utils/imageUtils";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    // pass product id to addToCart (backend expects product_id)
    addToCart(product.id, 1);
  };

  return (
    <div className="group bg-white shadow-md hover:shadow-xl transition rounded-2xl overflow-hidden border border-gray-100 relative dark:bg-gray-900">
      {/* تصویر محصول */}
      <div className="overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={getImageUrl(product.image)}
            alt={product.name}
            className="w-full h-60 object-cover transform group-hover:scale-110 transition duration-500"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
        </Link>
      </div>

      {/* اطلاعات */}
      <h3 className="pl-2 text-sm text-gray-700 mt-2 line-clamp-2 font-serif dark:text-white">
        {product.name}
      </h3>

      <div className="flex justify-between items-center mt-2">
        <p className="pl-2 text-indigo-600 font-bold mb-3 font-serif dark:text-indigo-700">
          ${product.price}
        </p>
      </div>

      {/* دکمه */}
      <button
        onClick={handleAdd}
        className="font-serif w-full flex items-center justify-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-green-800 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
      >
        {" "}
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
  );
};

export default ProductCard;
