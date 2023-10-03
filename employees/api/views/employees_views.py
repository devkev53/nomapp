from core.api.views.api_views import CustomBaseViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.views import APIView


from employees.api.serialziers.employees_serializers import EmployeeSerializer, CreateEmployeeSerializer

class EmployeeViewSet(CustomBaseViewSet):
  serializer_class = EmployeeSerializer
  # permission_classes = (IsAuthenticated,)

  def create(self, request):
    data = request.data
    print(data)
    instance_serialier = CreateEmployeeSerializer(data = request.data)

    if instance_serialier.is_valid():
      instance_serialier.save()
      return Response(instance_serialier.data, status=status.HTTP_201_CREATED)

    return Response({
    'error':'check your fields', 'errors':instance_serialier.errors
    }, status=status.HTTP_400_BAD_REQUEST)


class EmployeeFilterAPIView(APIView):

  def get_queryset(self):
    queryset = EmployeeSerializer.Meta.model.objects.all()
    companyId = self.request.query_params.get('companyId')
    if companyId is not None:
      queryset = queryset.filter(job_position__department__company=companyId)
    return queryset

  def get(self, request, pk=None, *args, **kwargs):
    employes = self.get_queryset()
    employes_serialzier = EmployeeSerializer(employes, many=True)
    return Response(employes_serialzier.data, status=status.HTTP_200_OK)