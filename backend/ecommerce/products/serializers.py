from rest_framework import serializers
from decouple import config
from .models import Product, Category
from django.conf import settings

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )
    seller = serializers.StringRelatedField(read_only=True)
    seller_id = serializers.IntegerField(source='seller.id', read_only=True)
    image = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'price',
            'stock', 'image', 'category', 'category_id',
            'seller', 'seller_id', 'average_rating',
            'created_at', 'updated_at', 'is_active'
        ]
        read_only_fields = ['id', 'slug', 'seller', 'seller_id', 'average_rating', 'created_at', 'updated_at']



    def get_image(self, obj):
        """Return full absolute URL for product image (if present)."""
        if not obj.image:
            return None
        request = self.context.get('request')
        try:
            img_url = obj.image.url
        except Exception:
            # fallback to name-based URL
            img_url = getattr(obj.image, 'name', None)
            if not img_url:
                return None
            if not img_url.startswith('/'):
                img_url = '/' + img_url

        if request:
            return request.build_absolute_uri(img_url)
        # fallback to settings if no request in context (e.g., celery tasks)
        backend_url = getattr(settings, 'BACKEND_URL', None)
        if backend_url:
            return f"{backend_url}{img_url}"
        return img_url

    def get_average_rating(self, obj):
        """Return average rating from product's reviews."""
        return obj.average_rating