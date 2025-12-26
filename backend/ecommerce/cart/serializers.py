from rest_framework import serializers
from .models import Cart, CartItem
from products.serializers import ProductSerializer
from products.models import Product

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=CartItem._meta.get_field('product').remote_field.model.objects.all(),
        source='product',
        write_only=True
    )
    total = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'quantity', 'total']
        read_only_fields = ['total']

    def get_total(self, obj):
        return obj.total()

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'total_price']
        read_only_fields = ['user', 'total_price']

    def get_total_price(self, obj):
        return obj.total_price()


class AddToCartSerializer(serializers.Serializer):
    """Serializer for adding items to cart with validation."""
    product_id = serializers.IntegerField(required=True)
    quantity = serializers.IntegerField(min_value=1, required=True)
    
    def validate_product_id(self, value):
        """Validate that product exists and is active."""
        try:
            product = Product.objects.get(id=value, is_active=True)
        except Product.DoesNotExist:
            raise serializers.ValidationError("Product not found or inactive.")
        return value
    
    def validate(self, attrs):
        """Validate stock availability."""
        product_id = attrs['product_id']
        quantity = attrs['quantity']
        
        try:
            product = Product.objects.get(id=product_id, is_active=True)
            if product.stock < quantity:
                raise serializers.ValidationError(
                    f"Only {product.stock} items available in stock."
                )
        except Product.DoesNotExist:
            raise serializers.ValidationError("Product not found.")
        # Attach resolved product instance for views
        attrs['product'] = product
        return attrs


class UpdateQuantitySerializer(serializers.Serializer):
    """Serializer for updating cart item quantity."""
    quantity = serializers.IntegerField(min_value=1, required=True)
