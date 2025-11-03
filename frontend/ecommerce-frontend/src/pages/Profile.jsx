import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth(); // اطلاعات کاربر لاگین شده
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("orders/my-orders/")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("خطا در دریافت سفارش‌ها", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-[80vh] bg-gray-50 py-10">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6">
          {/* بخش اطلاعات کاربر */}
          <div className="border-b pb-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              👤 پروفایل کاربری
            </h2>
            {user ? (
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold">نام کاربری:</span>{" "}
                  {user.username}
                </p>
                <p>
                  <span className="font-semibold">ایمیل:</span> {user.email}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">لطفاً وارد حساب کاربری شوید.</p>
            )}
          </div>

          {/* بخش لیست سفارش‌ها */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              🧾 سفارش‌های من
            </h3>

            {loading ? (
              <p className="text-gray-500">در حال بارگذاری سفارش‌ها...</p>
            ) : orders.length === 0 ? (
              <p className="text-gray-500">شما هنوز سفارشی ثبت نکرده‌اید.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-right">
                  <thead>
                    <tr className="border-b bg-gray-100 text-gray-700">
                      <th className="py-3 px-2">کد سفارش</th>
                      <th className="py-3 px-2">تاریخ</th>
                      <th className="py-3 px-2">مبلغ کل</th>
                      <th className="py-3 px-2">وضعیت</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="py-3 px-2 text-indigo-600 font-semibold">
                          #{order.id}
                        </td>
                        <td className="py-3 px-2">{order.created_at}</td>
                        <td className="py-3 px-2">{order.total_price} تومان</td>
                        <td className="py-3 px-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              order.status === "paid"
                                ? "bg-green-100 text-green-700"
                                : order.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {order.status === "paid"
                              ? "پرداخت شده"
                              : order.status === "pending"
                              ? "در انتظار پرداخت"
                              : "لغو شده"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
