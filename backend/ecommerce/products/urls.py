from django.urls import path
from .views import (
    CategoryListView, 
    ProductListView, 
    ProductDetailView,
    AdminProductListView,
    AdminProductDetailView,
    AdminProductToggleActiveView,
)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Public routes
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('', ProductListView.as_view(), name='product-list'),
    path('<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    
    # Admin routes
    path('admin/', AdminProductListView.as_view(), name='admin-product-list'),
    path('admin/<int:pk>/', AdminProductDetailView.as_view(), name='admin-product-detail'),
    path('admin/<int:pk>/toggle-active/', AdminProductToggleActiveView.as_view(), name='admin-product-toggle'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)