const Sorting = ({ value, onChange }) => {
  return (
    <div className="flex justify-end mb-6">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 font-serif"
      >
        <option value="">Default</option>
        <option value="-created_at">Newest</option>
        <option value="price">Price: Low → High</option>
        <option value="-price">Price: High → Low</option>
        <option value="-rating">Top Rated</option>
      </select>
    </div>
  );
};

export default Sorting;
