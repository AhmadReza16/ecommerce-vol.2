/**
 * Utility function for handling product image URLs
 * Handles both full URLs from backend and relative paths
 */

/**
 * Get full image URL from backend response
 * @param {string|null|undefined} imageField - Image URL or path from backend
 * @returns {string} - Full image URL
 */
export const getImageUrl = (imageField) => {
  // If no image, return placeholder
  if (!imageField) {
    return "https://via.placeholder.com/400x300?text=No+Image";
  }

  // If it's already a full URL (http/https), use as-is
  if (imageField.startsWith("http://") || imageField.startsWith("https://")) {
    return imageField;
  }

  // Get base URL from environment variable or use default
  const baseURL = import.meta.env.VITE_API_BASE_URL 
    ? import.meta.env.VITE_API_BASE_URL.replace('/api', '')
    : "http://127.0.0.1:8000";

  // If it starts with /, prepend base URL
  if (imageField.startsWith("/")) {
    return baseURL + imageField;
  }

  // If it's a relative path without /, add /media/ prefix
  return `${baseURL}/media/${imageField}`;
};

