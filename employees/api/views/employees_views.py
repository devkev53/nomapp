from core.api.views.api_views import CustomBaseViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.views import APIView


from employees.api.serialziers.employees_serializers import EmployeeSerializer

class EmployeeViewSet(CustomBaseViewSet):
  serializer_class = EmployeeSerializer
  # permission_classes = (IsAuthenticated,)


class EmployeeFilterAPIView(APIView):

  def get_queryset(self):
    queryset = EmployeeSerializer.Meta.model.objects.all()
    companyId = self.request.query_params.get('companyId')
    if companyId is not None:
      queryset = queryset.filter(job_position__department__company=companyId)
    return queryset

  def get(self, reques, pk=None, *args, **kwargs):
    employes = self.get_queryset()
    employes_serialzier = EmployeeSerializer(employes, many=True)
    return Response(employes_serialzier.data)