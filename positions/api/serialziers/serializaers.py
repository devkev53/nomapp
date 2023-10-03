from rest_framework import serializers
from positions.models import JobPosition, Department

class JobPositionSerialzier(serializers.ModelSerializer):
  get_company = serializers.SerializerMethodField()

  class Meta:
    model = JobPosition
    fields = ('id', 'name', 'salary', 'department', 'get_company')

  def get_company(self, obj):
    return obj.get_company


class DepartmentSerializer(serializers.ModelSerializer):

  class Meta:
    model = Department
    fields = ('id', 'name', 'company')