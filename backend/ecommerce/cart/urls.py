from django.urls import path
from .views import CartView, AddToCartView, RemoveFromCartView, ClearCartView, UpdateQuantityView

urlpatterns = [
    path('', CartView.as_view(), name='cart-view'),
    path('add/', AddToCartView.as_view(), name='add-to-cart'),
    path('remove/<int:item_id>/', RemoveFromCartView.as_view(), name='remove-from-cart'),
    path('clear/', ClearCartView.as_view(), name='clear-cart'),
    path('update/<int:item_id>/', UpdateQuantityView.as_view(), name='update-quantity'),
]
