from django.http import HttpResponse, HttpResponseRedirect
from core.api.views.api_views import CustomBaseViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.views import APIView

from employees.utils import get_name_month

from django.template.loader import render_to_string, get_template

from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration

from companies.models import Company
from pays.api.serializers.payments_serializers import MonthlyPaymentSerializer, FortnightPaymentSerializer

from employees.api.serialziers.employees_serializers import EmployeeSerializer, CreateEmployeeSerializer

import datetime

class EmployeeViewSet(CustomBaseViewSet):
  serializer_class = EmployeeSerializer
  # permission_classes = (IsAuthenticated,)

  def create(self, request):
    data = request.data
    print(data)
    instance_serialier = CreateEmployeeSerializer(data = request.data)

    if instance_serialier.is_valid():
      instance_serialier.save()
      return Response(instance_serialier.data, status=status.HTTP_201_CREATED)

    return Response({
    'error':'check your fields', 'errors':instance_serialier.errors
    }, status=status.HTTP_400_BAD_REQUEST)


class EmployeeFilterAPIView(APIView):

  def get_queryset(self):
    queryset = EmployeeSerializer.Meta.model.objects.all()
    companyId = self.request.query_params.get('companyId')
    if companyId is not None:
      queryset = queryset.filter(job_position__department__company=companyId)
    return queryset

  def get(self, request, pk=None, *args, **kwargs):
    employes = self.get_queryset()
    employes_serialzier = EmployeeSerializer(employes, many=True)
    return Response(employes_serialzier.data, status=status.HTTP_200_OK)


class CheckPaymentAPIView(APIView):
  # authentication_classes = (IsAuthenticated,)

  # GET METHOD
  def get(self, request, pk=None, *args, **kwargs):

    employee = EmployeeSerializer.Meta.model.objects.filter(pk=pk).get()
    month = self.request.query_params.get('month')
    year = self.request.query_params.get('year')

    fortnight_payment = FortnightPaymentSerializer.Meta.model.objects.filter(month=month, year=year, employee=employee).exists()
    monthly_payment = MonthlyPaymentSerializer.Meta.model.objects.filter(month=month, year=year, employee=employee).exists()

    if fortnight_payment:
      fortnight_payment = FortnightPaymentSerializer.Meta.model.objects.filter(month=month, year=year, employee=employee).get()
      fortnight_payment_serializer = FortnightPaymentSerializer(fortnight_payment).data
    else:
      fortnight_payment_serializer = None

    if monthly_payment:
      monthly_payment = MonthlyPaymentSerializer.Meta.model.objects.filter(month=month, year=year, employee=employee).get()
      monthly_payment_serializer = MonthlyPaymentSerializer(monthly_payment).data
    else:
      monthly_payment_serializer = None

    if monthly_payment_serializer == None and fortnight_payment_serializer == None:
      return Response({'result': None}, status=status.HTTP_200_OK)

    return Response({'result': [fortnight_payment_serializer, monthly_payment_serializer]}, status=status.HTTP_200_OK)



    return Response({'message':'OK'}, status=status.HTTP_200_OK)


class PaymentTicketPFD(APIView):
  serializer_class = EmployeeSerializer

  # GET METHOD
  def get(self, request, pk=None, *args, **kwargs):
    template = get_template('payment_ticket.html')

    today = datetime.datetime.now()

    type = self.request.query_params.get('type')


    if type == '1':
      payment = FortnightPaymentSerializer.Meta.model.objects.filter(pk=pk).get()
    elif type == '2':
      payment = MonthlyPaymentSerializer.Meta.model.objects.filter(pk=pk).get()

    employee = self.serializer_class.Meta.model.objects.filter(pk=payment.employee.id).get()
    company = Company.objects.filter(pk=employee.job_position.department.company.pk).get()

    print(employee)

    context = {
      'date': today,
      'payment': payment,
      'company': company,
      'employee': employee,
      'month': get_name_month(payment.month),
      'year': payment.year
    }

    # html = template.render(context)
    html = render_to_string('payment_ticket.html', context)
    # css_url = ''
    response = HttpResponse(content_type='application/pdf')
    response["Content-Disposition"] = "inline; report.pdf"

    font_config=FontConfiguration()
    HTML(string=html, base_url=request.build_absolute_uri()).write_pdf(response, font_config=font_config)

    return response