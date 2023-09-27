from django.contrib import admin
from .models import Employee, FamilyMember

# Register your models here.

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
  '''Admin View for Employee'''

  list_display=(
    'img_preview', 'get_full_name', 'gender', 'job_position',
    'calculate_prepaid', 'calculate_monthPayment', 'url_img'
  )
  list_filter=()
  list_display_links=('img_preview', 'get_full_name',)


@admin.register(FamilyMember)
class FamilyMemberAdmin(admin.ModelAdmin):
  '''Admin View for FamilyMember'''
