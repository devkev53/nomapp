from django.db import IntegrityError, models
from django.core.exceptions import ValidationError
from core.models import BaseModel
from employees.models import Employee
from decimal import Decimal
import datetime

# Create your models here.

TYPE_PAYMENT_CHOICE = {
  ('1', 'Quincena'),
  ('2', 'Mes'),
  ('3', 'Bono 14'),
  ('4', 'Aguinaldo')

}

class PaymentBase(BaseModel):
  """Model definition for PaymentBase."""

  # TODO: Define fields here
  employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
  amount = models.DecimalField(decimal_places=2, max_digits=10, default=0, editable=False)
  day = models.PositiveSmallIntegerField()
  month = models.PositiveSmallIntegerField()
  year = models.PositiveSmallIntegerField()

  class Meta:
    """Meta definition for PaymentBase."""

    abstract = True
    verbose_name = 'PaymentBase'
    verbose_name_plural = 'PaymentBases'

  def __str__(self):
    """Unicode representation of Pay."""
    return '%s - %s' % (self.employee.get_full_name(), self.created)

  def save(self, *args, **kwargs):
      # today = datetime.date.today()
      # self.day = today.day
      # self.month = today.month
      # self.year = today.year
      super(PaymentBase, self).save()

  # TODO: Define custom methods here


class Payment(PaymentBase):
  """Model definition for Payment."""

  # TODO: Define fields here
  type = models.CharField(choices=TYPE_PAYMENT_CHOICE, default=1, max_length=15)

  class Meta:
    """Meta definition for Payment."""

    verbose_name = 'Payment'
    verbose_name_plural = 'Payments'

  # def save(self):
  #   """Save method for Payment."""
  #   pass


  # TODO: Define custom methods here
  def clean(self):
    if self.type == '1':
      self.amount = self.pay_is_prepaid()
    elif self.type == '2':
      self.amount = self.pay_is_monthPayment()
    return super(Payment, self).clean()



  def salary_base(self):
    return self.employee.job_position.salary
  
  def calculate_bono14(self):
    total = 0
    last_pay = Payment.objects.filter(employee=self.employee).last()
    if last_pay.day >= 30 and last_pay.month == 6:

      last_year_pays = Payment.objects.filter(
        year__gte=(last_pay.year-1), year__lte=(last_pay.year),
        month__gte=1, month__lte=6, employee=self.employee, 
      ).exclude(type=[3,4])
      for pay in last_year_pays:
        total += pay.amount
        print(pay)
    total = total/12
    return total
  
  def calculate_aguinaldo(self):
    total = 0
    last_pay = Payment.objects.filter(employee=self.employee).last()
    if last_pay.day >= 30 and last_pay.month == 11:

      last_year_pays = Payment.objects.filter(
        year__gte=(last_pay.year-1), year__lte=(last_pay.year),
        month__gte=12, month__lte=11, employee=self.employee, 
      ).exclude(type=[3,4])
      for pay in last_year_pays:
        total += pay.amount
        print(pay)
    total = total/12
    return total

  def pay_is_prepaid(self):
    try:
      total = self.employee.job_position.salary
      prepaid_amount = "{:.2f}".format(total * Decimal(0.45))
      print(prepaid_amount)
      return prepaid_amount
    except IntegrityError as e:
      raise ValidationError(e)
      

  def pay_is_monthPayment(self):
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
      prepaid = Payment.objects.filter(employee=self.employee, type=1, month=self.month).last()
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
