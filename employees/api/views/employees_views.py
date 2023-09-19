from core.api.views.api_views import CustomBaseViewSet
from rest_framework.permissions import IsAuthenticated
from employees.api.serialziers.employees_serializers import EmployeeSerializer

class EmployeeViewSet(CustomBaseViewSet):
  serializer_class = EmployeeSerializer
  permission_classes = (IsAuthenticated,)