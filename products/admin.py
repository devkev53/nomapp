from django.contrib import admin
from .models import Product
# Register your models here.

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
  '''Admin View for Product'''

  list_display = ('name', 'price', 'url_img')
  # list_filter = ('',)
  # raw_id_fields = ('',)
  # readonly_fields = ('',)
  search_fields = ('name',)
  # date_hierarchy = ''
  # ordering = ('',)

