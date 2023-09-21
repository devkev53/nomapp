from django.contrib import admin
from .models import Sale, SaleDetail

# Register your models here.


@admin.register(SaleDetail)
class SaleDetailAdmin(admin.ModelAdmin):
  '''Admin View for SaleDetail'''

  # list_display = ('',)
  # list_filter = ('',)
  # inlines = [
  #   Inline,
  # ]
  # raw_id_fields = ('',)
  # readonly_fields = ('',)
  search_fields = ('product',)
  # date_hierarchy = ''
  # ordering = ('',)

class SaleDetailAdmin(admin.TabularInline):
  '''Admin View for SaleDetail'''
  model = SaleDetail
  extra = 0
  search_fields = ('product',)
  autocomplete_fields = ['product']

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
  '''Admin View for Sale'''

  list_display = ('id', 'created', 'employee', 'total')
  # list_filter = ('',)
  inlines = [
    SaleDetailAdmin,
  ]
  # raw_id_fields = ('',)
  # readonly_fields = ('',)
  # search_fields = ('',)
  # date_hierarchy = ''
  # ordering = ('',)
