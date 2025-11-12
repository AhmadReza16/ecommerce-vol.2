export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-6 gap-2">
      {/* دکمه قبلی */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 border rounded ${
          currentPage === 1
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
      >
        Prev
      </button>

      {/* شماره صفحات */}
      {pages.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-1 border rounded ${
            num === currentPage
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {num}
        </button>
      ))}

      {/* دکمه بعدی */}
      <button
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className={`px-3 py-1 border rounded ${
          currentPage === totalPages
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
      >
        Next
      </button>
    </div>
  );
}
