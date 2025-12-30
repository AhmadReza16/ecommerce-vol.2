from django.contrib import admin
from .models import adminAccount


@admin.register(adminAccount)
class AccountAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'first_name', 'last_name', 'is_active', 'date_joined')
    list_filter = ('is_active', 'is_staff')
    search_fields = ('email', 'username', 'first_name', 'last_name')
    ordering = ('-date_joined',)

