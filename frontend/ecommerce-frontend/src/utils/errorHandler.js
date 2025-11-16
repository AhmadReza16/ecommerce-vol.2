/**
 * Centralized error handler for API errors
 * Provides consistent error message extraction and formatting
 */

/**
 * Extract error message from API error response
 * @param {Error} error - The error object from axios
 * @returns {string} - User-friendly error message
 */
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const data = error.response.data;
    
    // Check for different error formats
    if (data?.error) {
      return data.error;
    }
    
    if (data?.detail) {
      return data.detail;
    }
    
    if (data?.message) {
      return data.message;
    }
    
    // Handle field errors
    if (data?.field_errors) {
      const fieldErrors = Object.values(data.field_errors);
      return fieldErrors.join(', ');
    }
    
    // Handle validation errors (DRF format)
    if (typeof data === 'object') {
      const errors = Object.values(data).flat();
      if (errors.length > 0) {
        return errors[0];
      }
    }
    
    // Default error message based on status code
    const status = error.response.status;
    switch (status) {
      case 400:
        return 'Invalid request. Please check your input.';
      case 401:
        return 'Authentication required. Please login.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'Resource not found.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return `Error ${status}: ${error.response.statusText || 'An error occurred'}`;
    }
  } else if (error.request) {
    // Request made but no response received
    return 'Network error. Please check your internet connection.';
  } else {
    // Error in setting up the request
    return error.message || 'An unexpected error occurred';
  }
};

/**
 * Extract error message and show toast notification
 * @param {Error} error - The error object
 * @param {Function} toast - Toast function from react-toastify
 * @returns {string} - Error message
 */
export const handleErrorWithToast = (error, toast) => {
  const message = handleApiError(error);
  if (toast) {
    toast.error(message);
  }
  return message;
};

/**
 * Check if error is a network error
 * @param {Error} error - The error object
 * @returns {boolean}
 */
export const isNetworkError = (error) => {
  return !error.response && error.request;
};

/**
 * Check if error is an authentication error
 * @param {Error} error - The error object
 * @returns {boolean}
 */
export const isAuthError = (error) => {
  return error.response?.status === 401 || error.response?.status === 403;
};

