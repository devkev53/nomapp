from django.db import models
from core.models import BaseModel
from employees.models import Employee
from decimal import Decimal

# Create your models here.


class Prepaid(models.Model):
  """Model definition for Pay."""

  # TODO: Define fields here
  employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
  amount = models.DecimalField(decimal_places=2, max_digits=10)

  class Meta:
    """Meta definition for Pay."""

    verbose_name = 'Pay'
    verbose_name_plural = 'Pays'

  def __str__(self):
    """Unicode representation of Pay."""
    return self.employee.get_full_name()

  # def save(self):
  #   """Save method for Pay."""
  #   return None

  # TODO: Define custom methods here

  def calc_prepaid(self):
    total = self.employee.job_position.salary
    prepaid_amount = (total * Decimal(0.45))
    return prepaid_amount
  
  def salary_base(self):
    return self.employee.job_position.salary