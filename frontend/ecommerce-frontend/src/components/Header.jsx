import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const totalItems = (cart || []).reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* برند */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-700 hover:text-gray-600 transition"
        >
          My Fake Shop
        </Link>

        {/* لینک‌ها */}
        <nav className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-indigo-600 transition"
          >
            Home
          </Link>
          {user && (
            <Link
              to="/profile"
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              Profile
            </Link>
          )}
          <Link
            to="/cart"
            className="relative text-gray-600 hover:text-indigo-600 transition"
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
            <button
              onClick={logout}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center space-x-1 font-semibold bg-gray-600 text-white px-3 py-1 rounded-lg hover:bg-gray-700 transition"
            >
              <FaUser size={18} />
              <span>Login</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
