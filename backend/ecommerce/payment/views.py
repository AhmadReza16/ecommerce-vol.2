import uuid
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
            order = Order.objects.get(id=order_id, user=user)
        except Order.DoesNotExist:
            return Response({"error": "Order not found."}, status=404)

        if order.status != 'pending':
            return Response({"error": "Order already paid or processed."}, status=400)

        # Simulate successful payment
        transaction_id = str(uuid.uuid4())

        payment = Payment.objects.create(
            user=user,
            order=order,
            amount=order.total_price,
            status='success',
            transaction_id=transaction_id
        )

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
