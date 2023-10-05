from django.urls import path
from employees.api.views.employees_views import EmployeeFilterAPIView, PaymentTiketPFD

urlpatterns = [
  path('api/employees-filter/<int:pk>/', EmployeeFilterAPIView.as_view(), name='employees_filter'),
  path('api/payment-tiket/', PaymentTiketPFD.as_view(), name='payment_ticket')

]