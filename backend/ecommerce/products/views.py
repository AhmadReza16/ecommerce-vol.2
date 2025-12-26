from rest_framework import generics, permissions, filters, pagination
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import FilterSet, CharFilter , NumberFilter, BooleanFilter
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer


class ProductPagination(pagination.PageNumberPagination):
    page_size = 12
    
    def get_paginated_response(self, data):
        """Override to ensure request context is passed to serializer."""
        from rest_framework.response import Response
        return Response({
            'count': self.page.paginator.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data
        })


class ProductFilterSet(FilterSet):
    # Allow filtering by category slug
    category = CharFilter(field_name='category__slug', lookup_expr='exact')
    min_price = NumberFilter(field_name='price', lookup_expr='gte')
    max_price = NumberFilter(field_name='price', lookup_expr='lte')
    in_stock = BooleanFilter(method='filter_in_stock')
    class Meta:
        model = Product
        fields = ['category', 'min_price', 'max_price', 'in_stock']

    def filter_in_stock(self, queryset, name, value):
        if value:
            return queryset.filter(stock__gt=0)
        return queryset

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None  # Disable pagination for categories


class ProductListView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    pagination_class = ProductPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ProductFilterSet  # Use custom FilterSet
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'created_at', 'average_rating']
    ordering = ['-created_at']  # Default ordering: newest first


    def get_queryset(self):
        # use active manager and related joins for performance
        return Product.active.select_related('category', 'seller').all()


    def get_serializer(self, *args, **kwargs):
        """Override to ensure request context is always passed."""
        kwargs['context'] = self.get_serializer_context()
        return super().get_serializer(*args, **kwargs)

    def get_serializer_context(self):
        """Add request context to serializer for building absolute URLs."""
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.select_related('category', 'seller')

    def get_serializer_context(self):
        """Add request context to serializer for building absolute URLs."""
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_object(self):
        obj = super().get_object()
        # Check ownership for update/delete operations
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            if obj.seller != self.request.user:
                from rest_framework.exceptions import PermissionDenied
                raise PermissionDenied("You can only edit your own products.")
        return obj

    def perform_update(self, serializer):
        # Prevent changing seller via update
        serializer.save(seller=serializer.instance.seller)


# Admin Views for Admin Dashboard
class AdminProductListView(generics.ListCreateAPIView):
    """Admin endpoint to manage all products"""
    serializer_class = ProductSerializer
    pagination_class = ProductPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ProductFilterSet
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'created_at', 'average_rating']
    ordering = ['-created_at']
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Get all products for admin (including inactive)"""
        return Product.objects.select_related('category', 'seller').all()

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)


class AdminProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Admin endpoint to manage individual products"""
    serializer_class = ProductSerializer
    queryset = Product.objects.select_related('category', 'seller')
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(seller=serializer.instance.seller)


class AdminProductToggleActiveView(generics.UpdateAPIView):
    """Admin endpoint to toggle product active status"""
    queryset = Product.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        product = self.get_object()
        product.is_active = not product.is_active
        product.save()
        return Response({'id': product.id, 'is_active': product.is_active})