import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";

const Cart = () => {
  const { cart, total, clearCart } = useCart();
  const [isClearing, setIsClearing] = useState(false);

  const handleClearCart = async () => {
    setIsClearing(true);
    try {
      await clearCart();
    } catch (err) {
      console.error("Failed to clear cart:", err);
    } finally {
      setIsClearing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div>
        <Header />
        <div className="text-center py-20 dark:bg-gray-900 dark:text-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 font-serif dark:bg-gray-900 dark:text-gray-200">
            Your cart is empty
          </h2>
          <Link
            to="/"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-serif dark:bg-indigo-800 dark:text-gray-200"
          >
            Go Shopping 🛒
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className=" dark:bg-gray-900 dark:text-gray-200">
        <div className="container mx-auto px-4 py-8  dark:bg-gray-900 dark:text-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6  dark:bg-gray-900 dark:text-gray-200">
            Your Cart
          </h2>

          <div className="space-y-4 mb-6  ">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="flex justify-between items-center border-t pt-6">
            <button
              onClick={handleClearCart}
              disabled={isClearing}
              className="font-serif px-5 py-2 bg-red-600 text-white rounded-md font-semibold shadow-md hover:bg-red-700 hover:animate-pulse transition-all duration-300"
            >
              {isClearing ? "Clearing..." : "Clear Cart"}
            </button>

            <div className="text-right">
              <p className="font-serif text-lg font-semibold text-gray-800 pb-2  dark:bg-gray-900 dark:text-gray-200">
                Total:{" "}
                <span className="text-indigo-600">${total.toFixed(2)}</span>
              </p>

              <Link
                to="/checkout"
                className="font-serif px-6 py-2  rounded-lg bg-linear-to-r from-purple-500 to-indigo-600 text-white font-bold shadow-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
