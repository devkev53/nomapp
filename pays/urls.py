from django.urls import path
from pays.api.views.payments_views import PaymentNominaEmployeesAPIView
urlpatterns = [
    path('api/payment-nomina/', PaymentNominaEmployeesAPIView.as_view(), name='payment_nomina')
]
