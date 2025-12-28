from django.urls import path
from .views import  AdminUserListView, AdminUserDeleteView, AdminUserToggleView, AdminUserToggleStaffView, AdminTokenView
from rest_framework_simplejwt.views import TokenRefreshView 

urlpatterns = [
    # Admin routes
    path('admin/', AdminUserListView.as_view(), name='admin-user-list'),
    path('admin/<int:pk>/delete/', AdminUserDeleteView.as_view(), name='admin-user-delete'),
    path('admin/<int:pk>/toggle/', AdminUserToggleView.as_view(), name='admin-user-toggle-active'),
    path('admin/<int:pk>/toggle-staff/', AdminUserToggleStaffView.as_view(), name='admin-user-toggle-staff'),
    path('admin/login/', AdminTokenView.as_view(), name='admin-login'),
    path('admin/token/refresh/', TokenRefreshView.as_view(), name='admin-token-refresh'),

]
