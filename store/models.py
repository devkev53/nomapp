from django.db import models
from django.forms import ValidationError
from core.models import BaseModel
from products.models import Product
from employees.models import Employee
from pays.models import Prepaid, MonthPayment
from decimal import Decimal
import datetime

# Create your models here.


class Sale(BaseModel):
  """Model definition for Sale."""

  # TODO: Define fields here
  employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
  paid_status = models.BooleanField(default=False)
  total = models.DecimalField(decimal_places=2, max_digits=10)

  class Meta:
    """Meta definition for Sale."""

    verbose_name = 'Sale'
    verbose_name_plural = 'Sales'

  def __str__(self):
    """Unicode representation of Sale."""
    return '%s - %s - %s' % (self.employee.get_full_name(), self.created, self.total)

  def clean(self):
    self.check_salary()
    return super(Sale, self).clean()

  # TODO: Define custom methods here

  def calc_total_sale(self):
    total = Decimal(0.00)
    for detail in SaleDetail.objects.filter(sale=self.id):
      total += Decimal(detail.total)
    return total

  def check_salary(self):
    today = datetime.date.today()
    last_prepaid = Prepaid.objects.filter(employee=self.employee, month=today.month).last()
    last_monthPayment = MonthPayment.objects.filter(employee=self.employee, month=today.month).last()
    print(last_prepaid)
    print(last_monthPayment)
    if today.day > 14 and last_monthPayment == None:
      print("Verifica Fin de Mes")
      self.check_monthPayment()
    elif today.day > 14 and last_monthPayment:
      print("Verifica Quincena")
      self.check_prepaid()
    else:
      self.check_prepaid()

  def check_prepaid(self):
    total_salary = self.employee.job_position.salary
    prepaid_amount = "{:.2f}".format(total_salary * Decimal(0.45))
    total = (self.calc_total_sale() / 2) < prepaid_amount
    if total:
      return
    else:
      raise ValidationError("El monto excede el 50% del pago quincenal, su monto es de  {}", prepaid_amount)

  def check_monthPayment(self):
      total_salary = self.employee.job_position.salary
      month_payment = "{:.2f}".format(total_salary * Decimal(0.45))
      month_payment = Decimal(
        Decimal(total_salary) - Decimal(month_payment) -
        Decimal(self.calc_socialSecurity()) - Decimal(self.calc_creditPayment()) -
        Decimal(self.calc_solidarityContribution()) + Decimal(self.calc_commission())
      )
      total = Decimal(self.calc_total_sale() / 2) < Decimal(month_payment)

      if total:
        return
      else:
        raise ValidationError("El monto excede el 50% del pago mensual, su monto es de Q. {}".format(month_payment))

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



class SaleDetail(BaseModel):
  """Model definition for SaleDetail."""

  # TODO: Define fields here
  sale = models.ForeignKey(Sale, on_delete=models.CASCADE)
  product = models.ForeignKey(Product, on_delete=models.CASCADE)
  amount = models.PositiveSmallIntegerField(default=1)
  total = models.DecimalField(max_digits=10, decimal_places=2)

  class Meta:
    """Meta definition for SaleDetail."""

    verbose_name = 'SaleDetail'
    verbose_name_plural = 'SaleDetails'

  def __str__(self):
    """Unicode representation of SaleDetail."""
    return '%s - %s' % (self.product.name, self.total)

  # def save(self):
  #   self.total = Decimal(self.cacl_total())
  #   return super(SaleDetail, self).save()

  # TODO: Define custom methods here

  def cacl_total(self):
    total = Decimal(0.00)
    price = self.product.price
    total = Decimal(price) * Decimal(self.amount)
    return total

