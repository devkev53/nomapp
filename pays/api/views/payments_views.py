import datetime
from companies.utils import exucute_month_each, exucute_prepaid_each
from core.api.views.api_views import CustomBaseViewSet

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.views import APIView


from companies.api.serializers.serializers import CompanySerializer
from employees.api.serialziers.employees_serializers import EmployeeSerializer
from pays.api.serializers.payments_serializers import MonthlyPaymentSerializer, FortnightPaymentSerializer

from employees.models import Employee

class PaymentNominaEmployeesAPIView(APIView):
  permission_classes = (IsAuthenticated,)

  # POST METHOD
  def post(self, request, pk=None, *args, **kwargs):
    today = datetime.datetime.now()
    month = self.request.data['month']
    year = self.request.data['year']
    type = self.request.data['type']
    companyId = self.request.data['companyId']
    all_employees = Employee.objects.filter(job_position__department__company=companyId, is_active=True).all()
    pay_list = []
    total = 0
    print(request.data['month'])

    for employe in all_employees:
      if type == '1':
        payment = {
          "employee":employe.pk,
          "month":month,
          "year":year
        }
        serializer_instance = FortnightPaymentSerializer(data=payment)
        if serializer_instance.is_valid():
          serializer_instance.save()
          total += 1
          pay_list.append(serializer_instance.data)
        else:
          print(serializer_instance.errors)
      if type == '2':
        payment = {
          "employee":employe.pk,
          "month":month,
          "year":year
        }
        serializer_instance = MonthlyPaymentSerializer(data=payment)
        if serializer_instance.is_valid():
          serializer_instance.save()
          total += 1
          pay_list.append(serializer_instance.data)
        else:
          print(serializer_instance.errors)

    return Response({
        "message":
        "se realizaron el pago de {} emplados en nomina..!".format(total),
        "payment_list":pay_list
      }, status=status.HTTP_201_CREATED)