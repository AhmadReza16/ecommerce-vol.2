from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
from products.models import Product


class CartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    
class AddToCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found."}, status=404)

        cart, _ = Cart.objects.get_or_create(user=request.user)
        item, created = CartItem.objects.get_or_create(cart=cart, product=product)

        if not created:
            item.quantity += quantity
        else:
            item.quantity = quantity

        item.save()
        return Response({"message": "Product added to cart successfully."})
    


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
        try:
            item = CartItem.objects.get(id=item_id, cart__user=request.user)
            quantity = request.data.get('quantity', 1)
            if int(quantity) < 1:
                return Response({"error": "Quantity must be at least 1."}, status=400)
            item.quantity = int(quantity)
            item.save()
            serializer = CartItemSerializer(item)
            return Response(serializer.data, status=200)
        except CartItem.DoesNotExist:
            return Response({"error": "Item not found."}, status=404)
