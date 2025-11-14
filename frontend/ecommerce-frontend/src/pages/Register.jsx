import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // client-side validation: ensure passwords match
    if (formData.password !== formData.password2) {
      setErrors({ password2: ["Passwords do not match"] });
      setLoading(false);
      return;
    }
    try {
      setErrors(null);
      await register(formData);
      navigate("/login");
    } catch (err) {
      // show server validation messages if available
      console.error("Register failed", err);
      const resp = err?.response?.data || {
        non_field_errors: ["Registration failed. Check input."],
      };
      setErrors(resp);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 font-serif">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 ">
            Create a new account{" "}
          </h2>

          {errors && (
            <div className="mb-4 text-sm text-red-600">
              {Object.entries(errors).map(([field, msgs]) => (
                <div key={field} className="mb-1">
                  <strong className="capitalize">
                    {field.replace(/_/g, " ")}:
                  </strong>{" "}
                  {Array.isArray(msgs) ? msgs.join(" ") : String(msgs)}
                </div>
              ))}
            </div>
          )}

          <label className="block mb-2 text-gray-600"> Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md mb-4 focus:ring-2 focus:ring-indigo-400"
          />

          <label className="block mb-2 text-gray-600"> Email </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md mb-4 focus:ring-2 focus:ring-indigo-400"
          />

          <label className="block mb-2 text-gray-600"> Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md mb-6 focus:ring-2 focus:ring-indigo-400"
          />

          <label className="block mb-2 text-gray-600"> Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md mb-6 focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? "Sign Up..." : "Sign Up"}
          </button>

          <p className="text-center text-sm mt-4">
            Do you have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login{" "}
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
