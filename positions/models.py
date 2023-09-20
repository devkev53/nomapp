from django.db import models
from core.models import BaseModel
from companies.models import Company
# from employees.models import Employee

# Create your models here.


class Department(BaseModel):
  """Model definition for Department."""

  # TODO: Define fields here
  name = models.CharField(max_length=60)
  company = models.ForeignKey(Company, on_delete=models.CASCADE)

  class Meta:
    """Meta definition for Department."""

    verbose_name = 'Department'
    verbose_name_plural = 'Departments'

  def __str__(self):
    """Unicode representation of Department."""
    return self.name

  # TODO: Define custom methods here


class JobPosition(models.Model):
  """Model definition for JobPosition."""

  # TODO: Define fields here
  department = models.ForeignKey(Department, on_delete=models.CASCADE)
  name = models.CharField(max_length=120)
  salary = models.DecimalField(max_digits=12, decimal_places=2)
  # employee = models.ManyToManyField(Employee)

  class Meta:
    """Meta definition for JobPosition."""

    verbose_name = 'JobPosition'
    verbose_name_plural = 'JobPositions'

  def __str__(self):
    """Unicode representation of JobPosition."""
    return '%s - %s' % (self.name, self.salary)

  # TODO: Define custom methods here


class JobPromotion(BaseModel):
  """Model definition for JobPromotion."""

  # TODO: Define fields here
  employee = models.PositiveIntegerField()
  old_job_position = models.IntegerField()
  old_department = models.IntegerField()
  old_salary = models.DecimalField(max_digits=12, decimal_places=2)
  new_job_position = models.IntegerField()
  new_department = models.IntegerField()
  new_salary = models.DecimalField(max_digits=12, decimal_places=2)
  date_start_new_position = models.DateField()

  class Meta:
    """Meta definition for JobPromotion."""

    verbose_name = 'JobPromotion'
    verbose_name_plural = 'JobPromotions'

  def __str__(self):
    """Unicode representation of JobPromotion."""
    return '%s - %s' % (self.new_job_position, self.date_start_new_position)

  # TODO: Define custom methods here
