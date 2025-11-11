// src/components/CartItem.jsx
import { FiTrash2 } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useState } from "react";

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

  // Get image URL with fallback - handle both relative and absolute URLs
  const getImageUrl = (imageField) => {
    if (!imageField) return "https://via.placeholder.com/80?text=No+Image";

    // If it's already an absolute URL (http/https), use as-is
    if (imageField.startsWith("http://") || imageField.startsWith("https://")) {
      return imageField;
    }

    // If it's a relative path (e.g., /media/...), prepend base URL
    if (imageField.startsWith("/")) {
      return `http://127.0.0.1:8000${imageField}`;
    }

    // Fallback
    return "https://via.placeholder.com/80?text=No+Image";
  };

  const imageUrl = getImageUrl(item.product?.image);

  return (
    <div className="flex items-center justify-between border-b py-4">
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
          <h3 className="font-semibold text-gray-800">
            {item.product?.name || "Unknown Product"}
          </h3>
          <p className="text-indigo-600 font-medium">
            ${item.product?.price || "0.00"}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* تغییر تعداد */}
        <input
          type="number"
          value={item.quantity || 1}
          min="1"
          onChange={handleChange}
          disabled={isUpdating}
          className="w-16 border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
        />

        {/* حذف آیتم */}
        <button
          onClick={handleRemove}
          disabled={isRemoving}
          className="text-red-500 hover:text-red-700 transition disabled:opacity-50"
        >
          <FiTrash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
