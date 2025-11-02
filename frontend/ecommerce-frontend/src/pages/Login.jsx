import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";

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
      navigate("/"); // بعد از ورود برو به صفحه اصلی
    } catch {
      console.log("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            ورود به حساب
          </h2>

          <label className="block mb-2 text-gray-600">ایمیل</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md mb-4 focus:ring-2 focus:ring-indigo-400"
          />

          <label className="block mb-2 text-gray-600">رمز عبور</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md mb-6 focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? "در حال ورود..." : "ورود"}
          </button>

          <p className="text-center text-sm mt-4">
            حساب نداری؟{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              ثبت‌نام کن
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
