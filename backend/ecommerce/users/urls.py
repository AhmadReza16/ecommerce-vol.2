from django.urls import path
from .views import  AdminUserDeleteView, AdminUserToggleView, RegisterView, ProfileView  , AddressView , AdminUserListView , AdminTokenView  
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView 

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('address/', AddressView.as_view(), name='address-list-create'),
    # در صورت نیاز به مسیر شامل id برای ویرایش/حذف:
    path('address/<int:pk>/', AddressView.as_view(), name='address-detail'),
    path('admin/users/', AdminUserListView.as_view(), name='admin-user-list'),
    path('admin/token/', AdminTokenView.as_view(), name='admin-token'),
    path('admin/users/<int:pk>/delete/', AdminUserDeleteView.as_view(), name='admin-user-delete'),
    path('admin/users/<int:pk>/toggle/', AdminUserToggleView.as_view(),name='admin-user-toggle'),
]
