from django.urls import path
from .views import CreatePaymentView, PaymentHistoryView

urlpatterns = [
    path('pay/<int:order_id>/', CreatePaymentView.as_view(), name='create-payment'),
    path('history/', PaymentHistoryView.as_view(), name='payment-history'),
]
