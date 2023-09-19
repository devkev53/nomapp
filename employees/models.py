from django.db import models
from django.utils.html import format_html

from core.models import BaseModel
from companies.models import Company
from positions.models import JobPosition, JobPromotion, Department
from users.models import User

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
  company = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
  department = models.OneToOneField(Department, on_delete=models.CASCADE, blank=True, null=True)
  job_position = models.OneToOneField(JobPosition, on_delete=models.CASCADE, blank=True, null=True)
  job_promotion = models.ForeignKey(JobPromotion, on_delete=models.CASCADE, blank=True, null=True)

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
