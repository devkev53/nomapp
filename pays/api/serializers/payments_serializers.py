from rest_framework import serializers

from pays.models import MonthlyPayment, FortnightPayment, BonoPayment, AguinaldoPayment


class FortnightPaymentSerializer(serializers.ModelSerializer):

  class Meta:
    model = FortnightPayment
    fields = (
      'id', 'description', 'employee',
      'credit_store', 'amount', 'total', 'month', 'year', 'type_payment'
    )


class MonthlyPaymentSerializer(serializers.ModelSerializer):

  class Meta:
    model = MonthlyPayment
    fields = (
      'id', 'description', 'employee', 'comision',
      'social_security', 'contribution', 'credit',
      'credit_store', 'amount', 'total', 'month', 'year', 'type_payment'
    )

class BonoPaymentSerializer(serializers.ModelSerializer):

  class Meta:
    model = BonoPayment
    fields = (
      'id', 'description', 'employee', 'type_payment',
      'amount', 'total', 'month', 'year',
    )

class AguinaldoPaymentSerializer(serializers.ModelSerializer):

  class Meta:
    model = AguinaldoPayment
    fields = (
      'id', 'description', 'employee', 'type_payment',
      'amount', 'total', 'month', 'year',
    )