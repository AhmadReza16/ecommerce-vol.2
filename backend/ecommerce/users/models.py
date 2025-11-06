from django.db import models
from django.contrib.auth.models import AbstractUser


class Account(AbstractUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    username = models.CharField( max_length=50 , unique=True)
    email = models.EmailField(max_length=100 , unique=True)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username' , 'first_name' , 'last_name']

    def full_name(self):
        return f'{self.first_name} {self.last_name}'

    def __str__(self):
        return self.email
    
class UserProfile(models.Model):
    user =models.OneToOneField(Account , on_delete=models.CASCADE)
    address = models.CharField(max_length=100)
    profile_picture = models.ImageField(blank=True , upload_to='userprofile')