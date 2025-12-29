from django.shortcuts import render

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import adminAccount 
from .serializers import AdminTokenSerializer
from .permissions import IsAdminUser
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.filters import SearchFilter
from .serializers import AdminUserSerializer
from .pagination import AdminPagination
from rest_framework.generics import DestroyAPIView, UpdateAPIView
from rest_framework.response import Response


#  Admin views 
class AdminUserListView(generics.ListAPIView):
    """Admin endpoint to view all users"""
    serializer_class = AdminUserSerializer
    queryset = adminAccount.objects.all().order_by('-date_joined')
    pagination_class = AdminPagination
    filter_backends = [SearchFilter]
    search_fields = ['username', 'email']
    permission_classes = [IsAuthenticated, IsAdminUser]

class AdminTokenView(TokenObtainPairView):
    serializer_class = AdminTokenSerializer


class AdminUserDeleteView(DestroyAPIView):
    queryset = adminAccount.objects.all()
    permission_classes = [IsAdminUser]

class AdminUserToggleView(UpdateAPIView):
    """Toggle user is_active status"""
    queryset = adminAccount.objects.all()
    permission_classes = [IsAdminUser]

    def patch(self, request, *args, **kwargs):
        user = self.get_object()
        user.is_active = not user.is_active
        user.save()

        return Response({
            'id': user.id,
            'is_active': user.is_active,
            'is_staff': user.is_staff
        })


class AdminUserToggleStaffView(UpdateAPIView):
    """Toggle user is_staff status"""
    queryset = adminAccount.objects.all()
    permission_classes = [IsAdminUser]

    def patch(self, request, *args, **kwargs):
        user = self.get_object()
        user.is_staff = not user.is_staff
        user.save()

        return Response({
            'id': user.id,
            'is_active': user.is_active,
            'is_staff': user.is_staff
        })

