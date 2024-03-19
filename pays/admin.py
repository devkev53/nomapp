from typing import Any
from django.contrib import admin
from django.db import IntegrityError
from django.forms import ValidationError
from .models import FortnightPayment, MonthlyPayment, BonoPayment, AguinaldoPayment

# Register your models here.

@admin.register(FortnightPayment)
class FortnightPaymentAdmin(admin.ModelAdmin):
  '''Admin View for FortnightPayment'''

  list_display = (
    'employee', 'get_company_name', 'month', 
    'year', 'amount', 'credit_store', 'total', 
    'get_base_salary', 'pay_credit_store'
    )


@admin.register(MonthlyPayment)
class MonthlyPaymentAdmin(admin.ModelAdmin):
  '''Admin View for MonthlyPayment'''

  list_display = (
    'employee', 'get_company_name', 'month',
    'year', 'amount', 'credit_store',
    'comision', 'contribution', 'credit',
    'social_security', 'total', 'pay_credit_store'
  )

@admin.register(BonoPayment)
class BonoPaymentAdmin(admin.ModelAdmin):
  '''Admin View for BonoPayment'''

  list_display = (
    'employee', 'get_employee_start_work', 'get_company_name', 'month', 
    'year', 'amount', 'credit_store', 'total', 
    'get_base_salary', 
    'calculate_days_for_pay', 'calculate_months_for_pay'
    )
  
@admin.register(AguinaldoPayment)
class AguinaldoPaymentAdmin(admin.ModelAdmin):
  '''Admin View for AguinaldoPayment'''

  list_display = (
    'employee', 'get_employee_start_work', 'get_company_name', 'month', 
    'year', 'amount', 'credit_store', 'total', 
    'get_base_salary', 
    'calculate_days_for_pay', 'calculate_months_for_pay'
    )