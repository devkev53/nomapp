from django.db import IntegrityError, models
from django.core.exceptions import ValidationError
from core.models import BaseModel
from employees.models import Employee
from decimal import Decimal
import datetime

# Create your models here.

class PaymentBase(BaseModel):
  """Model definition for PaymentBase."""

  # TODO: Define fields here
  employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
  amount = models.DecimalField(decimal_places=2, max_digits=10, default=0, editable=False)
  day = models.PositiveSmallIntegerField(editable=False)
  month = models.PositiveSmallIntegerField(editable=False)
  year = models.PositiveSmallIntegerField(editable=False)

  class Meta:
    """Meta definition for PaymentBase."""

    abstract = True
    verbose_name = 'PaymentBase'
    verbose_name_plural = 'PaymentBases'

  def __str__(self):
    """Unicode representation of Pay."""
    return '%s - %s' % (self.employee.get_full_name(), self.created)

  def save(self, *args, **kwargs):
      today = datetime.date.today()
      self.day = today.day
      self.month = today.month
      self.year = today.year
      super(PaymentBase, self).save()

  # TODO: Define custom methods here



class Prepaid(PaymentBase):
  """Model definition for Prepaid."""

  # TODO: Define fields here

  class Meta:
    """Meta definition for Prepaid."""

    verbose_name = 'Prepaid'
    verbose_name_plural = 'Prepaids'
    constraints = [
      models.UniqueConstraint(
        fields=['employee', 'year', 'month'],
        name='prepay_unique_contrain'
      )
    ]

  def save(self):
    """Save method for Prepaid."""
    super(Prepaid, self).save()

  def clean(self):
    self.amount = self.calc_prepaid()
    return super(Prepaid, self).clean()

  # TODO: Define custom methods here

  def calc_prepaid(self):
    try:
      total = self.employee.job_position.salary
      prepaid_amount = "{:.2f}".format(total * Decimal(0.45))
      return prepaid_amount
    except IntegrityError as e:
      raise ValidationError(e)

  
  def salary_base(self):
    return self.employee.job_position.salary
  
  

class MonthPayment(PaymentBase):
  """Model definition for MonthPayment."""

  # TODO: Define fields here

  class Meta:
    """Meta definition for MonthPayment."""

    verbose_name = 'MonthPayment'
    verbose_name_plural = 'MonthPayments'
    constraints = [
      models.UniqueConstraint(
        fields=['employee', 'year', 'month'],
        name='monthPayment_unique_contrain'
      )
    ]

  def save(self):
    """Save method for MonthPayment."""
    super(MonthPayment, self).save()
  
  def clean(self):
    self.amount = self.calc_monthPayment()
    return super(MonthPayment, self).clean()


  def get_absolute_url(self):
    """Return absolute url for MonthPayment."""
    return ('')

  # TODO: Define custom methods here

  def calc_monthPayment(self):
    total = self.employee.job_position.salary
    amount_rest = total - self.get_prepaid()
    cash = (
      amount_rest - Decimal(Decimal(self.calc_creditPayment()) -
      Decimal(self.calc_socialSecurity()) - Decimal(self.calc_solidarityContribution()) -
      Decimal(self.calc_storePayment() + self.calc_commission()))
    )
    cash = amount_rest - Decimal(self.calc_socialSecurity())
    return cash

  def get_prepaid(self):
    today = datetime.date.today()
    try:
      prepaid = Prepaid.objects.filter(employee=self.employee, month=today.month).last()
      return prepaid.amount
    except:
      raise ValidationError("Debe existe el pago quincenal..!")


  def calc_commission(self):
    total = Decimal(0.00)
    return total

  def calc_creditPayment(self):
    total = Decimal(0.00)
    return total

  def calc_storePayment(self):
    total = Decimal(0.00)
    return total

  def calc_solidarityContribution(self):
    total = Decimal(0.00)
    return total

  def calc_socialSecurity(self):
    total = self.employee.job_position.salary
    amount = "{:.2f}".format(total * Decimal(4.83) / 100)
    return amount
