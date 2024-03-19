from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin
from .models import Company

# Register your models here.

@admin.register(Company)
class CompanyAdmin(SimpleHistoryAdmin):
  '''Admin View for Company'''

  list_display = (
    'id', 'img_preview', 'name', 'phone',
    'email', 'num_employees', 'get_job_positions',
    'get_departments', 'is_active'
  )
  # list_filter = ('',)
  # raw_id_fields = ('',)
  # readonly_fields = ('',)
  # search_fields = ('',)
  # date_hierarchy = ''
  # ordering = ('',)
  list_display_links=('id', 'img_preview')

