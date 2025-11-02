import { useState } from "react";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
    paymentMethod: "card",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.address || !formData.phone) {
      alert("لطفاً تمام فیلدها را پر کنید.");
      return;
    }

    setLoading(true);
    try {
      // ارسال داده به بک‌اند (order + payment)
      await axiosClient.post("orders/create/", {
        ...formData,
        total_price: getTotalPrice(),
        items: cart.map((item) => ({
          product: item.id,
          quantity: item.quantity,
        })),
      });

      clearCart();
      navigate("/success");
    } catch (err) {
      console.error(err);
      alert("خطا در پرداخت! لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-[85vh] py-10">
        <div className="max-w-5xl mx-auto bg-white p-6 shadow-lg rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            🧾 پرداخت و نهایی‌سازی سفارش
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* فرم پرداخت */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-gray-600">
                  نام و نام خانوادگی
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-600">آدرس</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400"
                  rows="2"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-600">شماره تماس</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-600">روش پرداخت</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="card">کارت بانکی</option>
                  <option value="cod">پرداخت در محل</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
              >
                {loading ? "در حال پردازش..." : "پرداخت و ثبت سفارش"}
              </button>
            </form>

            {/* خلاصه سفارش */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
              <h3 className="text-lg font-bold mb-4">خلاصه سفارش</h3>
              {cart.length === 0 ? (
                <p className="text-gray-500">سبد خرید شما خالی است.</p>
              ) : (
                <>
                  <ul className="divide-y divide-gray-200">
                    {cart.map((item) => (
                      <li key={item.id} className="py-2 flex justify-between">
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span>{item.price * item.quantity} تومان</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex justify-between font-bold text-gray-800">
                    <span>جمع کل:</span>
                    <span>{getTotalPrice()} تومان</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
