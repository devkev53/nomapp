# Generated by Django 4.2.5 on 2023-09-21 20:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0007_alter_historicalsaledetail_total_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historicalsale',
            name='total',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='sale',
            name='total',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]
