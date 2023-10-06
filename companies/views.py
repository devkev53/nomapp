import datetime
import calendar
from decimal import Decimal

from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.template.loader import render_to_string, get_template
from django.urls import reverse_lazy
from django.views.generic import TemplateView, View
from rest_framework.response import Response
from rest_framework import status



from companies.models import Company
from employees.utils import get_name_month
from pays.models import FortnightPayment, MonthlyPayment

from rest_framework.views import APIView

from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration



# Create your views here.


class CompaniesView(TemplateView):
    template_name = "index.html"


class NominaPagoEmpresaPDF(APIView):

    def post(self, request, pk=None, *args, **kwargs):
        template = get_template('nomina_template.html')

        month = request.data['month']
        year = request.data['year']
        type = request.data['type']

        # try:
        if not Company.objects.filter(pk=pk).exists():
            return Response({"errors":"Company no exists"}, status=status.HTTP_404_NOT_FOUND)

        company = Company.objects.filter(pk=pk).get()
        if type == '1':
            if not FortnightPayment.objects.filter(employee__job_position__department__company=company, month=month, year=year).exists():
                return Response({"errors":"The forniht payment is no exists"}, status=status.HTTP_404_NOT_FOUND)

            fortnight_payment = FortnightPayment.objects.filter(employee__job_position__department__company=company, month=month, year=year)
            description = fortnight_payment.last().description
            monthly_payment = ''
            pays = []
            for pay in fortnight_payment:
                payment = {
                    "employee": pay.employee.get_full_name(),
                    "position": pay.employee.job_position.name,
                    "base": pay.get_base_salary(),
                    "fortnight": pay.amount,
                    "monthly": pay.employee.total_monthPayment(),
                    "comision": 0.00,
                    "extras": 0.00,
                    "total_in": pay.total_ingresos(),
                    "igss": 0.00,
                    "contribution": 0.00,
                    "store": pay.credit_store,
                    "total_e":pay.total_egresos(),
                    "liquid": Decimal(pay.total_ingresos()) - Decimal(pay.total_egresos())
                }
                pays.append(payment)
        else:
            if not MonthlyPayment.objects.filter(employee__job_position__department__company=company, month=month, year=year).exists():
                return Response({"errors":"The monthly payment is no exists"}, status=status.HTTP_404_NOT_FOUND)

            fortnight_payment = FortnightPayment.objects.filter(employee__job_position__department__company=company, month=month, year=year)
            monthly_payment = MonthlyPayment.objects.filter(employee__job_position__department__company=company, month=month, year=year)
            description = monthly_payment.last().description
            pays = []

            for pay in fortnight_payment:
                monthly = monthly_payment.filter(employee=pay.employee).get()
                payment = {
                    "employee": pay.employee.get_full_name(),
                    "position": pay.employee.job_position.name,
                    "base": pay.get_base_salary(),
                    "fortnight": pay.amount,
                    "monthly": pay.employee.total_monthPayment(),
                    "comision": monthly.comision,
                    "extras": 0.00,
                    "total_in": pay.total_ingresos() + monthly.total_ingresos(),
                    "igss": monthly.social_security,
                    "contribution": monthly.contribution,
                    "store": pay.credit_store,
                    "total_e":pay.total_egresos() + monthly.total_egresos(),
                    "liquid": Decimal(pay.total_ingresos() + monthly.total_ingresos()) - Decimal(pay.total_egresos() + monthly.total_egresos())
                }
                pays.append(payment)


        month_name = get_name_month(int(month))

        context = {
            "pays": pays,
            "today": datetime.datetime.now(),
            'month_name': month_name,
            "month": month,
            "year": year,
            "type": type,
            "description": description,
            "company":company,
        }

        # html = template.render(context)
        html = render_to_string('nomina_template.html', context)
        # css_url = ''
        response = HttpResponse(content_type='application/pdf')
        response["Content-Disposition"] = "inline; report.pdf"

        font_config=FontConfiguration()
        HTML(string=html, base_url=request.build_absolute_uri()).write_pdf(response, font_config=font_config)

        return response
        # except:
        #     return Response({"errors":"Error in get payment"}, status=status.HTTP_404_NOT_FOUND)




