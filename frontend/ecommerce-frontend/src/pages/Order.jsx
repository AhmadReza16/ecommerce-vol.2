import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import Header from "../components/Header";

const Order = () => {
  const { id } = useParams(); // گرفتن id سفارش از URL
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get(`orders/${id}/`)
      .then((res) => {
        setOrder(res.data);
      })
      .catch((err) => {
        console.error("Error fetching order:", err);
        setError(err?.response?.data || err.message || "Failed to fetch order");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-gray-500">Loading order details...</p>
      </div>
    );

  if (!order)
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Order not found 😕</p>
          {error && (
            <pre className="text-sm text-red-600 mt-2">
              {JSON.stringify(error, null, 2)}
            </pre>
          )}
        </div>
      </div>
    );

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-[85vh] py-10 font-serif">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6">
          {/* اطلاعات کلی سفارش */}
          <div className="border-b pb-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              🧾 Order Details #{order.id}
            </h2>
            <p className="text-gray-600 mb-1">Date: {order.created_at}</p>
            <p className="text-gray-600 mb-1">
              Status:
              <span
                className={`ml-2 px-3 py-1 rounded-full text-sm ${
                  order.status === "paid"
                    ? "bg-green-100 text-green-700"
                    : order.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {order.status === "paid"
                  ? "Paid"
                  : order.status === "pending"
                  ? "Pending payment"
                  : "Cancelled"}
              </span>
            </p>
            <p className="text-gray-600">
              Payment method: {order.payment_method}{" "}
            </p>
          </div>

          {/* لیست محصولات */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              🛍️ Order products{" "}
            </h3>
            <ul className="divide-y divide-gray-200">
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="py-3 flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <p className="font-semibold">{item.product.name}</p>
                      <p className="text-gray-500 text-sm">
                        Price: {item.product.price} $
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 font-semibold">
                    × {item.quantity}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* جمع کل و آدرس */}
          <div className="mt-8 border-t pt-4 text-gray-800">
            <p className="text-lg font-semibold">
              💰 Total:{" "}
              <span className="text-indigo-600">{order.total_price} $</span>
            </p>
            <p className="mt-3 text-gray-600">
              📦 Shipping address: {order.address}
            </p>
          </div>

          {/* دکمه بازگشت */}
          <div className="mt-8 text-center">
            <Link
              to="/profile"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
