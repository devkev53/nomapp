from django.urls import path
from employees.api.views.employees_views import EmployeeFilterAPIView

urlpatterns = [
  path('api/employees-filter/', EmployeeFilterAPIView.as_view(), name='employees_filter')  
]