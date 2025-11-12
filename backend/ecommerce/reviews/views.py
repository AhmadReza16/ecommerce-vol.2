# reviews/views.py
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from .models import Review
from .serializers import ReviewSerializer

class ReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = None  # Disable pagination

    def get_queryset(self):
        product_id = self.kwargs['product_id']
        return Review.objects.filter(product_id=product_id)

    def perform_create(self, serializer):
        product_id = self.kwargs['product_id']
        user = self.request.user

        # Prevent re-posting of comments for the same product
        if Review.objects.filter(product_id=product_id, user=user).exists():
            raise ValidationError("You have already reviewed this product.")

        serializer.save(user=user, product_id=product_id)


class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Review.objects.all()

    def perform_update(self, serializer):
        # Only the person who commented can edit it.
        if serializer.instance.user != self.request.user:
            raise ValidationError("You can only edit your own review.")
        serializer.save()
