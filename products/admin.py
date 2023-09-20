from django.contrib import admin
from .models import Product, ProductImage

# Register your models here.

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
  '''Admin View for Product'''

  # list_display = ('',)
  # list_filter = ('',)
  # inlines = [
  #   Inline,
  # ]
  # raw_id_fields = ('',)
  # readonly_fields = ('',)
  # search_fields = ('',)
  # date_hierarchy = ''
  # ordering = ('',)

@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
  '''Admin View for ProductImage'''

  # list_display = ('',)
  # list_filter = ('',)
  # inlines = [
  #   Inline,
  # ]
  # raw_id_fields = ('',)
  # readonly_fields = ('',)
  # search_fields = ('',)
  # date_hierarchy = ''
  # ordering = ('',)