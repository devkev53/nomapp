from rest_framework import serializers

from companies.models import Company
from positions.api.serialziers.serializaers import JobPositionSerialzier, DepartmentSerializer

class CompanySerializer(serializers.ModelSerializer):
  num_employees = serializers.SerializerMethodField()
  get_job_positions = serializers.SerializerMethodField()
  get_departments = serializers.SerializerMethodField()


  class Meta:
    model=Company
    fields = (
      'id', 'name', 'description', 'address', 'city',
      'phone', 'logo', 'email', 'num_employees',
      'get_job_positions', 'get_departments'
    )

  def num_employees(self, obj):
    return obj.num_employees()

  def get_job_positions(self, obj):
    return JobPositionSerialzier(data=obj.get_job_positions(), many=True)

  def get_departments(self, obj):
    return JobPositionSerialzier(data=obj.get_departments(), many=True)

class CreateCompanySerialzier(serializers.ModelSerializer):

  class Meta:
    model=Company
    fields = (
      'id', 'name', 'description', 'address', 'city',
      'phone', 'logo', 'email'
    )