from rest_framework import serializers
from decouple import config
from .models import Product, Category


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
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'price',
            'stock', 'image', 'category', 'category_id',
            'seller', 'created_at', 'updated_at', 'is_active'
        ]

    def get_image(self, obj):
        """Return full URL for product image."""
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            # Fallback if no request context - build URL manually
            from django.conf import settings
            # Get the image URL path (e.g., /media/product_images/image.jpg)
            try:
                image_url = obj.image.url
            except:
                image_url = f"{settings.MEDIA_URL}{obj.image.name}"
            
            # If it's already a full URL, return it
            if image_url.startswith('http://') or image_url.startswith('https://'):
                return image_url
            
            # Ensure image_url starts with /
            if not image_url.startswith('/'):
                image_url = '/' + image_url
            
            # Construct full URL using default backend URL
            # Try to get from settings, otherwise use default
            backend_url = config('BACKEND_URL', default='http://127.0.0.1:8000')
            return f"{backend_url}{image_url}"
        return None