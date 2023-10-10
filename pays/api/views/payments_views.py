import datetime
# from companies.utils import exucute_month_each, exucute_prepaid_each
from core.api.views.api_views import CustomBaseViewSet

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.views import APIView


from companies.api.serializers.serializers import CompanySerializer
from employees.api.serialziers.employees_serializers import EmployeeSerializer
from pays.api.serializers.payments_serializers import MonthlyPaymentSerializer, FortnightPaymentSerializer, BonoPaymentSerializer, AguinaldoPaymentSerializer

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
    last_fothnightPyament = FortnightPaymentSerializer.Meta.model.objects.filter(year=year, month=month).exists()
    last_monthlyPyament = MonthlyPaymentSerializer.Meta.model.objects.filter(year=year, month=month).exists()
    last_bonoPayment = BonoPaymentSerializer.Meta.model.objects.filter(year=year, month=month).exists()
    last_aguinaldoPayment = AguinaldoPaymentSerializer.Meta.model.objects.filter(year=year, month=month).exists()

    print(last_fothnightPyament)
    print(last_monthlyPyament)

    for employe in all_employees:

      if type == '1':
        if last_fothnightPyament:
          return Response({"errors":"El pago automatico de Nomina Quincenal de este mes ya fue realizado"}, status=status.HTTP_400_BAD_REQUEST)
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
        if last_monthlyPyament:
          return Response({"errors":"El pago automatico de Nomina Menusal de este mes ya fue realizado"}, status=status.HTTP_400_BAD_REQUEST)
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
      
      if type == '3':
        if last_bonoPayment:
          return Response({"errors":"El pago automatico de Nomina Bono 14 de este año ya fue realizado"}, status=status.HTTP_400_BAD_REQUEST)
        if not MonthlyPaymentSerializer.Meta.model.objects.filter(year=year, month=(int(month) - 1)).exists():
          return Response({"errors":"El pago automatico de Nomina Mensual de Junio de este año no se ha efectuado"}, status=status.HTTP_400_BAD_REQUEST)
        payment = {
          "employee":employe.pk,
          "month":month,
          "year":year
        }
        serializer_instance = BonoPaymentSerializer(data=payment)
        if serializer_instance.is_valid():
          serializer_instance.save()
          total += 1
          pay_list.append(serializer_instance.data)
        else:
          print(serializer_instance.errors)
        
      if type == '4':
        if last_aguinaldoPayment:
          return Response({"errors":"El pago automatico de Nomina Aguinaldo de este año ya fue realizado"}, status=status.HTTP_400_BAD_REQUEST)
        if not MonthlyPaymentSerializer.Meta.model.objects.filter(year=year, month=(int(month) - 1)).exists():
          return Response({"errors":"El pago automatico de Nomina Mensual de Junio de este año no se ha efectuado"}, status=status.HTTP_400_BAD_REQUEST)
        payment = {
          "employee":employe.pk,
          "month":month,
          "year":year
        }
        serializer_instance = AguinaldoPaymentSerializer(data=payment)
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