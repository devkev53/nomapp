from core.api.views.api_views import CustomBaseViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from employees.api.serialziers.familyEmployee_serializers import FamilyEmployeeSerializer

class FamilyEmployeeViewSet(CustomBaseViewSet):
  serializer_class = FamilyEmployeeSerializer
  # permission_classes = (IsAuthenticated,)


  # Delete a Instance from Database
  def destroy(self, request, pk=None, *args, **kwargs):
    print(pk)
    if pk is not None:
      instance_destroy = self.serializer_class.Meta.model.objects.filter(id=pk)
      instance_destroy.delete()
      return Response({'message':'instance delete successfull'}, status=status.HTTP_200_OK)
    return Response({'error':'instance not found'}, status=status.HTTP_404_NOT_FOUND)
