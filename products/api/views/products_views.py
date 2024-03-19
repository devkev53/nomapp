
from core.api.views.api_views import CustomBaseViewSet
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status

from products.api.serializers.prdouct_serializers import ProductSerializer

class ProductViewSet(CustomBaseViewSet):
  serializer_class = ProductSerializer

  # def list(self, request, *args, **kwargs):
  #   print(self)
  #   return Response({'message':'Ok'}, status=status.HTTP_200_OK)

  # @action(detail=False, methods=['get'])
  # def searchProducts(self, request, pk=None, *args, **kwargs):
  #   print(request)