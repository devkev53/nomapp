from django.urls import path
from employees.api.views.employees_views import EmployeeFilterAPIView, PaymentTicketPFD, CheckPaymentAPIView

urlpatterns = [
  path('api/employees-filter/<int:pk>/', EmployeeFilterAPIView.as_view(), name='employees_filter'),
  path('api/check-payment/<int:pk>/', CheckPaymentAPIView.as_view(), name='check_payment'),
  path('api/payment-ticket-pdf/<int:pk>/', PaymentTicketPFD.as_view(), name='payment_ticket'),
]