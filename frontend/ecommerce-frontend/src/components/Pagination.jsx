export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  // Limit how many page buttons to render for very large totalPages
  const MAX_VISIBLE = 7; // total buttons including first & last

  const renderPageButton = (num) => (
    <button
      key={num}
      onClick={() => onPageChange(num)}
      aria-current={num === currentPage ? "page" : undefined}
      className={`px-3 py-1 border rounded ${
        num === currentPage
          ? "bg-blue-600 text-white"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      {num}
    </button>
  );

  const items = [];

  // Prev
  items.push(
    <button
      key="prev"
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
  );

  if (totalPages <= MAX_VISIBLE) {
    for (let i = 1; i <= totalPages; i++) items.push(renderPageButton(i));
  } else {
    // Always show first page
    items.push(renderPageButton(1));

    // Determine window around current
    let start = Math.max(2, currentPage - 2);
    let end = Math.min(totalPages - 1, currentPage + 2);

    // Shift window if near the edges
    if (currentPage <= 3) {
      start = 2;
      end = 5;
    } else if (currentPage >= totalPages - 2) {
      start = totalPages - 4;
      end = totalPages - 1;
    }

    if (start > 2) {
      items.push(
        <span key="start-ellipsis" className="px-2 select-none">
          ...
        </span>
      );
    }

    for (let i = start; i <= end; i++) items.push(renderPageButton(i));

    if (end < totalPages - 1) {
      items.push(
        <span key="end-ellipsis" className="px-2 select-none">
          ...
        </span>
      );
    }

    // Always show last page
    items.push(renderPageButton(totalPages));
  }

  // Next
  items.push(
    <button
      key="next"
      onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={`px-3 py-1 border rounded ${
        currentPage === totalPages
          ? "bg-gray-200 cursor-not-allowed"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      Next
    </button>
  );

  return <div className="flex justify-center mt-6 gap-2">{items}</div>;
}
