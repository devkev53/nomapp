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
# from pays.models import Payment



class CompanyViewSet(CustomBaseViewSet):
  serializer_class = CompanySerializer
  # permission_classes = (IsAuthenticated,)

  @action(detail=True, methods=['get'], url_path='employees')
  def get_employees_company(self, request, pk=None, *args, **kwargs):
    company = self.get_object(pk)
    employees = EmployeeSerializer.Meta.model.objects.filter(job_position__department__company=company, is_active=True)
    employees_serializer = EmployeeSerializer(employees, many=True)

    return Response(employees_serializer.data, status=status.HTTP_200_OK)


class PaymentNominaAPIView(APIView):
  # permission_classes = (IsAuthenticated,)

  # def post(self, request, pk=None, *args, **kwargs):
  #   try:
  #     print(self.request)
  #     return Response({"message":"pago realizado con exito"}, status=status.HTTP_201_CREATED)
  #   except:
  #     return Response({"error":"pago realizado con exito"}, status=status.HTTP_409_CONFLICT)

  def get(self, request, pk=None, *args, **kwargs):
      # try:
        total = 0
        # print(request.user)
        today = datetime.datetime.now()
        day = today.day
        month = today.month
        year = today.year
        company_id = pk
        employees = EmployeeSerializer.Meta.model.objects.filter(job_position__department__company=company_id)
        last_pay = Payment.objects.filter(employee__job_position__department__company=company_id).last()
        # print(last_pay)

        # Verifica si existe un pago anterior
        if last_pay == None:
            print('Es primer pago')
            # Verifica si la fecha es de entre 13 a 18 para hacer pago de quincena
            if day >= 13 and day <= 18:
              # Ejecuta el pago de quincena
              total = exucute_prepaid_each(employees, day, month, year)
              # De lo contrario
            else:
              # Ejecuta el pago de mes
              total = exucute_month_each(employees, day, month, year)
        elif last_pay.month == month and last_pay.year == year:
            print("Error la nomina de este fin mes ya se pago")
            return Response({"error":"El pago de este mes ya existe"}, status=status.HTTP_409_CONFLICT)
        # Si existe un pago anterior se valida que el mes sea mayor y el año igual para generar pago de mes
        elif last_pay.month <= month and last_pay.year == year:
            # Ejecuta el pago de quincena
            total = exucute_prepaid_each(employees, day, month, year)
        # Si existe un pago pero el año es menor se ejecuta el pago de quincena seindo este de enero
        elif last_pay.year < year:
            # Ejecuta pago de quincena
            total = exucute_prepaid_each(employees, day, month, year)

        message = "Se realizaron un total de {} pagos, en la nomina de la empresa..!".format(total)
        return Response({"message":message}, status=status.HTTP_200_OK)
      # except:
      #   return Response({"error":"No fue posible realizar el pago de nomina"}, status=status.HTTP_409_CONFLICT)

