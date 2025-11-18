from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from .models import Review
from .serializers import ReviewSerializer
from .permissions import IsReviewOwner
from .pagination import ReviewPagination


class ReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = ReviewPagination

    def get_queryset(self):
        product_id = self.kwargs['product_id']
        return (
            Review.objects
            .filter(product_id=product_id)
            .select_related('user', 'product')  # بهبود سرعت
        )

    def perform_create(self, serializer):
        product_id = self.kwargs['product_id']
        user = self.request.user

        review = Review.objects.filter(product_id=product_id, user=user).first()
        if review:
            raise ValidationError(f"You already reviewed this product (Review ID: {review.id}).")

        serializer.save(user=user, product_id=product_id)


class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsReviewOwner]

    def get_queryset(self):
        return Review.objects.all()

    def perform_update(self, serializer):
        # Only the person who commented can edit it.
        if serializer.instance.user != self.request.user:
            raise ValidationError("You can only edit your own review.")
        serializer.save()
