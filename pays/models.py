from django.db import IntegrityError, models
from django.db.models import UniqueConstraint
from django.core.exceptions import ValidationError
from django.forms import model_to_dict
from core.models import BaseModel
from employees.models import Employee
from decimal import Decimal
import datetime
import _strptime
import calendar

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
  bono3701 = models.DecimalField(decimal_places=2, max_digits=10, default=0.00)
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

  def get_employee_start_work(self):
    return self.employee.created

  def get_fortnightPayment(self):
    total = Decimal(Decimal(self.get_base_salary()) * Decimal(.45))
    return Decimal("{:.2f}".format(total))

  def get_monthlyPayment(self):
    total = Decimal(self.get_base_salary() - self.get_fortnightPayment())
    return Decimal("{:.2f}".format(total))

  def get_base_salary(self):
    return Decimal(self.employee.job_position.salary)

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

  def get_company_name(self):
    return self.employee.job_position.department.company.name





class FortnightPayment(PayBase):
  """Model definition for FortnightPayment."""

  # TODO: Define fields here
  type_payment = models.PositiveSmallIntegerField(default=1)

  class Meta:
    """Meta definition for FortnightPayment."""

    ordering = ["year", "month"]
    unique_together = ['employee', 'year', 'month']
    verbose_name = 'FortnightPayment'
    verbose_name_plural = 'FortnightPayments'

  def save(self, *args, **kwargs):
    self.description = 'Nómina Quincenal'
    self.amount = self.get_fortnightPayment()
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
 
  def get_base_salary(self):
    return Decimal(self.employee.job_position.salary)

  def calculate_total(self):
    amount = Decimal(self.total_ingresos()) - Decimal(self.total_egresos())
    self.total = amount

  def total_ingresos(self):
    total = Decimal(self.amount) + Decimal(self.credit_store)
    return total

  def total_egresos(self):
    total = Decimal(self.credit_store)
    return total



class MonthlyPayment(PayBase):
  """Model definition for MonthlyPayment."""

  # TODO: Define fields here
  type_payment = models.PositiveSmallIntegerField(default=2)
  comision = models.DecimalField(decimal_places=2, max_digits=10, default=0, blank=True, null=True)
  social_security = models.DecimalField(decimal_places=2, max_digits=10, default=0, blank=True, null=True)
  contribution = models.DecimalField(decimal_places=2, max_digits=10, default=0, blank=True, null=True)
  credit = models.DecimalField(decimal_places=2, max_digits=10, default=0, blank=True, null=True)


  class Meta:
    """Meta definition for MonthlyPayment."""

    ordering = ["year", "month"]
    unique_together = ["employee", "year", 'month']
    verbose_name = 'MonthlyPayment'
    verbose_name_plural = 'MonthlyPayments'

  def save(self, *args, **kwargs):
    today = datetime.date.today()
    self.bono3701 = self.calculate_bono3701()
    self.credit_store = self.pay_credit_store()
    self.amount = self.get_monthlyPayment()
    self.social_security = calculate_socialSecurity(self.employee.job_position.salary)
    self.description = 'Nómina Mensual'
    self.calculate_total()
    super(MonthlyPayment, self).save()

  # TODO: Define custom methods here

  def calculate_bono3701(self):
    return Decimal(250.00)

  def calculate_total(self):
    amount = Decimal(self.total_ingresos()) - Decimal(self.total_egresos())
    self.total = amount

  def total_ingresos(self):
    total = Decimal(self.amount) + Decimal(self.comision) + Decimal(self.calculate_bono3701())
    return total

  def total_egresos(self):
    total = Decimal(self.credit_store) + Decimal(calculate_socialSecurity(self.employee.job_position.salary)) + Decimal(self.contribution) + Decimal(self.credit)
    return total



