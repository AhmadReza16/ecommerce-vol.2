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
        setError("Error fetching order data");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  if (!order) {
    return <p className="text-center mt-10 text-gray-600">Order not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-gray-200">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">
        Order #{order.id}
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6 dark:bg-gray-800 dark:shadow-gray-700">
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

      <h3 className="text-lg font-semibold mb-3 dark:text-white">Items:</h3>
      <div className="bg-white rounded-lg shadow-md p-4 dark:bg-gray-800 dark:shadow-gray-700">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b py-2 dark:border-gray-700"
          >
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
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          Back to Orders
        </Link>
        <Link
          to="/"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition dark:bg-indigo-700 dark:hover:bg-indigo-800"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderDetail;
