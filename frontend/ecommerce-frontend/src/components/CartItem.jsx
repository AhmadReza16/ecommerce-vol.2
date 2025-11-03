import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const image = item.product?.image || item.image || "/placeholder.png";
  const name = item.product?.name || item.name || "محصول";
  const price = item.product?.price ?? item.price ?? 0;
  const qty = item.quantity ?? 1;

  return (
    <tr className="border-b">
      <td className="py-3 px-2 flex items-center gap-4">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <span>{name}</span>
      </td>
      <td className="py-3 px-2">{price} تومان</td>
      <td className="py-3 px-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity(item.id, qty - 1)}
            className="px-2 py-1 bg-gray-200 rounded-md"
            disabled={qty <= 1}
          >
            -
          </button>
          <span>{qty}</span>
          <button
            onClick={() => updateQuantity(item.id, qty + 1)}
            className="px-2 py-1 bg-gray-200 rounded-md"
          >
            +
          </button>
        </div>
      </td>
      <td className="py-3 px-2">{price * qty} تومان</td>
      <td className="py-3 px-2 text-right">
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-600 hover:text-red-800"
        >
          حذف
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
