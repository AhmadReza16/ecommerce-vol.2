from rest_framework import generics, permissions, filters, pagination
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import FilterSet, CharFilter
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
    
    class Meta:
        model = Product
        fields = ['category']


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
    ordering_fields = ['price', 'created_at']

    def get_queryset(self):
        return Product.objects.filter(is_active=True).select_related('category', 'seller')

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

