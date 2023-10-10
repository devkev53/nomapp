import datetime
from django.db import models
from django.utils.html import format_html

from core.models import BaseModel

# Create your models here.


class Company(BaseModel):
  """Model definition for Company."""

  # TODO: Define fields here
  name = models.CharField(max_length=255)
  description = models.TextField(blank=True, null=True)
  address = models.CharField(max_length=255, blank=True, null=True)
  city = models.CharField(max_length=255, blank=True, null=True)
  phone = models.CharField(max_length=15, blank=True, null=True)
  logo = models.ImageField(blank=True, null=True, upload_to='companies/logo/')
  email = models.EmailField(blank=True, null=True)

  class Meta:
    """Meta definition for Company."""

    verbose_name = 'Company'
    verbose_name_plural = 'Companys'

  def __str__(self):
    """Unicode representation of Company."""
    return '%s' % (self.name)

  def url_img(self):
    if not self.logo:
      return 'https://api.multiavatar.com/%s.svg' % self.name
    else:
      return self.logo.url

  def img_preview(self):
    style = 'object-fit:contain; border-radius: 50%; width: 30px; height:30px; background: #fff'
    return format_html('<img src="{}" style="{}" />', self.url_img(), style)

  def num_employees(self):
    count = 0
    try:
      from employees.models import Employee
      employes = Employee.objects.filter(job_position__department__company=self.id)
      for employee in employes:
        count += 1
      return count
    except employes.DoesNotExist as e:
      raise e

  # def getLastPayment(self):
  #   try:
  #     from pays.models import Payment
  #     lastPay = Payment.objects.filter(employee__job_position__department__company=self.pk).last()
  #     return lastPay.toJSON()
  #   except:
  #     return None

  # def activate_payment_option(self):
  #   today = datetime.datetime.now()
  #   day = today.day
  #   month = today.month
  #   year = today.year
  #   from pays.models import Payment
  #   lastPay = Payment.objects.filter(employee__job_position__department__company=self.pk).last()
  #   if lastPay == None:
  #     if day >= 13 and day <= 18:
  #       return True
  #     elif day >= 26 and day <= 31:
  #       return True
  #   elif lastPay.month < month and lastPay.year == year:
  #     if day >= 13 and day <= 18:
  #       return True
  #     elif day >= 26 and day <= 18:
  #       return True
  #   elif lastPay.month == month and lastPay.type == '1':
  #     if day >= 26 and day <= 31:
  #       return True
  #     else:
  #       return False
  #   return False

  def get_job_positions(self):
    from positions.models import JobPosition
    positions  = []
    for position in JobPosition.objects.filter(department__company=self.id):
      positions.append(position.toJSON())
    return positions

  def get_departments(self):
    from positions.models import Department
    departments = []
    for department in Department.objects.filter(company=self.id):
      departments.append(department.toJSON())
    return departments