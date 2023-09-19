from rest_framework import serializers

from users.api.serializers.user_serializers import CreateUserSerializer
from employees.models import Employee

class EmployeeSerializer(serializers.ModelSerializer):

  class Meta:
    model=Employee
    fields=(
      'user', 'name', 'last_name', 'address', 'phone',
      'birthday', 'gender', 'photo', 'start_work_date',
      'company', 'department', 'job_position', 'job_promotion',
    )

