import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const getImageUrl = (imageField) => {
    if (!imageField) return "https://via.placeholder.com/400x300?text=No+Image";
    if (imageField.startsWith("http")) return imageField;
    if (imageField.startsWith("/")) return "http://127.0.0.1:8000" + imageField;
    return "http://127.0.0.1:8000" + imageField;
  };

  const handleAdd = () => {
    // pass product id to addToCart (backend expects product_id)
    addToCart(product.id, 1);
  };

  return (
    <div className="border rounded-xl shadow-sm hover:shadow-md p-4 transition bg-white">
      {/* تصویر محصول */}
      <Link to={`/product/${product.id}`}>
        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg mb-3"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
          }}
        />
      </Link>

      {/* اطلاعات */}
      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        {product.name}
      </h3>
      <p className="text-indigo-600 font-bold mb-3">${product.price}</p>

      {/* دکمه */}
      <button
        onClick={handleAdd}
        className="bg-indigo-600 text-white w-full py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
