from core.api.views.api_views import CustomBaseViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status

from decimal import Decimal
import datetime

from products.models import Product
from employees.models import Employee

from store.api.serializers.serialziers import SaleSerializers, SaleDetailSerializers

import ast

def total_buy(data):
  total_buy = Decimal(0.00)
  detail_array = []
  for det in data:
    product = Product.objects.filter(id=det["product"]).get()
    total_buy += det["amount"] * product.price
    # print("{} - {} - {}".format(product.name, det["amount"], product.price))
    data = {
      "product": det["product"],
      "amount": det["amount"],
      "total": det["amount"] * product.price
    }
    detail_array.append(data)
  return {"total": total_buy, "array": detail_array}

def validate_sale(total_buy, employee):
  day = datetime.date.today().day
  aviable = 0
  if day > 14:
    aviable = Decimal(employee.calculate_monthPayment()) / 2
  else:
    aviable = Decimal(employee.calculate_prepaid()) / 2
  # print(total_buy)
  return aviable > total_buy



class SaleViewSet(CustomBaseViewSet):
  serializer_class = SaleSerializers
  permission_classes = (IsAuthenticated,)

  def create(self, request):
    detail = self.request.data["detail"]

    employee = Employee.objects.filter(pk=self.request.data["employee"]).get()

    total=total_buy(detail)
    if not validate_sale(total["total"], employee):
      return Response({"error": "El monto excede el limite de compra"}, status=status.HTTP_401_UNAUTHORIZED)

    sale_serialzier = SaleSerializers(data={"employee": employee.pk, "total":total["total"]})
    if sale_serialzier.is_valid():
      sale_serialzier.save()

      for det in total["array"]:
        sale_id = sale_serialzier.data["id"]
        det["sale"] = sale_id
        detail_serializer = SaleDetailSerializers(data=det)
        if detail_serializer.is_valid():
          detail_serializer.save()

      return Response(sale_serialzier.data, status=status.HTTP_201_CREATED)

    return Response(sale_serialzier.errors, status=status.HTTP_409_CONFLICT)

  @action(detail=True, methods=['patch'], url_path='pay')
  def pay_sale(self, request, pk=None, *args, **kwargs):
    sale = self.get_object(pk)
    sale_serializer = self.serializer_class(sale, data={"paid_status": True}, partial=True)
    if sale_serializer.is_valid():
      sale_serializer.save()

      return Response(sale_serializer.data, status=status.HTTP_200_OK)

    return Response(sale_serializer.errors, status=status.HTTP_409_CONFLICT)


class SaleDetailViewSet(CustomBaseViewSet):
  serializer_class = SaleDetailSerializers

