from rest_framework import generics, permissions ,viewsets , filters, pagination
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import FilterSet, CharFilter
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer


class ProductPagination(pagination.PageNumberPagination):
    page_size = 12


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
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    pagination_class = ProductPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ProductFilterSet  # Use custom FilterSet
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'created_at']

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'price']   # Filter by category and price
    search_fields = ['name', 'description']    # Search by name or description
    ordering_fields = ['price', 'created_at']  # Sort by price or date