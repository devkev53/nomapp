from django.db import IntegrityError, models
from django.db.models import UniqueConstraint
from django.core.exceptions import ValidationError
from django.forms import model_to_dict
from core.models import BaseModel
from employees.models import Employee
from decimal import Decimal
import datetime

from pays.utils import calculate_socialSecurity

# Create your models here.

TYPE_PAYMENT_CHOICE = {
  ('1', 'Quincena'),
  ('2', 'Mes'),
  ('3', 'Bono 14'),
  ('4', 'Aguinaldo')
}

class PayBase(BaseModel):
  """Model definition for PayBase."""

  # TODO: Define fields here
  description = models.CharField(max_length=120, blank=True, null=True)
  employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
  credit_store = models.DecimalField(decimal_places=2, max_digits=10, default=0, blank=True, null=True, editable=False)
  amount = models.DecimalField(decimal_places=2, max_digits=10, default=0, editable=False)
  total = models.DecimalField(decimal_places=2, max_digits=10, editable=False)
  month = models.PositiveSmallIntegerField()
  year = models.PositiveSmallIntegerField()

  class Meta:
    """Meta definition for PayBase."""

    abstract = True
    verbose_name = 'PayBase'
    verbose_name_plural = 'PayBases'

  def __str__(self):
    """Unicode representation of PayBase."""
    return '%s - %s - %s' % (
      self.employee.get_full_name(), self.amount, self.created
    )

  # TODO: Define custom methods here

  def pay_credit_store(self):
    try:
      credit = 0
      from store.models import Sale
      sales = Sale.objects.filter(employee=self.employee, paid_status=False)
      for sale in sales:
        credit += sale.total
        sale.paid_status=True
        sale.save()
      return credit
    except IntegrityError as e:
      raise ValidationError(e)


class FortnightPayment(PayBase):
  """Model definition for FortnightPayment."""

  # TODO: Define fields here

  class Meta:
    """Meta definition for FortnightPayment."""

    unique_together = ['employee', 'year', 'month']
    verbose_name = 'FortnightPayment'
    verbose_name_plural = 'FortnightPayments'

  def save(self, *args, **kwargs):
    # today = datetime.date.today()
    # self.month = today.month
    # self.year = today.year
    self.description = 'Nómina Quincenal'
    # self.validate_pay()
    self.amount = self.employee.total_prepaid()
    self.credit_store = self.pay_credit_store()
    self.total = Decimal(self.amount) - Decimal(self.credit_store)
    super(FortnightPayment, self).save()

  # TODO: Define custom methods here
  def clean(self):
    # self.validate_pay()
    return super(FortnightPayment, self).clean()

  # def validate_pay(self):
  #   today = datetime.date.today()
  #   myMonth = today.month
  #   myYear = today.year
  #   if FortnightPayment.objects.filter(month=myMonth, year=myYear).exists():
  #     raise ValidationError("El pago de este mes ya fue realizado..!")


class MonthlyPayment(PayBase):
  """Model definition for MonthlyPayment."""

  # TODO: Define fields here
  comision = models.DecimalField(decimal_places=2, max_digits=10, default=0, blank=True, null=True)
  social_security = models.DecimalField(decimal_places=2, max_digits=10, default=0, blank=True, null=True)
  contribution = models.DecimalField(decimal_places=2, max_digits=10, default=0, blank=True, null=True)
  credit = models.DecimalField(decimal_places=2, max_digits=10, default=0, blank=True, null=True)


  class Meta:
    """Meta definition for MonthlyPayment."""

    unique_together = ["employee", "year", 'month']
    verbose_name = 'MonthlyPayment'
    verbose_name_plural = 'MonthlyPayments'

  def save(self, *args, **kwargs):
    today = datetime.date.today()
    # self.month = today.month
    # self.year = today.year
    self.amount = self.employee.calculate_monthPayment()
    self.social_security = calculate_socialSecurity(self.employee.job_position.salary)
    self.description = 'Nómina Mensual'
    self.calculate_total()
    super(MonthlyPayment, self).save()

  # TODO: Define custom methods here

  def calculate_total(self):
    amount = Decimal(self.employee.total_monthPayment()) - Decimal(calculate_socialSecurity(self.employee.job_position.salary))
    self.total = amount






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
      today = datetime.date.today()
      self.day = today.day
      self.month = today.month
      self.year = today.year
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
  def toJSON(self):
    item = model_to_dict(self)
    item['salary_base'] = self.salary_base()
    return item

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
      total = self.employee.total_prepaid()
      return total
    except IntegrityError as e:
      raise ValidationError(e)

  def pay_is_monthPayment(self):
    total = self.employee.total_monthPayment()
    return total

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
    try:
      total = self.employee.store_credit()
      return total
    except IntegrityError as e:
      raise ValidationError(e)

  def calc_socialSecurity(self):
    total = self.employee.job_position.salary
    amount = "{:.2f}".format(total * Decimal(4.83) / 100)
    return amount
