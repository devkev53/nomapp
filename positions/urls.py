from django.urls import path
from positions.api.views.views import PositionAPIView, DepartmentAPIView

urlpatterns = [
  path('api/positions/', PositionAPIView.as_view(), name='positions'),
  path('api/department/', DepartmentAPIView.as_view(), name='department')
]
