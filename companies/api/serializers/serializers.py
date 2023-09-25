from rest_framework import serializers

from companies.models import Company

class CompanySerializer(serializers.ModelSerializer):
  num_employees = serializers.SerializerMethodField()

  class Meta:
    model=Company
    fields = (
      'id', 'name', 'description', 'address', 'city',
      'phone', 'logo', 'email', 'num_employees'
    )

  def num_employees(self, obj):
    return obj.num_employees()
  
class CreateCompanySerialzier(serializers.ModelSerializer):

  class Meta:
    model=Company
    fields = (
      'id', 'name', 'description', 'address', 'city',
      'phone', 'logo', 'email'
    )