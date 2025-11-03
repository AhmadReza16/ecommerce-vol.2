// src/components/CartItem.jsx
import { Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const handleChange = (e) => {
    const qty = parseInt(e.target.value);
    if (qty >= 1) {
      updateQuantity(item.id, qty);
    }
  };

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center space-x-4">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-20 h-20 object-cover rounded-md"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
          <p className="text-indigo-600 font-medium">${item.product.price}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* تغییر تعداد */}
        <input
          type="number"
          value={item.quantity}
          min="1"
          onChange={handleChange}
          className="w-16 border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* حذف آیتم */}
        <button
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 transition"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
