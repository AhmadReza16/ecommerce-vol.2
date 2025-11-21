import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="font-serif flex flex-col items-center justify-center h-screen text-center bg-gray-100 dark:bg-gray-900 px-4">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">
        {" "}
        404{" "}
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
        oops! the page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-gray-600 dark:bg-gray-700 text-white rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
