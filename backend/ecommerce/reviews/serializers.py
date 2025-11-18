from rest_framework import serializers
from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    product_name = serializers.CharField(source='product.name', read_only=True)
    product = serializers.PrimaryKeyRelatedField(read_only=True)

    
    class Meta:
        model = Review
        fields = ['id', 'user', 'user_name', 'product', 'product_name', 'rating', 'comment', 'created_at']
        read_only_fields = ['user', 'product', 'created_at']  # product is set via URL, not request body

def validate_rating(self, value):
    if not value or not (1 <= value <= 5):
        raise serializers.ValidationError("Rating must be between 1 and 5.")
    return value