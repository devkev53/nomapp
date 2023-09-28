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
  
  def getLastPayment(self):
    try:
      from pays.models import Payments
      lastPay = Payments.object.filter(employee__job_position__department__company=self.pk).last()
      return last_pay.toJSON()
    except:
      return None
      
    
