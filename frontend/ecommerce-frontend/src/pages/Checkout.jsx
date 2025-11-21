import { useState } from "react";
import { useCart } from "../context/CartContext";
import orderApi from "../api/orderApi";
import paymentApi from "../api/paymentApi";
import Header from "../components/Header";

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    setLoading(true);
    setError("");
    try {
      // 1️⃣ ایجاد سفارش (backend خود سبد را تبدیل به سفارش می‌کند)
      // فقط آدرس ارسال کنید؛ سبد از درخواست خودکار استخراج می‌شود
      const orderRes = await orderApi.createOrder({
        address: "Default Address", // آدرس پیش‌فرض (می‌توان از user profile دریافت کرد)
      });

      console.log("Order created:", orderRes.data);

      // 2️⃣ انجام پرداخت
      const paymentRes = await paymentApi.payOrder(orderRes.data.id, {});

      console.log("Payment response:", paymentRes.data);

      // 3️⃣ اگر پرداخت موفق بود، سبد را خالی کنید
      if (paymentRes.data?.status === "success") {
        clearCart();
        // به صفحه سفارش یا موفقیت هدایت کنید
        alert("Payment successful! Order placed.");
        // می‌توانید به صفحه orders هدایت کنید
        // window.location.href = "/orders";
      } else {
        throw new Error("Payment was not successful");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      // خطای دقیق‌تر را نمایش دهید
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Payment failed. Please try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div>
        <Header />
        <div className="text-center py-20">
          <h2 className="font-serif text-xl font-semibold text-gray-700 mb-4">
            Your cart is empty 🛒
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-gray-200">
        <h2 className="font-serif text-2xl font-bold mb-6 dark:text-white">
          Checkout
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-serif">
          {/* لیست آیتم‌ها */}
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between border-b py-2">
                <span>
                  {item.product.name} x {item.quantity}
                </span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* خلاصه پرداخت */}
          <div className="border border-collapse border-gray-800 p-4 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <p className="mb-4">
              Total:{" "}
              <span className="font-bold text-indigo-600">
                ${total.toFixed(2)}
              </span>
            </p>

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <button
              onClick={handlePayment}
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-linear-to-r from-purple-500 to-indigo-600 text-white font-bold shadow-lg hover:from-purple-600 hover:to-indigo-800 transition-all duration-300"
            >
              {loading ? "Processing..." : "Buy Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
