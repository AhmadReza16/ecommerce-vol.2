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
    <div className="group bg-white shadow-md hover:shadow-xl transition rounded-2xl overflow-hidden border border-gray-100 relative">
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
      <h3 className="pl-2 text-sm text-gray-700 mt-2 line-clamp-2 font-serif">
        {product.name}
      </h3>

      <div className="flex justify-between items-center mt-2">
        <p className="pl-2 text-indigo-600 font-bold mb-3 font-serif">
          ${product.price}
        </p>
      </div>

      {/* نمایش موجودی */}
      <div className="px-2 mb-2 font-serif">
        <span
          className={`text-sm font-semibold ${
            product.stock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.stock > 0 ? `Inventory: ${product.stock}` : "Non-existent"}
        </span>
      </div>

      {/* دکمه */}
      <button
        onClick={handleAdd}
        disabled={product.stock === 0}
        className={`font-serif w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold shadow-md transition-all duration-300 ${
          product.stock > 0
            ? "bg-green-700 text-white hover:bg-green-800 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            : "bg-gray-400 text-white cursor-not-allowed opacity-60"
        }`}
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
        {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
};

export default ProductCard;
