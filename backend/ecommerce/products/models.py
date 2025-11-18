from django.db import models
from django.conf import settings
from django.db.models import Avg
from django.utils.text import slugify

class Category(models.Model):
    name = models.CharField( max_length=50 , unique=True)
    slug = models.SlugField(unique=True)
    
    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name
    

class ActiveProductManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_active=True)

class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=220, unique=True, blank=True, db_index=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, db_index=True)
    stock = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to='product_images/', null=True, blank=True)
    seller = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='products')
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True, db_index=True)


        # managers
    objects = models.Manager()
    active = ActiveProductManager()
    
    class Meta:
        indexes = [
            models.Index(fields=['name', 'is_active']),
            models.Index(fields=['price', 'is_active']),
            models.Index(fields=['created_at', 'is_active']),
        ]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    @property
    def average_rating(self):
        return self.reviews.aggregate(avg=Avg('rating'))['avg'] or 0