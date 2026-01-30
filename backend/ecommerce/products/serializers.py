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

    def to_representation(self, instance):
        """Override representation to get full image URL"""
        ret = super().to_representation(instance)
        # Replace image field with full URL
        if instance.image:
            request = self.context.get('request')
            try:
                img_url = instance.image.url
            except Exception:
                img_url = getattr(instance.image, 'name', None)
                if not img_url:
                    ret['image'] = None
                    return ret
                if not img_url.startswith('/'):
                    img_url = '/' + img_url

            if request:
                ret['image'] = request.build_absolute_uri(img_url)
            else:
                backend_url = getattr(settings, 'BACKEND_URL', None)
                if backend_url:
                    ret['image'] = f"{backend_url}{img_url}"
                else:
                    ret['image'] = img_url
        else:
            ret['image'] = None
        return ret

    def get_average_rating(self, obj):
        """Return average rating from product's reviews."""
        return obj.average_rating