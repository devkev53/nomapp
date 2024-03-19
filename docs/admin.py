from django.contrib import admin
from .models import EmployeDocuments

# Register your models here.

@admin.register(EmployeDocuments)
class EmployeDocumentsAdmin(admin.ModelAdmin):
  '''Admin View for EmployeDocuments'''