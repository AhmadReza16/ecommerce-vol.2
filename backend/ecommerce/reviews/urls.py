from django.urls import path
from .views import ReviewListCreateView, ReviewDetailView

# Frontend expects:
# - list/create: /api/reviews/<product_id>/
# - detail (retrieve/update/delete): /api/reviews/detail/<pk>/
urlpatterns = [
    path('<int:product_id>/', ReviewListCreateView.as_view(), name='product-reviews'),
    path('detail/<int:pk>/', ReviewDetailView.as_view(), name='review-detail'),
]