import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="font-serif flex flex-col items-center justify-center h-screen text-center bg-gray-100 px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4"> 404 </h1>
      <p className="text-xl text-gray-600 mb-6">
        oops! the page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-800 transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
