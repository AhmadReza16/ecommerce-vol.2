import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product, 1);
  };

  return (
    <div className="border rounded-xl shadow-sm hover:shadow-md p-4 transition bg-white">
      {/* تصویر محصول */}
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg mb-3"
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
