from rest_framework import serializers

from positions.api.serialziers.serializaers import JobPositionSerialzier
from users.api.serializers.user_serializers import CreateUserSerializer
from employees.models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
  get_full_name = serializers.SerializerMethodField()
  total_prepaid = serializers.SerializerMethodField()
  total_monthPayment = serializers.SerializerMethodField()
  calculate_prepaid = serializers.SerializerMethodField()
  calculate_monthPayment = serializers.SerializerMethodField()
  url_img = serializers.SerializerMethodField()
  get_company_id = serializers.SerializerMethodField()
  get_company_name = serializers.SerializerMethodField()
  get_department_name = serializers.SerializerMethodField()
  job_position = JobPositionSerialzier()

  class Meta:
    model=Employee
    fields = (
      'id', 'name', 'last_name',
      'url_img', 'gender',
      'get_full_name', 'job_position',
      'total_prepaid', 'total_monthPayment',
      'calculate_monthPayment', 'calculate_prepaid',
      'get_department_name', 'get_company_name', 'get_company_id'
    )

  def get_company_id(self, obj):
    return obj.get_company_id
  
  def total_monthPayment(self, obj):
    return obj.total_monthPayment

  def total_prepaid(self, obj):
    return obj.total_prepaid

  def get_full_name(self, obj):
    return obj.get_full_name

  def calculate_prepaid(self, obj):
    return obj.calculate_prepaid

  def calculate_monthPayment(self, obj):
    return obj.calculate_monthPayment

  def url_img(self, obj):
    return obj.url_img

  def get_company_name(self, obj):
    return obj.get_company_name()

  def get_department_name(self, obj):
    return obj.get_department_name()
  


class CreateEmployeeSerializer(serializers.ModelSerializer):

  class Meta:
    model = Employee
    fields = (
      'id', 'name', 'last_name',
      'url_img', 'gender', 'photo',
      'get_full_name', 'job_position'
      )