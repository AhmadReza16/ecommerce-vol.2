from django.urls import path
from .views import CategoryListView, ProductListView, ProductDetailView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('', ProductListView.as_view(), name='product-list'),
    path('<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)