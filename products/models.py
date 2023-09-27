from django.db import models
from core.models import BaseModel
from django.forms.models import model_to_dict

# Create your models here.


class Product(BaseModel):
  """Model definition for Product."""

  # TODO: Define fields here
  name = models.CharField(max_length=125)
  description = models.TextField(blank=True, null=True)
  price = models.DecimalField(max_digits=10, decimal_places=2)
  stock = models.PositiveIntegerField()
  image=models.ImageField(upload_to='product/')


  class Meta:
    """Meta definition for Product."""

    verbose_name = 'Product'
    verbose_name_plural = 'Products'

  def __str__(self):
    """Unicode representation of Product."""
    return '%s - %s' % (self.name, self.price)

  # TODO: Define custom methods here

  def url_img(self):
    if not self.image:
      return ''
    else:
      return self.image.url
