# Generated by Django 4.2.5 on 2023-10-03 23:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pays', '0019_alter_payment_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='type',
            field=models.CharField(choices=[('1', 'Quincena'), ('2', 'Mes'), ('3', 'Bono 14'), ('4', 'Aguinaldo')], default=1, max_length=15),
        ),
    ]
