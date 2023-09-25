from typing import Any
from django.contrib import admin
from django.db import IntegrityError
from django.forms import ValidationError
from .models import Payment

# Register your models here.

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
  '''Admin View for Payment'''

  list_display = ('employee', 'type', 'amount','salary_base', 'month', 'year', 'calculate_bono14')
