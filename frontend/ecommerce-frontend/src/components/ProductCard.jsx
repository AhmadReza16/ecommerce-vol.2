import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const img = product?.image || "/placeholder.png";
  const price = product?.price ?? 0;

  return (
    <div className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition">
      <img
        src={img}
        alt={product?.name}
        className="w-full h-48 object-cover rounded-xl"
      />
      <h3 className="text-lg font-semibold mt-3">{product?.name}</h3>
      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
        {product?.description}
      </p>
      <p className="font-bold text-indigo-600">{price} تومان</p>

      <div className="flex justify-between items-center mt-3">
        <Link
          to={`/product/${product?.id}`}
          className="text-sm text-indigo-500 hover:underline"
        >
          جزئیات
        </Link>
        <button
          onClick={() => addToCart(product?.id)}
          className="bg-indigo-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-indigo-700 transition"
        >
          افزودن به سبد
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
