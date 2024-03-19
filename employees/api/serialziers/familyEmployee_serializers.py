from rest_framework import serializers
from employees.models import FamilyMember

class FamilyEmployeeSerializer(serializers.ModelSerializer):
  get_full_name = serializers.SerializerMethodField()
  calculate_old_year = serializers.SerializerMethodField()

  class Meta:
    model = FamilyMember
    fields = (
      'id', 'name', 'last_name',
      'relation', 'employee',
      'dependent', 'birthday', 'get_full_name',
      'calculate_old_year'
    )

  def get_full_name(self, obj):
    return obj.get_full_name()

  def calculate_old_year(self, obj):
    return obj.calculate_old_year()