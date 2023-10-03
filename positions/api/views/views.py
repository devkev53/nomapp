from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


from positions.api.serialziers.serializaers import JobPositionSerialzier, DepartmentSerializer

class DepartmentAPIView(APIView):

  def get_queryset(self):
      queryset = DepartmentSerializer.Meta.model.objects.all()
      companyId = self.request.query_params.get('companyId')
      if companyId is not None:
        queryset = queryset.filter(company=companyId)
      return queryset

  # GET METHOD
  def get(self, request, pk=None, *args, **kwargs):
      try:
        departments = self.get_queryset()
        department_serialzier = DepartmentSerializer(departments, many=True)
        return Response(department_serialzier.data, status=status.HTTP_200_OK)
      except:
        return Response({"error":"not found"}, status=status.HTTP_400_BAD_REQUEST)



class PositionAPIView(APIView):

  def get_queryset(self):
      queryset = JobPositionSerialzier.Meta.model.objects.all()
      departmentId = self.request.query_params.get('departmentId')
      if departmentId is not None:
        queryset = queryset.filter(department=departmentId)
      return queryset

  # GET METHOD
  def get(self, request, pk=None, *args, **kwargs):
      try:
        positions = self.get_queryset()
        positions_serializers = JobPositionSerialzier(positions, many=True)
        return Response(positions_serializers.data, status=status.HTTP_200_OK)
      except:
        return Response({"error":"not found"}, status=status.HTTP_400_BAD_REQUEST)
