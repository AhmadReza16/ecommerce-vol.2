from django.contrib import admin
from django.utils.html import mark_safe
from .models import Product , Category

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock', 'category')
    list_filter = ('category',)
    search_fields = ('name', 'description')

    readonly_fields = ("image_preview",)

    def image_preview(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" width="120" style="border-radius:8px"/>')
        return "No image"

    fieldsets = (
        ("Product Info", {
            "fields": ("name", "category", "price", "stock")
        }),
        ("Description", {
            "fields": ("description",)
        }),
        ("Image", {
            "fields": ("image", "image_preview")
        }),
    )

    # جلوگیری از حذف اشتباهی عکس
    def save_model(self, request, obj, form, change):
        if change:  
            old_obj = Product.objects.get(pk=obj.pk)
            if not obj.image:  
                obj.image = old_obj.image  
        super().save_model(request, obj, form, change)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)