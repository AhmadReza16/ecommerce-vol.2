from django.urls import path
from .views import RegisterView, ProfileView, AddressView, AdminUserListView, AdminUserDeleteView, AdminUserToggleView, AdminUserToggleStaffView, AdminTokenView
from rest_framework_simplejwt.views import TokenRefreshView 

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', AdminTokenView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('address/', AddressView.as_view(), name='address-list-create'),
    # در صورت نیاز به مسیر شامل id برای ویرایش/حذف:
    path('address/<int:pk>/', AddressView.as_view(), name='address-detail'),
    
    # Admin routes
    path('admin/', AdminUserListView.as_view(), name='admin-user-list'),
    path('admin/<int:pk>/delete/', AdminUserDeleteView.as_view(), name='admin-user-delete'),
    path('admin/<int:pk>/toggle/', AdminUserToggleView.as_view(), name='admin-user-toggle-active'),
    path('admin/<int:pk>/toggle-staff/', AdminUserToggleStaffView.as_view(), name='admin-user-toggle-staff'),
]
