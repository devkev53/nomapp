from core.api.views.api_views import CustomBaseViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status

from companies.api.serializers.serializers import CompanySerializer
from employees.api.serialziers.employees_serializers import EmployeeSerializer

class CompanyViewSet(CustomBaseViewSet):
  serializer_class = CompanySerializer
  # permission_classes = (IsAuthenticated,)

  @action(detail=True, methods=['get'], url_path='employees')
  def get_employees_company(self, request, pk=None, *args, **kwargs):
    company = self.get_object(pk)
    employees = EmployeeSerializer.Meta.model.objects.filter(job_position__department__company=company)
    employees_serializer = EmployeeSerializer(employees, many=True)

    return Response(employees_serializer.data, status=status.HTTP_200_OK)