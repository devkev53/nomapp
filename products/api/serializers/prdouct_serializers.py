from rest_framework import serializers
from products.models import Product

class ProductSerializer(serializers.ModelSerializer):
  url_img = serializers.SerializerMethodField()


  class Meta:
    model = Product
    fields = (
      'id', 'name', 'description', 
      'price', 'stock', 'url_img',
      'image'
      )

  def url_img(self, obj):
    return obj.url_img

