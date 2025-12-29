from django.contrib.auth.models import Group, Permission
from django.db import models
from django.contrib.auth.models import AbstractUser


class Account(AbstractUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    is_staff = models.BooleanField(default=False)  # تعیین دسترسی ادمین
    is_active = models.BooleanField(default=True)
    
    groups = models.ManyToManyField(
        Group,
        related_name='users_user_groups',
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='users_user_permissions',
        blank=True
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def full_name(self):
        return f'{self.first_name} {self.last_name}'

    def __str__(self):
        return self.email
    
class UserProfile(models.Model):
    user = models.OneToOneField(Account, on_delete=models.CASCADE)
    address = models.CharField(max_length=100)
    profile_picture = models.ImageField(blank=True, upload_to='userprofile')
    phone = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return str(self.user)
    
class Address(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    address_line = models.CharField(max_length=255)


