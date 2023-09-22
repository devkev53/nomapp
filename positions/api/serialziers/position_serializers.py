from rest_framework import serializers
from positions.models import JobPosition

class JobPositionSerialzier(serializers.ModelSerializer):
  get_company = serializers.SerializerMethodField()

  class Meta:
    model = JobPosition
    fields = ('name', 'salary', 'get_company')
  
  def get_company(self, obj):
    return obj.get_company