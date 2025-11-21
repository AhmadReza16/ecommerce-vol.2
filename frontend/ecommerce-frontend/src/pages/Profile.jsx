import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import { handleApiError } from "../utils/errorHandler";
import { toast } from "react-toastify";
import { CheckCircle, Clock, Truck, PackageCheck, XCircle } from "lucide-react";

const StatusBadge = ({ status }) => {
  const config = {
    paid: {
      icon: <CheckCircle className="w-4 h-4" />,
      classes: "bg-green-100 text-green-700",
      text: "Paid",
    },
    pending: {
      icon: <Clock className="w-4 h-4" />,
      classes: "bg-yellow-100 text-yellow-700",
      text: "Pending",
    },
    shipped: {
      icon: <Truck className="w-4 h-4" />,
      classes: "bg-blue-100 text-blue-700",
      text: "Shipped",
    },
    delivered: {
      icon: <PackageCheck className="w-4 h-4" />,
      classes: "bg-emerald-100 text-emerald-700",
      text: "Delivered",
    },
    canceled: {
      icon: <XCircle className="w-4 h-4" />,
      classes: "bg-red-100 text-red-700",
      text: "Canceled",
    },
  };

  const item = config[status] || config["canceled"];

  return (
    <span
      className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${item.classes}`}
    >
      {item.icon}
      {item.text}
    </span>
  );
};

const Profile = () => {
  const { user } = useAuth(); // اطلاعات کاربر لاگین شده
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axiosClient
      .get("orders/")
      .then((res) => {
        // Handle both paginated (res.data.results) and direct array responses
        const ordersList = Array.isArray(res.data)
          ? res.data
          : res.data.results || [];
        setOrders(ordersList);
      })
      .catch((err) => {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
        toast.error(errorMessage);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-[80vh] bg-gray-50 py-10 font-serif dark:bg-gray-800 dark:text-gray-200  ">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6 dark:bg-gray-800 dark:text-gray-200 dark:shadow-gray-700">
          {/* بخش اطلاعات کاربر */}
          <div className="border-b pb-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-3 dark:bg-gray-800 dark:text-gray-200">
              👤 User profile
            </h2>
            {user ? (
              <div className="space-y-2 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                <p>
                  <span className="font-semibold"> Username: </span>{" "}
                  {user.username}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
              </div>
            ) : (
              <p className="text-gray-500 "> Please log in. </p>
            )}
          </div>

          {/* بخش لیست سفارش‌ها */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
              🧾 My orders{" "}
            </h3>

            {loading ? (
              <Loader />
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : orders.length === 0 ? (
              <p className="text-gray-500">
                {" "}
                You have not placed an order yet.{" "}
              </p>
            ) : (
              <div className="hidden md:block rounded-xl overflow-hidden border shadow-sm ">
                <table className="min-w-full text-right  dark:bg-gray-800 dark:text-gray-200">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700  dark:bg-gray-700  dark:text-gray-200">
                      <th className="py-3 px-2">Order code </th>
                      <th className="py-3 px-2">History</th>
                      <th className="py-3 px-2"> Total amount</th>
                      <th className="py-3 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b hover:bg-gray-200 transition  dark:hover:text-gray-800"
                      >
                        <td className="py-3 px-4 text-indigo-600 font-semibold">
                          <Link
                            to={`/order/${order.id}`}
                            className="hover:underline"
                          >
                            #{order.id}
                          </Link>
                        </td>
                        <td className="py-3 px-4">
                          {new Date(order.created_at).toLocaleDateString(
                            "en-US"
                          )}
                        </td>
                        <td className="py-3 px-2 font-semibold">
                          ${order.total_price}
                        </td>
                        <td className="py-3 px-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              order.status === "paid"
                                ? "bg-green-100 text-green-700"
                                : order.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : order.status === "shipped"
                                ? "bg-blue-100 text-blue-700"
                                : order.status === "delivered"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {order.status_display || order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Mobile Card View */}
            {!loading && !error && orders.length > 0 && (
              <div className="md:hidden space-y-4 mt-4 ">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-xl border p-4 shadow-sm bg-white dark:bg-gray-800 dark:text-gray-200"
                  >
                    <div className="flex justify-between mb-2 dark:bg-gray-800 dark:text-gray-200">
                      <span className="text-gray-800 text-sm dark:bg-gray-800 dark:text-gray-200">
                        Order Code
                      </span>
                      <Link
                        to={`/order/${order.id}`}
                        className="text-indigo-600 font-semibold "
                      >
                        #{order.id}
                      </Link>
                    </div>

                    <div className="flex justify-between mb-2 ">
                      <span className="text-gray-800 text-sm dark:bg-gray-800 dark:text-gray-200">
                        Date
                      </span>
                      <span className="font-medium">
                        {new Date(order.created_at).toLocaleDateString("en-US")}
                      </span>
                    </div>

                    <div className="flex justify-between mb-2">
                      <span className="text-gray-800 text-sm dark:bg-gray-800 dark:text-gray-200">
                        Total
                      </span>
                      <span className="font-semibold">
                        ${order.total_price}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-800 text-sm dark:bg-gray-800 dark:text-gray-200">
                        Status
                      </span>
                      <StatusBadge status={order.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
