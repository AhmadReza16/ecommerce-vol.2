import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { ShoppingCart, LogOut, LogIn } from "react-icons/fa";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { cart } = useCart();

  return (
    <header className="bg-gray-900 text-white py-3 px-6 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold text-indigo-400">
        🛍️ MyShop
      </Link>

      <nav className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <span className="text-sm text-gray-300">
              خوش آمدی، {user?.username}
            </span>
            <button
              onClick={logout}
              className="flex items-center gap-1 bg-red-600 px-3 py-1 rounded-md hover:bg-red-700 transition"
            >
              <LogOut /> خروج
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-indigo-400 flex items-center gap-1"
            >
              <LogIn /> ورود
            </Link>
            <Link to="/register" className="hover:text-indigo-400">
              ثبت‌نام
            </Link>
          </>
        )}

        <Link
          to="/cart"
          className="relative flex items-center hover:text-indigo-400"
        >
          <ShoppingCart size={22} />
          {cart?.items?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 flex justify-center items-center rounded-full">
              {cart.items.length}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
