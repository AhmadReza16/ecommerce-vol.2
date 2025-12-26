from django.urls import path
from .views import (
    CreateOrderView,
    OrderListView,
    OrderDetailView,
    AdminOrderListView,
    AdminOrderDetailView,
    AdminOrderStatusUpdateView,
)

urlpatterns = [
    # User routes
    path('create/', CreateOrderView.as_view(), name='create-order'),
    path('', OrderListView.as_view(), name='order-list'),
    path('<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    
    # Admin routes
    path('admin/', AdminOrderListView.as_view(), name='admin-order-list'),
    path('admin/<int:pk>/', AdminOrderDetailView.as_view(), name='admin-order-detail'),
    path('admin/<int:pk>/', AdminOrderStatusUpdateView.as_view(), name='admin-order-status'),
]
