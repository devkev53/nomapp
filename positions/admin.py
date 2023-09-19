from django.contrib import admin

from .models import Department, JobPosition, JobPromotion
# Register your models here.

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
  '''Admin View for Department'''

@admin.register(JobPosition)
class JobPositionAdmin(admin.ModelAdmin):
  '''Admin View for JobPosition'''

@admin.register(JobPromotion)
class JobPromotionAdmin(admin.ModelAdmin):
  '''Admin View for JobPromotion'''