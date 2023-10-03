from rest_framework import serializers

from positions.api.serialziers.position_serializers import JobPositionSerialzier
from users.api.serializers.user_serializers import CreateUserSerializer
from employees.models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
  get_full_name = serializers.SerializerMethodField()
  total_prepaid = serializers.SerializerMethodField()
  total_monthPayment = serializers.SerializerMethodField()
  calculate_prepaid = serializers.SerializerMethodField()
  calculate_monthPayment = serializers.SerializerMethodField()
  url_img = serializers.SerializerMethodField()
  job_position = JobPositionSerialzier()

  class Meta:
    model=Employee
    fields = (
      'id', 'name', 'last_name',
      'url_img', 'gender',
      'get_full_name', 'job_position',
      'total_prepaid', 'total_monthPayment',
      'calculate_monthPayment', 'calculate_prepaid'
    )

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
