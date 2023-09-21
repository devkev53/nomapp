from django.db import models
from django.utils.html import format_html
from decimal import Decimal

from core.models import BaseModel
from users.models import User
from positions.models import JobPosition
from pays.utils import calculate_socialSecurity

# Create your models here.

GENDER_CHOICE = {
  ('M', 'Male'),
  ('F', 'Female')
}

FAMILYRELATION_CHOICE = {
  ('Father', 'father'),
  ('Mother', 'motherr'),
  ('Son', 'son'),
  ('Daughter', 'daughter'),
  ('Wife', 'wife'),
  ('Husband', 'husband'),
  ('Brother', 'brother'),
  ('Sister', 'sister'),
}

class PersonBase(BaseModel):

    # TODO: Define fields here
    name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    address = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)
    gender = models.CharField(choices=GENDER_CHOICE, max_length=10)

    class Meta:
      abstract = True
      verbose_name = "PersonBase"
      verbose_name_plural = "PersonBases"
    # TODO: Define custom methods here

    def get_full_name(self):
      return '%s %s' % (self.name, self.last_name)


class Employee(PersonBase):
  """Model definition for Employee."""

  # TODO: Define fields here
  user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
  photo = models.ImageField(upload_to='employees/photos/', blank=True, null=True)
  start_work_date = models.DateField(blank=True, null=True)
  job_position = models.ForeignKey(JobPosition, on_delete=models.CASCADE, null=True, blank=True)

  class Meta:
    """Meta definition for Employee."""

    verbose_name = 'Employee'
    verbose_name_plural = 'Employees'

  def __str__(self):
    """Unicode representation of Employee."""
    return self.get_full_name()

  # TODO: Define custom methods here

  def get_full_name(self):
    return '%s %s' % (self.name, self.last_name)

  def url_img(self):
    if not self.photo:
      return 'https://api.multiavatar.com/%s.svg' % self.name
    else:
      return self.photo.url

  def img_preview(self):
    style = 'object-fit:contain; border-radius: 50%; width: 30px; height:30px; background: #fff'
    return format_html('<img src="{}" style="{}" />', self.url_img(), style)

  def calculate_prepaid(self):
    total = None
    if self.job_position:
      total = "{:.2f}".format(Decimal(self.job_position.salary * Decimal(.45)))
    return total

  def calculate_monthPayment(self):
    total = None
    if self.job_position:
      month_payment = Decimal(self.job_position.salary - Decimal(self.calculate_prepaid()))
      social_security = calculate_socialSecurity(self.job_position.salary)
      total = "{:.2f}".format(Decimal(month_payment) - Decimal(social_security))
    return total



class FamilyMember(PersonBase):
  """Model definition for FamilyMember."""

  # TODO: Define fields here
  employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
  relation = models.CharField(choices=FAMILYRELATION_CHOICE, max_length=10)
  dependent = models.BooleanField(default=False)

  class Meta:
    """Meta definition for FamilyMember."""

    verbose_name = 'FamilyMember'
    verbose_name_plural = 'FamilyMembers'

  def __str__(self):
    """Unicode representation of FamilyMember."""
    return '%s %s' % (self.name, self.last_name)

# Salario = 19750
# IGSS = (19750*4.83)/100 => 953.925
# Salario Percibido = (19750-953.925) => 18796.075
