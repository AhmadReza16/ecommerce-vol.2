import { FiTrash2 } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { getImageUrl } from "../utils/imageUtils";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await removeFromCart(item.id);
    } catch (err) {
      console.error("Failed to remove item:", err);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleChange = async (e) => {
    const qty = parseInt(e.target.value);
    if (qty >= 1) {
      setIsUpdating(true);
      try {
        await updateQuantity(item.id, qty);
      } catch (err) {
        console.error("Failed to update quantity:", err);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const increment = async () => {
    const newQty = (item.quantity || 1) + 1;
    setIsUpdating(true);
    try {
      await updateQuantity(item.id, newQty);
    } catch (err) {
      console.error("Failed to increment quantity:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const decrement = async () => {
    const newQty = Math.max(1, (item.quantity || 1) - 1);
    setIsUpdating(true);
    try {
      await updateQuantity(item.id, newQty);
    } catch (err) {
      console.error("Failed to decrement quantity:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const imageUrl = getImageUrl(item.product?.image);

  return (
    <div className="flex items-center justify-between py-4 dark:bg-gray-900 dark:text-gray-200">
      <div className="flex items-center space-x-4">
        <img
          src={imageUrl}
          alt={item.product?.name || "Product"}
          className="w-20 h-20 object-cover rounded-md bg-gray-100"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/80?text=No+Image";
          }}
        />
        <div>
          <h3 className="font-semibold text-gray-800 font-serif bg-white dark:bg-gray-900 dark:text-gray-200">
            {item.product?.name || "Unknown Product"}
          </h3>
          <p className="text-indigo-600 font-medium font-serif">
            ${item.product?.price || "0.00"}
          </p>
          <div className="px-2 mb-2 font-serif">
            <span
              className={`text-sm font-semibold ${
                item.product.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {item.product.stock > 0
                ? `Inventory: ${item.product.stock}`
                : "Non-existent"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Quantity control: decrement, editable input, increment */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={decrement}
            disabled={isUpdating}
            className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50 dark:bg-gray-200 dark:text-gray-800"
            aria-label="Decrease quantity"
          >
            -
          </button>

          <input
            type="number"
            value={item.quantity || 1}
            min="1"
            onChange={handleChange}
            disabled={isUpdating}
            className="font-serif w-16 text-center px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={increment}
            disabled={isUpdating}
            className="px-3 py-2 bg-gray-200  hover:bg-gray-300 rounded-lg disabled:opacity-50  dark:bg-gray-200 dark:text-gray-800"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* حذف آیتم */}
        <button
          onClick={handleRemove}
          disabled={isRemoving}
          className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
        >
          <FiTrash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
