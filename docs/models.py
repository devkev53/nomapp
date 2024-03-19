from django.db import models
from core.models import BaseModel
from employees.models import Employee

# Create your models here.
DOCSTYPE_CHOICES = {
  ('Identification', 1),
  ('Curriculum', 2),
  ('Antecedentes Policiacos', 3),
  ('Antecedentes Penales', 4),
  ('Titulos', 5),
  ('Certificaciones', 6),
  ('Diplomas', 7),
}

class EmployeDocuments(models.Model):
  """Model definition for EmployeDocuments."""

  # TODO: Define fields here
  name = models.CharField(max_length=125)
  document = models.FileField(upload_to='employess/docs/')
  type = models.CharField(choices=DOCSTYPE_CHOICES, max_length=50)
  expiration_date = models.DateField()
  employee = models.ForeignKey(Employee, on_delete=models.CASCADE)

  class Meta:
    """Meta definition for EmployeDocuments."""

    verbose_name = 'EmployeDocuments'
    verbose_name_plural = 'EmployeDocumentss'

  def __str__(self):
    """Unicode representation of EmployeDocuments."""
    pass

  # TODO: Define custom methods here
