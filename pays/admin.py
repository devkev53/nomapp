from typing import Any
from django.contrib import admin
from django.db import IntegrityError
from django.forms import ValidationError
from .models import Payment, FortnightPayment, MonthlyPayment

# Register your models here.

@admin.register(FortnightPayment)
class FortnightPaymentAdmin(admin.ModelAdmin):
  '''Admin View for FortnightPayment'''

  list_display = ('employee', 'get_company_name', 'month', 'year', 'amount', 'credit_store', 'total', 'get_base_salary')


@admin.register(MonthlyPayment)
class MonthlyPaymentAdmin(admin.ModelAdmin):
  '''Admin View for MonthlyPayment'''

  list_display = (
    'employee', 'get_company_name', 'month', 'year', 'amount', 'credit_store',
    'comision', 'contribution', 'credit',
    'social_security', 'total'
  )


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
  '''Admin View for Payment'''

  list_display = ('employee', 'type', 'amount','salary_base', 'month', 'year', 'calculate_bono14')
