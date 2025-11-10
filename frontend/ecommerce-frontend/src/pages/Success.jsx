import { Link } from "react-router-dom";
import Header from "../components/Header";

const Success = () => {
  return (
    <>
      <Header />
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 px-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md">
          <div className="flex justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Successful 🎉
          </h2>
          <p className="text-gray-600 mb-6">
            Your order has been placed successfully. Thank you for your purchase
            💚
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition"
            >
              Back to Home
            </Link>
            <Link
              to="/profile"
              className="border border-gray-300 py-2 px-6 rounded-lg hover:bg-gray-100 transition"
            >
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
