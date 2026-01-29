from django.urls import path
from .views import AdminUserListView, RegisterView, ProfileView, AddressView , AdminUserDeleteView, AdminUserToggleView, AdminUserToggleStaffView
from rest_framework_simplejwt.views import TokenRefreshView , TokenObtainPairView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('address/', AddressView.as_view(), name='address-list-create'),

    # Admin routes
    path('admin/', AdminUserListView.as_view(), name='admin-user-list'),
    path('admin/<int:pk>/delete/', AdminUserDeleteView.as_view(), name='admin-user-delete'),
    path('admin/<int:pk>/toggle/', AdminUserToggleView.as_view(), name='admin-user-toggle-active'),
    path('admin/<int:pk>/toggle-staff/', AdminUserToggleStaffView.as_view(), name='admin-user-toggle-staff'),
    
    # در صورت نیاز به مسیر شامل id برای ویرایش/حذف:
    path('address/<int:pk>/', AddressView.as_view(), name='address-detail'),
    
]
