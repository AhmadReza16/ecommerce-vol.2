
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import Group, Permission

class adminAccount(AbstractUser):
    groups = models.ManyToManyField(
        Group,
        related_name='adminpanel_user_groups',
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='adminpanel_user_permissions',
        blank=True
    )
    
