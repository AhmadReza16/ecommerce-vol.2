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
      className="flex flex-wrap gap-2 mb-4 items-center"
    >
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-1 rounded w-60"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border px-3 py-1 rounded"
      >
        <option value="">All Categories</option>
        {Array.isArray(categories) &&
          categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
      </select>
      <button
        type="submit"
        className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700"
      >
        Apply
      </button>
    </form>
  );
}
