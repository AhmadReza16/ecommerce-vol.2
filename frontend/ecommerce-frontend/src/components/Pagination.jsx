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
          ? "bg-blue-600 text-white dark:bg-blue-700"
          : "bg-gray-100 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
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
          ? "bg-gray-200 dark:bg-gray-600 cursor-not-allowed dark:text-gray-400"
          : "bg-gray-100 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
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
        <span
          key="start-ellipsis"
          className="px-2 select-none dark:text-gray-400"
        >
          ...
        </span>
      );
    }

    for (let i = start; i <= end; i++) items.push(renderPageButton(i));

    if (end < totalPages - 1) {
      items.push(
        <span
          key="end-ellipsis"
          className="px-2 select-none dark:text-gray-400"
        >
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
          ? "bg-gray-200 dark:bg-gray-600 cursor-not-allowed dark:text-gray-400"
          : "bg-gray-100 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
      }`}
    >
      Next
    </button>
  );

  return (
    <div className="flex justify-center mt-6 gap-2 dark:text-gray-200">
      {items}
    </div>
  );
}
