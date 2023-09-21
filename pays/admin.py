from typing import Any
from django.contrib import admin
from django.db import IntegrityError
from django.forms import ValidationError
from .models import Prepaid, MonthPayment

# Register your models here.

@admin.register(Prepaid)
class PrepaidAdmin(admin.ModelAdmin):
  '''Admin View for Prepaid'''

  list_display = ('employee', 'amount','salary_base', 'month', 'year')
  # list_filter = ('',)
  # inlines = [
  #   Inline,
  # ]
  # raw_id_fields = ('',)
  # readonly_fields = ('',)
  # search_fields = ('',)
  # date_hierarchy = ''
  # ordering = ('',)

@admin.register(MonthPayment)
class MonthPaymentAdmin(admin.ModelAdmin):
  '''Admin View for MonthPayment'''

  list_display = (
    'employee', 'amount', 'get_prepaid', 'calc_monthPayment',
    'calc_commission', 'calc_creditPayment', 
    'calc_storePayment', 'calc_solidarityContribution', 
    'calc_socialSecurity', 'month', 'year'
  )
  # list_filter = ('',)
  # inlines = [
  #   Inline,
  # ]
  # raw_id_fields = ('',)
  # readonly_fields = ('',)
  # search_fields = ('',)
  # date_hierarchy = ''
  # ordering = ('',)
