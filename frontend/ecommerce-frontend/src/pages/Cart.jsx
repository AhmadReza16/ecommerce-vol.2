import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  return (
    <>
      <Header />
      <div className="min-h-[80vh] bg-gray-50 py-10">
        <div className="max-w-5xl mx-auto bg-white p-6 shadow-md rounded-2xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            🛒 سبد خرید شما
          </h2>

          {cart.length === 0 ? (
            <div className="text-center text-gray-500">
              سبد خرید خالی است.
              <div className="mt-4">
                <Link
                  to="/"
                  className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                >
                  رفتن به صفحه محصولات
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b bg-gray-100">
                      <th className="py-3 text-right px-2">محصول</th>
                      <th className="py-3 text-right px-2">قیمت</th>
                      <th className="py-3 text-right px-2">تعداد</th>
                      <th className="py-3 text-right px-2">مجموع</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-3 px-2 flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <span>{item.name}</span>
                        </td>
                        <td className="py-3 px-2">{item.price} تومان</td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="px-2 py-1 bg-gray-200 rounded-md"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="px-2 py-1 bg-gray-200 rounded-md"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          {item.price * item.quantity} تومان
                        </td>
                        <td className="py-3 px-2 text-right">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            حذف
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center mt-6">
                <h3 className="text-xl font-bold text-gray-800">
                  جمع کل: {getTotalPrice()} تومان
                </h3>

                <Link
                  to="/checkout"
                  className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition"
                >
                  ادامه خرید
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
