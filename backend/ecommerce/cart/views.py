from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer, AddToCartSerializer, UpdateQuantitySerializer
from products.models import Product


class CartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    
    def get(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        cart = Cart.objects.prefetch_related("items__product").get(id=cart.id)
        serializer = CartSerializer(cart, context={"request": request})
        return Response(serializer.data)
    
class AddToCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        # Validate input using serializer
        serializer = AddToCartSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        product_id = serializer.validated_data['product_id']
        quantity = serializer.validated_data['quantity']

        try:
            product = Product.objects.get(id=product_id, is_active=True)
        except Product.DoesNotExist:
            return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

        cart, _ = Cart.objects.get_or_create(user=request.user)
        item, created = CartItem.objects.get_or_create(cart=cart, product=product)

        # Calculate new quantity
        new_quantity = item.quantity + quantity if not created else quantity

        # Check if new quantity exceeds stock
        if new_quantity > product.stock:
            return Response(
                {"error": f"Not enough stock. Available: {product.stock}, Requested: {new_quantity}."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        item.quantity = new_quantity
        item.save()
        return Response({"message": "Product added to cart successfully."}, status=status.HTTP_200_OK)
    


class RemoveFromCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, item_id):
        try:
            item = CartItem.objects.get(id=item_id, cart__user=request.user)
            item.delete()
            return Response({"message": "Item removed from cart."}, status=204)
        except CartItem.DoesNotExist:
            return Response({"error": "Item not found."}, status=404)


class ClearCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            cart = Cart.objects.get(user=request.user)
            CartItem.objects.filter(cart=cart).delete()
            return Response({"message": "Cart cleared successfully."}, status=200)
        except Cart.DoesNotExist:
            return Response({"message": "Cart already empty."}, status=200)


class UpdateQuantityView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, item_id):
        # Validate input using serializer
        serializer = UpdateQuantitySerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        quantity = serializer.validated_data['quantity']
        
        try:
            item = CartItem.objects.select_related('product').get(id=item_id, cart__user=request.user)
        except CartItem.DoesNotExist:
            return Response({"error": "Item not found."}, status=status.HTTP_404_NOT_FOUND)
        
        # Check stock availability
        if item.product.stock < quantity:
            return Response(
                {"error": f"Only {item.product.stock} items available in stock."}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        item.quantity = quantity
        item.save()
        item_serializer = CartItemSerializer(item)
        return Response(item_serializer.data, status=status.HTTP_200_OK)
