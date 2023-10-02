import datetime

from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.template.loader import render_to_string, get_template
from django.urls import reverse_lazy
from django.views.generic import TemplateView, View

from companies.models import Company
# from pays.models import Payment

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

        company = Company.objects.filter(pk=pk).get()

        if month == '':
            today = datetime.datetime.now()
            month = today.month
            year = today.year

            pays = Payment.objects.filter(employee__job_position__department__company=company, month=month, year=year)


        context = {
            "company":company,
            "pays": pays
            }


        # html = template.render(context)
        html = render_to_string('nomina_template.html', context)
        # css_url = ''
        response = HttpResponse(content_type='application/pdf')
        response["Content-Disposition"] = "inline; report.pdf"

        font_config=FontConfiguration()
        HTML(string=html, base_url=request.build_absolute_uri()).write_pdf(response, font_config=font_config)

        return response

