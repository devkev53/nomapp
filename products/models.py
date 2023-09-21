from django.db import models
from core.models import BaseModel

# Create your models here.


class Product(BaseModel):
  """Model definition for Product."""

  # TODO: Define fields here
  name = models.CharField(max_length=125)
  description = models.TextField(blank=True, null=True)
  price = models.DecimalField(max_digits=10, decimal_places=2)
  stock = models.PositiveIntegerField()

  class Meta:
    """Meta definition for Product."""

    verbose_name = 'Product'
    verbose_name_plural = 'Products'

  def __str__(self):
    """Unicode representation of Product."""
    return '%s - %s' % (self.name, self.price)

  # TODO: Define custom methods here

class ProductImage(models.Model):
  """Model definition for ProductImage."""

  # TODO: Define fields here
  name = models.CharField(max_length=250)
  image=models.ImageField(upload_to='product/')
  product = models.ForeignKey(Product, on_delete=models.CASCADE)

  class Meta:
    """Meta definition for ProductImage."""

    verbose_name = 'ProductImage'
    verbose_name_plural = 'ProductImages'

  def __str__(self):
    """Unicode representation of ProductImage."""
    pass

