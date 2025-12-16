import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

export default function SearchFilter({ onFilterChange }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from API
    axiosClient
      .get("/products/categories/")
      .then((res) => {
        // Categories should return an array directly
        const catData = Array.isArray(res.data) ? res.data : [];
        setCategories(catData);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setCategories([]); // Set empty array on error
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass search query and category (as slug) to parent
    // Only pass non-empty values to avoid undefined in query params
    const filters = {};
    if (search.trim()) filters.search = search.trim();
    if (category) filters.category = category;
    onFilterChange(filters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-2 mb-4 items-center mt-2"
    >
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-1 rounded w-60 font-serif "
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-1 rounded font-serif"
      >
        <option value="">All Categories</option>
        {Array.isArray(categories) &&
          categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
      </select>
      <button className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-all duration-200 border border-gray-300 dark:border-gray-600 shadow-sm font-serif">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
          />
        </svg>
        Search
      </button>
    </form>
  );
}
