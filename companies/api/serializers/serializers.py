from rest_framework import serializers

from companies.models import Company

class CompanySerializer(serializers.ModelSerializer):
  num_employees = serializers.SerializerMethodField()

  class Meta:
    model=Company
    fields = (
      'name', 'address', 'city', 'phone',
      'logo', 'email', 'num_employees'
    )

  def num_employees(self, obj):
    return obj.num_employees()