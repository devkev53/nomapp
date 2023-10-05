from rest_framework import serializers

from pays.models import MonthlyPayment, FortnightPayment


class FortnightPaymentSerializer(serializers.ModelSerializer):

  class Meta:
    model = FortnightPayment
    fields = (
      'id', 'description', 'employee',
      'credit_store', 'amount', 'total', 'month', 'year'
    )


class MonthlyPaymentSerializer(serializers.ModelSerializer):

  class Meta:
    model = MonthlyPayment
    fields = (
      'id', 'description', 'employee', 'comision',
      'social_security', 'contribution', 'credit',
      'credit_store', 'amount', 'total', 'month', 'year'
    )