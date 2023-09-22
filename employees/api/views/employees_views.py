from core.api.views.api_views import CustomBaseViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status

from employees.api.serialziers.employees_serializers import EmployeeSerializer

class EmployeeViewSet(CustomBaseViewSet):
  serializer_class = EmployeeSerializer
  # permission_classes = (IsAuthenticated,)