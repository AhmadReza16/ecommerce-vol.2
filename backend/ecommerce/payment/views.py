import uuid
from django.db import transaction

from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Payment
from orders.models import Order
from .serializers import PaymentSerializer

class CreatePaymentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, order_id):
        user = request.user

        try:
            order = Order.objects.select_for_update().prefetch_related('items__product').get(id=order_id, user=user)
        except Order.DoesNotExist:
            return Response({"error": "Order not found."}, status=404)

        if order.status != 'pending':
            return Response({"error": "Order already paid or processed."}, status=400)

        # Validate stock availability before payment
        insufficient_stock_items = []
        for item in order.items.all():
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
                status=400
            )
        
        # Use atomic transaction to ensure data safety
        with transaction.atomic():

            # Simulate successful payment
            transaction_id = str(uuid.uuid4())

            payment = Payment.objects.create(
                user=user,
                order=order,
                amount=order.total_price,
                status='success',
                transaction_id=transaction_id
            )

            # Decrease product stock after successful payment
            for item in order.items.all():
                item.product.stock -= item.quantity
                item.product.save()

            # Change order status to paid
            order.status = 'paid'
            order.save()

            serializer = PaymentSerializer(payment)
            return Response(serializer.data, status=201)
        # Simulate successful payment
        transaction_id = str(uuid.uuid4())

        payment = Payment.objects.create(
            user=user,
            order=order,
            amount=order.total_price,
            status='success',
            transaction_id=transaction_id
        )

        # Decrease product stock after successful payment
        for item in order.items.all():
            item.product.stock -= item.quantity
            item.product.save()

        # Change order status to paid
        order.status = 'paid'
        order.save()

        serializer = PaymentSerializer(payment)
        return Response(serializer.data, status=201)


class PaymentHistoryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        payments = Payment.objects.filter(user=request.user).order_by('-created_at')
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)


class PaymentVerifyView(APIView):
    """Simple endpoint to verify a payment status for the frontend."""
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        try:
            payment = Payment.objects.get(id=pk, user=request.user)
        except Payment.DoesNotExist:
            return Response({"error": "Payment not found."}, status=404)

        serializer = PaymentSerializer(payment)
        return Response(serializer.data)
