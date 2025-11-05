import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import orderApi from "../api/orderApi";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await orderApi.get(id);
        setOrder(res.data);
      } catch (err) {
        console.error(err);
        setError("خطا در دریافت اطلاعات سفارش");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-600">در حال بارگذاری...</p>
    );
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  if (!order) {
    return <p className="text-center mt-10 text-gray-600">سفارشی یافت نشد.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Order #{order.id}</h2>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <p>
          <span className="font-semibold">Status:</span> {order.status}
        </p>
        <p>
          <span className="font-semibold">Payment:</span> {order.payment_status}
        </p>
        <p>
          <span className="font-semibold">Date:</span>{" "}
          {new Date(order.created_at).toLocaleString()}
        </p>
        <p>
          <span className="font-semibold">Total:</span> $
          {order.total_price.toFixed(2)}
        </p>
      </div>

      <h3 className="text-lg font-semibold mb-3">Items:</h3>
      <div className="bg-white rounded-lg shadow-md p-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between border-b py-2">
            <span>
              {item.product.name} x {item.quantity}
            </span>
            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <Link
          to="/profile/orders"
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Back to Orders
        </Link>
        <Link
          to="/"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderDetail;
