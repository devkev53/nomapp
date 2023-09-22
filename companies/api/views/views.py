from core.api.views.api_views import CustomBaseViewSet
from rest_framework.permissions import IsAuthenticated
from companies.api.serializers.serializers import CompanySerializer

class CompanyViewSet(CustomBaseViewSet):
  serializer_class = CompanySerializer
  # permission_classes = (IsAuthenticated,)
