# Generated by Django 4.2.5 on 2023-09-28 14:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pays', '0009_alter_payment_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='type',
            field=models.CharField(choices=[('1', 'Quincena'), ('3', 'Bono 14'), ('4', 'Aguinaldo'), ('2', 'Mes')], default=1, max_length=15),
        ),
    ]
