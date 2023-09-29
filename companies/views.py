from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.template.loader import render_to_string, get_template
from django.urls import reverse_lazy
from django.views.generic import TemplateView, View
from companies.models import Company

from rest_framework.views import APIView

from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration



# Create your views here.


class CompaniesView(TemplateView):
    template_name = "index.html"


class NominaPagoEmpresaPDF(APIView):

    def get(self, request, pk=None, *args, **kwargs):
        template = get_template('example.html')
        context = {}
        # html = template.render(context)
        html = render_to_string('example.html', context)
        # css_url = ''
        response = HttpResponse(content_type='application/pdf')
        response["Content-Disposition"] = "inline; report.pdf"

        font_config=FontConfiguration()
        HTML(string=html, base_url=request.build_absolute_uri()).write_pdf(response, font_config=font_config)

        return response

