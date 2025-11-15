# orders/views.py
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from cart.models import Cart, CartItem
from .models import Order, OrderItem
from .serializers import OrderSerializer, CreateOrderSerializer

class CreateOrderView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        
        # Validate input using serializer
        serializer = CreateOrderSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # Get or create cart
        try:
            cart = Cart.objects.prefetch_related('items__product').get(user=user)
        except Cart.DoesNotExist:
            return Response({"error": "Cart is empty."}, status=status.HTTP_400_BAD_REQUEST)

        if cart.items.count() == 0:
            return Response({"error": "Cart is empty."}, status=status.HTTP_400_BAD_REQUEST)

        # Validate stock availability before creating order
        insufficient_stock_items = []
        for item in cart.items.all():
            if item.product.stock < item.quantity:
                insufficient_stock_items.append({
                    "product": item.product.name,
                    "available": item.product.stock,
                    "requested": item.quantity
                })
        
        if insufficient_stock_items:
            return Response(
                {
                    "error": "Some products don't have enough stock.",
                    "details": insufficient_stock_items
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get address from request, user profile, or use default
        address = serializer.validated_data.get('address')
        if not address:
            # Try to get from user profile
            try:
                user_profile = user.userprofile
                if user_profile and user_profile.address:
                    address = user_profile.address
            except:
                pass
        
        # If still no address, use default
        if not address:
            address = "No address provided"

        # Create a new order
        order = Order.objects.create(user=user, address=address)

        # Move items from cart to order (stock will be decreased when payment is made)
        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                total_price=item.total()
            )

        # Calculate the total
        order.calculate_total()

        # Delete shopping cart items
        cart.items.all().delete()

        order_serializer = OrderSerializer(order)
        return Response(order_serializer.data, status=status.HTTP_201_CREATED)


class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).select_related('user').prefetch_related('items__product').order_by('-created_at')


class OrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).select_related('user').prefetch_related('items__product')
