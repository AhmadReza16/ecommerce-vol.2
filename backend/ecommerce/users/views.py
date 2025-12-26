from rest_framework import status
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Account , Address
from .serializers import AdminTokenSerializer, RegisterSerializer, UserSerializer , AddressSerializer

from .permissions import IsAdminUser
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework.generics import ListAPIView
from rest_framework.filters import SearchFilter
from django.contrib.auth.models import User
from .serializers import AdminUserSerializer
from .pagination import AdminPagination

from rest_framework.generics import DestroyAPIView, UpdateAPIView
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # ایجاد توکن JWT برای ورود خودکار
        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        return Response({
            "user": UserSerializer(user).data,
            "refresh": str(refresh),
            "access": str(access),
        }, status=status.HTTP_201_CREATED)

class ProfileView(APIView):     
    permission_classes = [IsAuthenticated]      #فقط کاربر لاگین‌شده می‌تواند به این‌ها دسترسی داشته باشد  

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def patch(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
class AddressView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        addresses = Address.objects.filter(user=request.user)
        serializer = AddressSerializer(addresses, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AddressSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # user را هنگام ذخیره تعیین می‌کنیم
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, pk=None):
        # برای ویرایش آدرس براساس id (pk) — اگر خواستی از urls مسیر با pk اضافه کن
        if 'id' not in request.data and pk is None:
            return Response({"detail": "Address id is required."}, status=status.HTTP_400_BAD_REQUEST)

        addr_id = pk if pk is not None else request.data.get('id')
        try:
            address = Address.objects.get(id=addr_id, user=request.user)
        except Address.DoesNotExist:
            return Response({"detail": "Address not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = AddressSerializer(address, data=request.data, partial=False)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def patch(self, request, pk=None):
        # partial update
        addr_id = pk if pk is not None else request.data.get('id')
        try:
            address = Address.objects.get(id=addr_id, user=request.user)
        except Address.DoesNotExist:
            return Response({"detail": "Address not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = AddressSerializer(address, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk=None):
        addr_id = pk if pk is not None else request.data.get('id')
        try:
            address = Address.objects.get(id=addr_id, user=request.user)
        except Address.DoesNotExist:
            return Response({"detail": "Address not found."}, status=status.HTTP_404_NOT_FOUND)

        address.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#  Admin views 
class AdminUserListView(generics.ListAPIView):
    """Admin endpoint to view all users"""
    serializer_class = AdminUserSerializer
    queryset = Account.objects.all().order_by('-date_joined')
    pagination_class = AdminPagination
    filter_backends = [SearchFilter]
    search_fields = ['username', 'email']
    permission_classes = [IsAuthenticated, IsAdminUser]

class AdminTokenView(TokenObtainPairView):
    serializer_class = AdminTokenSerializer




class AdminUserDeleteView(DestroyAPIView):
    queryset = Account.objects.all()
    permission_classes = [IsAdminUser]

class AdminUserToggleView(UpdateAPIView):
    """Toggle user is_active status"""
    queryset = Account.objects.all()
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
    queryset = Account.objects.all()
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
