from rest_framework import serializers
from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'user', 'user_name', 'product', 'product_name', 'rating', 'comment', 'created_at']
        read_only_fields = ['user', 'product', 'created_at']  # product is set via URL, not request body
