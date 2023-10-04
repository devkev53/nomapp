from django.contrib import admin
from .models import Employee, FamilyMember

# Register your models here.

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
  '''Admin View for Employee'''

  list_display=(
    'img_preview', 'get_full_name', 'gender', 'job_position',
    'total_prepaid', 'total_monthPayment','social_security', 'store_credit',
    'calculate_prepaid', 'calculate_monthPayment', 'url_img', 'calculate_old_year'
  )
  list_filter=()
  list_display_links=('img_preview', 'get_full_name',)


@admin.register(FamilyMember)
class FamilyMemberAdmin(admin.ModelAdmin):
  '''Admin View for FamilyMember'''
