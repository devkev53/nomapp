from django.http import HttpResponse, HttpResponseRedirect
from core.api.views.api_views import CustomBaseViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.views import APIView

from django.template.loader import render_to_string, get_template

from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration


from employees.api.serialziers.employees_serializers import EmployeeSerializer, CreateEmployeeSerializer

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

class PaymentTiketPFD(APIView):

  # POST METHOD
  def post(self, request, pk=None, *args, **kwargs):
    template = get_template('payment_tiket.html')

    month = request.data['month']
    year = request.data['year']

    context = {
      'month': month,
      'year': year
    }

    # html = template.render(context)
    html = render_to_string('payment_tiket.html', context)
    # css_url = ''
    response = HttpResponse(content_type='application/pdf')
    response["Content-Disposition"] = "inline; report.pdf"

    font_config=FontConfiguration()
    HTML(string=html, base_url=request.build_absolute_uri()).write_pdf(response, font_config=font_config)

    return response