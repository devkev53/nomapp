from rest_framework import serializers
from store.models import Sale, SaleDetail


class SaleSerializers(serializers.ModelSerializer):

  class Meta:
    model = Sale
    fields = "__all__"


class SaleDetailSerializers(serializers.ModelSerializer):

  class Meta:
    model = SaleDetail
    fields = "__all__"