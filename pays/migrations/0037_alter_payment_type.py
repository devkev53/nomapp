# Generated by Django 4.2.5 on 2023-10-08 17:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pays', '0036_alter_payment_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='type',
            field=models.CharField(choices=[('2', 'Mes'), ('3', 'Bono 14'), ('1', 'Quincena'), ('4', 'Aguinaldo')], default=1, max_length=15),
        ),
    ]
