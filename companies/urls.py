from django.urls import path

from .views import CompaniesView, NominaPagoEmpresaPDF
from .api.views.companies_views import PaymentNominaAPIView

urlpatterns = [
  path('companies/', CompaniesView.as_view(), name='companies'),
  path('api/company_report_nomina/<int:pk>', NominaPagoEmpresaPDF.as_view(), name="nomina"),
  path('api/company/<int:pk>/pay-nomina', PaymentNominaAPIView.as_view(), name='pay-nomina')
]