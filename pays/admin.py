from django.contrib import admin
from .models import Prepaid

# Register your models here.

@admin.register(Prepaid)
class PrepaidAdmin(admin.ModelAdmin):
  '''Admin View for Prepaid'''

  list_display = ('employee', 'salary_base', 'calc_prepaid')
  # list_filter = ('',)
  # inlines = [
  #   Inline,
  # ]
  # raw_id_fields = ('',)
  # readonly_fields = ('',)
  # search_fields = ('',)
  # date_hierarchy = ''
  # ordering = ('',)