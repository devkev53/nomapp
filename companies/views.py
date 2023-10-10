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
from employees.models import Employee
from pays.models import FortnightPayment, MonthlyPayment, BonoPayment, AguinaldoPayment

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
        # type = request.data['type']

        # try:
        if not Company.objects.filter(pk=pk).exists():
            return Response({"errors":"Company no exists"}, status=status.HTTP_404_NOT_FOUND)
        
        company = Company.objects.filter(pk=pk).get()
        employees = Employee.objects.filter(job_position__department__company=company)
        
        fortnight_payment = None
        monthly_payment = None
        bono_payment = None
        aguinaldo_payment = None

        fortnight_payment = FortnightPayment.objects.filter(employee__job_position__department__company=company, month=month, year=year)
        monthly_payment = MonthlyPayment.objects.filter(employee__job_position__department__company=company, month=month, year=year)
        bono_payment = BonoPayment.objects.filter(employee__job_position__department__company=company, month=month, year=year)
        aguinaldo_payment = AguinaldoPayment.objects.filter(employee__job_position__department__company=company, month=month, year=year)
        pays = []

        for employee in employees:
                      
            if FortnightPayment.objects.filter(employee=employee.pk, month=month, year=year).exists():
                fortnight_payment = FortnightPayment.objects.filter(employee=employee.pk, month=month, year=year).get()
                
                fortnight = fortnight_payment.get_fortnightPayment()
                fortnight_store = fortnight_payment.credit_store
            else:
                fortnight = 0.00
                fortnight_store = 0.00

            if MonthlyPayment.objects.filter(employee=employee.pk, month=month, year=year).exists():
                monthly_payment = MonthlyPayment.objects.filter(employee=employee.pk, month=month, year=year).get()

                bono3701 = monthly_payment.bono3701
                monthly = monthly_payment.get_monthlyPayment()
                comision = monthly_payment.comision
                contribution = monthly_payment.contribution
                igss = monthly_payment.social_security
                monthly_store = monthly_payment.credit_store
            else:
                bono3701 = 0.00
                monthly = 0.00
                comision = 0.00
                contribution = 0.00
                igss = 0.00
                monthly_store = 0.00
                
            if BonoPayment.objects.filter(employee=employee.pk, month=month, year=year).exists():
                bono_payment = BonoPayment.objects.filter(employee=employee.pk, month=month, year=year).get()

                bono = bono_payment.amount
            else:
                bono = 0.00

            if AguinaldoPayment.objects.filter(employee=employee.pk, month=month, year=year).exists():
                aguinaldo_payment = AguinaldoPayment.objects.filter(employee=employee.pk, month=month, year=year).get()

                aguinaldo = aguinaldo_payment.amount
            else:
                aguinaldo = 0.00

            store = fortnight_store + monthly_store
            total_in = (
                Decimal(bono3701) + Decimal(fortnight) + 
                Decimal(monthly) + Decimal(comision) +
                Decimal(bono) + Decimal(aguinaldo)
            )
            total_e = (
                Decimal(igss) + Decimal(contribution) + Decimal(store)
            )
            total_liquid = Decimal(total_in) - Decimal(total_e)
            payment = {
                "employee": employee.get_full_name(),
                "position": employee.job_position.name,
                "base": employee.job_position.salary,
                "bono3701": bono3701,
                "fortnight": fortnight,
                "monthly": monthly,
                "comision": comision,
                "extras": 0.00,
                "bono14": bono,
                "aguinaldo": aguinaldo,
                "total_in": total_in,
                "igss": igss,
                "contribution": contribution,
                "store": store,
                "total_e":total_e,
                "liquid": total_liquid
            }
            print(aguinaldo)
            pays.append(payment)



        # if type == '1':
        #     if not FortnightPayment.objects.filter(employee__job_position__department__company=company, month=month, year=year).exists():
        #         return Response({"errors":"The forniht payment is no exists"}, status=status.HTTP_404_NOT_FOUND)

        #     fortnight_payment = FortnightPayment.objects.filter(employee__job_position__department__company=company, month=month, year=year)
            
        #     description = fortnight_payment.last().description
        #     monthly_payment = ''
        #     pays = []
        #     for pay in fortnight_payment:
        #         payment = {
        #             "employee": pay.employee.get_full_name(),
        #             "position": pay.employee.job_position.name,
        #             "base": pay.get_base_salary(),
        #             "bono3701": pay.bono3701,
        #             "fortnight": pay.amount,
        #             "monthly": 0.00,
        #             "comision": 0.00,
        #             "extras": 0.00,
        #             "total_in": pay.total_ingresos(),
        #             "igss": 0.00,
        #             "contribution": 0.00,
        #             "store": pay.credit_store,
        #             "total_e":pay.total_egresos(),
        #             "liquid": Decimal(pay.total_ingresos()) - Decimal(pay.total_egresos())
        #         }
        #         pays.append(payment)
        # elif type == '2':
        #     if not MonthlyPayment.objects.filter(employee__job_position__department__company=company, month=month, year=year).exists():
        #         return Response({"errors":"The monthly payment is no exists"}, status=status.HTTP_404_NOT_FOUND)

        #     monthly_payment = MonthlyPayment.objects.filter(employee__job_position__department__company=company, month=month, year=year)
           
        #     description = monthly_payment.last().description
        #     pays = []

        #     for pay in monthly_payment:
        #         payment = {
        #             "employee": pay.employee.get_full_name(),
        #             "position": pay.employee.job_position.name,
        #             "base": pay.get_base_salary(),
        #             "bono3701": pay.bono3701,
        #             "fortnight": 0.00,
        #             "monthly": pay.amount,
        #             "comision": pay.comision,
        #             "extras": 0.00,
        #             "total_in": pay.total_ingresos(),
        #             "igss": pay.social_security,
        #             "contribution": pay.contribution,
        #             "store": pay.credit_store,
        #             "total_e":pay.total_egresos(),
        #             "liquid": Decimal(pay.total_ingresos()) - Decimal(pay.total_egresos())
        #         }
        #         pays.append(payment)
        # elif type == '3':
        #     pass
        # elif type == '4':
        #     pass
        # elif type == '5':
        #     pass

        month_name = get_name_month(int(month))

        context = {
            "pays": pays,
            "today": datetime.datetime.now(),
            'month_name': month_name,
            "month": month,
            "year": year,
            # "type": type,
            "description": "PAGO DE NOMINA MENSUAL",
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