class BonoPayment(PayBase):
  """Model definition for BonoPayment."""

  # TODO: Define fields here
  type_payment = models.PositiveSmallIntegerField(default=3)
  # days_payment = models.PositiveSmallIntegerField(blank=True, null=True)
  # months_payment = models.PositiveSmallIntegerField(blank=True, null=True)
  # amount_days_payment = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, blank=True, null=True)
  # amount_months_payment = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, blank=True, null=True)

  class Meta:
    """Meta definition for BonoPayment."""

    ordering = ["year", "month"]
    unique_together = ['employee', 'year', 'month']
    verbose_name = 'BonoPayment'
    verbose_name_plural = 'BonoPayments'

  def save(self, *args, **kwargs):
    self.description = 'Nómina Bono 14'
    self.amount = self.calculate_amount()
    self.total = Decimal(self.amount)
    super(BonoPayment, self).save()
  
  def calculate_days_for_pay(self):
    base = self.employee.job_position.salary
    salary_for_monht = base / 12
    salary_for_day = salary_for_monht / 31
    day = self.employee.created.day
    month = self.employee.created.month
    last_month_day = calendar.monthrange(self.year, month)[1]
    days_for_pay = last_month_day - day
    return {"days":days_for_pay, "amount": Decimal("{:.2f}".format(days_for_pay * salary_for_day)) }
  
  def calculate_months_for_pay(self):
    base = self.employee.job_position.salary
    salary_for_monht = base / 12
    month = self.employee.created.month
    if month < 6:
      months_for_pay = 6 - month
    elif month > 6:
      months_for_pay = (12 - month) + 6
    return {"months":months_for_pay, "amount": Decimal("{:.2f}".format(salary_for_monht * months_for_pay)) }

  def calculate_amount(self):
    days = self.calculate_days_for_pay()
    months = self.calculate_months_for_pay()
    total = days['amount'] + months['amount']
    return total
      
    
  def calculate_total(self):
    amount = Decimal(self.total_ingresos()) - Decimal(self.total_egresos())
    self.total = amount

  def total_ingresos(self):
    total = Decimal(self.amount)
    return total

  def total_egresos(self):
    total = 0
    return total
  
  def days_pays(self):
    pass
  def months_pays(self):
    pass


class AguinaldoPayment(PayBase):
  """Model definition for AguinaldoPayment."""

  # TODO: Define fields here
  type_payment = models.PositiveSmallIntegerField(default=4)

  class Meta:
    """Meta definition for AguinaldoPayment."""

    ordering = ["year", "month"]
    unique_together = ['employee', 'year', 'month']
    verbose_name = 'AguinaldoPayment'
    verbose_name_plural = 'AguinaldoPayments'

  def save(self, *args, **kwargs):
    self.description = 'Nómina Aguinaldo'
    self.amount = self.calculate_amount()
    self.total = Decimal(self.amount)
    super(AguinaldoPayment, self).save()

  def calculate_days_for_pay(self):
    base = self.employee.job_position.salary
    salary_for_monht = base / 12
    salary_for_day = salary_for_monht / 31
    day = self.employee.created.day
    month = self.employee.created.month
    last_month_day = calendar.monthrange(self.year, month)[1]
    days_for_pay = last_month_day - day
    return {"days":days_for_pay, "amount": Decimal("{:.2f}".format(days_for_pay * salary_for_day)) }
  
  def calculate_months_for_pay(self):
    base = self.employee.job_position.salary
    salary_for_monht = base / 12
    month = self.employee.created.month
    if month < 12:
      months_for_pay = 12 - month
    elif month == 12:
      months_for_pay = 12
    return {"months":months_for_pay, "amount": Decimal("{:.2f}".format(salary_for_monht * months_for_pay)) }

  def calculate_amount(self):
    days = self.calculate_days_for_pay()
    months = self.calculate_months_for_pay()
    total = days['amount'] + months['amount']
    return total
      
    
  def calculate_total(self):
    amount = Decimal(self.total_ingresos()) - Decimal(self.total_egresos())
    self.total = amount

  def total_ingresos(self):
    total = Decimal(self.amount)
    return total

  def total_egresos(self):
    total = 0
    return total