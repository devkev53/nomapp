# Generated by Django 4.2.5 on 2023-09-30 13:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pays', '0011_alter_payment_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='type',
            field=models.CharField(choices=[('1', 'Quincena'), ('4', 'Aguinaldo'), ('3', 'Bono 14'), ('2', 'Mes')], default=1, max_length=15),
        ),
    ]
