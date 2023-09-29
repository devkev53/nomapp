from rest_framework import serializers

from companies.models import Company

class CompanySerializer(serializers.ModelSerializer):
  num_employees = serializers.SerializerMethodField()
  activate_payment_option = serializers.SerializerMethodField()

  class Meta:
    model=Company
    fields = (
      'id', 'name', 'description', 'address', 'city',
      'phone', 'logo', 'email', 'num_employees', 'activate_payment_option'
    )

  def num_employees(self, obj):
    return obj.num_employees()

  def activate_payment_option(self, obj):
    return obj.activate_payment_option()

class CreateCompanySerialzier(serializers.ModelSerializer):

  class Meta:
    model=Company
    fields = (
      'id', 'name', 'description', 'address', 'city',
      'phone', 'logo', 'email'
    )