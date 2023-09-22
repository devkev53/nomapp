from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.


class CompaniesView(TemplateView):
    template_name = "index.html"

