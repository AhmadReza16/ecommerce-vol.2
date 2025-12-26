import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import { handleApiError } from "../utils/errorHandler";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData);
      toast.success("Login successful!");
      navigate("/"); // بعد از ورود برو به صفحه اصلی
    } catch (err) {
      const errorMessage = handleApiError(err);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 dark:bg-gray-900 font-serif">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Login
          </h2>

          <label className="block mb-2 text-gray-600 dark:text-gray-200 ">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md mb-4 focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          <label className="block mb-2 text-gray-600 dark:text-gray-200">
            {" "}
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md mb-6 focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition dark:bg-indigo-700 dark:hover:bg-indigo-800"
          >
            {loading ? "Entering ..." : "Login"}
          </button>

          <p className="text-center text-sm mt-4 dark:text-gray-200 ">
            Don't you have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:underline dark:text-indigo-500 dark:hover:text-indigo-400"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
