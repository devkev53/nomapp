from rest_framework import serializers

from users.api.serializers.user_serializers import CreateUserSerializer
from employees.models import Employee

class EmployeeSerializer(serializers.ModelSerializer):

  class Meta:
    model=Employee
    fields="__all__"

