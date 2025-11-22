import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import ThemeSwitcher from "./ThemeSwitcher";
import { useState } from "react";

const Header = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const [showConfirm, setShowConfirm] = useState(false);

  const totalItems = (cart || []).reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 dark:bg-gray-900 dark:text-gray-200 ">
      <div className="container mx-auto flex items-center justify-between p-4 dark:bg-gray-900 dark:text-gray-200">
        {/* برند */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-700 hover:text-gray-600 transition font-serif  dark:text-gray-300 dark:hover:text-white"
        >
          My Fake Shop
        </Link>

        {/* لینک‌ها */}
        <nav className="flex items-center space-x-6 ">
          <Link
            to="/"
            className="text-gray-600 hover:text-indigo-600 transition font-serif  dark:text-gray-200"
          >
            Home
          </Link>
          {user && (
            <Link
              to="/profile"
              className="text-gray-600 hover:text-indigo-600 transition font-serif  dark:text-gray-200"
            >
              Profile
            </Link>
          )}
          <Link
            to="/cart"
            className="relative text-gray-600 hover:text-indigo-600 transition  dark:text-gray-200"
          >
            <FaShoppingCart className="inline-block" size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2">
                {totalItems}
              </span>
            )}
          </Link>

          {/* احراز هویت */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowConfirm((prev) => !prev)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-serif dark:bg-red-700 dark:hover:bg-red-600"
              >
                Logout
              </button>
              {showConfirm && (
                <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border dark:border-gray-700 w-48 z-50">
                  <p className="text-sm text-gray-700 dark:text-gray-200">
                    Are You Sure?
                  </p>
                  <div className="flex justify-between mt-3">
                    <button
                      onClick={logout}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    >
                      Yes
                    </button>

                    <button
                      onClick={() => setShowConfirm(false)}
                      className="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-500 text-sm"
                    >
                      No
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center space-x-1 font-semibold bg-green-700 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition font-serif"
            >
              <FaUser size={18} />
              <span>Login</span>
            </Link>
          )}
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  );
};

export default Header;
