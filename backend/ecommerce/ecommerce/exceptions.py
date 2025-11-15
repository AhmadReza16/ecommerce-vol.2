"""
Custom exception handler for DRF to provide consistent error responses.
"""
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from django.core.exceptions import ValidationError, PermissionDenied


def custom_exception_handler(exc, context):
    """
    Custom exception handler that returns consistent error format.
    
    Returns:
        Response: Standardized error response with 'error' key
    """
    # Call REST framework's default exception handler first
    response = exception_handler(exc, context)
    
    # Customize the response
    if response is not None:
        # Get the error message
        error_message = None
        
        # Handle different types of errors
        if isinstance(exc, ValidationError):
            error_message = str(exc)
        elif isinstance(exc, PermissionDenied):
            error_message = str(exc)
        elif isinstance(exc, Http404):
            error_message = "Resource not found."
        elif hasattr(exc, 'detail'):
            # DRF exceptions
            if isinstance(exc.detail, dict):
                # If detail is a dict, get the first error message
                error_message = list(exc.detail.values())[0]
                if isinstance(error_message, list):
                    error_message = error_message[0]
            elif isinstance(exc.detail, list):
                error_message = exc.detail[0]
            else:
                error_message = str(exc.detail)
        else:
            error_message = str(exc) if str(exc) else "An error occurred"
        
        # Create standardized response
        custom_response_data = {
            "error": error_message,
            "status_code": response.status_code
        }
        
        # Add field errors if they exist
        if hasattr(exc, 'detail') and isinstance(exc.detail, dict):
            field_errors = {}
            for field, errors in exc.detail.items():
                if isinstance(errors, list):
                    field_errors[field] = errors[0] if errors else "Invalid value"
                else:
                    field_errors[field] = str(errors)
            
            if field_errors:
                custom_response_data["field_errors"] = field_errors
        
        response.data = custom_response_data
    
    return response

