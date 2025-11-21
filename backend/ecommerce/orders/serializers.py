from rest_framework import serializers
from .models import Order, OrderItem
from products.serializers import ProductSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True ,allow_null=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'total_price']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(read_only=True, many=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    user = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = Order
        fields = ['id', 'user', 'status', 'status_display', 'total_price', 'address', 'created_at', 'items']
        read_only_fields = ['user', 'total_price', 'created_at', 'status']


class CreateOrderSerializer(serializers.Serializer):
    """Serializer for creating orders with address validation."""
    address = serializers.CharField(max_length=255, required=False, allow_blank=True)
    
    def validate_address(self, value):
        """Validate address format if provided."""
        # اگر آدرس خالی یا وایت‌اسپیس‌فقط است، اجازه بدهید که view استفاده کند
        if not value or not value.strip():
            return value
        
        value = value.strip()
        # فقط اگر ارائه شده، حداقل 5 کاراکتر باشد
        if len(value) < 5:
            raise serializers.ValidationError("Address must be at least 5 characters long if provided.")
        return value