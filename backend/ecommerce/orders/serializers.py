from rest_framework import serializers
from .models import Order, OrderItem
from products.serializers import ProductSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'total_price']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'status', 'status_display', 'total_price', 'address', 'created_at', 'items']
        read_only_fields = ['user', 'total_price', 'created_at', 'status']


class CreateOrderSerializer(serializers.Serializer):
    """Serializer for creating orders with address validation."""
    address = serializers.CharField(max_length=255, required=False, allow_blank=True)
    
    def validate_address(self, value):
        """Validate address format."""
        if value and len(value.strip()) < 10:
            raise serializers.ValidationError("Address must be at least 10 characters long.")
        return value.strip() if value else None