# Generated by Django 4.2.5 on 2023-09-21 22:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MonthPayment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateField(auto_now_add=True, null=True, verbose_name='Fecha de creación')),
                ('updated', models.DateField(auto_now=True, null=True, verbose_name='Updated')),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
                ('amount', models.DecimalField(decimal_places=2, default=0, editable=False, max_digits=10)),
                ('day', models.PositiveSmallIntegerField(editable=False)),
                ('month', models.PositiveSmallIntegerField(editable=False)),
                ('year', models.PositiveSmallIntegerField(editable=False)),
            ],
            options={
                'verbose_name': 'MonthPayment',
                'verbose_name_plural': 'MonthPayments',
            },
        ),
        migrations.CreateModel(
            name='Prepaid',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateField(auto_now_add=True, null=True, verbose_name='Fecha de creación')),
                ('updated', models.DateField(auto_now=True, null=True, verbose_name='Updated')),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
                ('amount', models.DecimalField(decimal_places=2, default=0, editable=False, max_digits=10)),
                ('day', models.PositiveSmallIntegerField(editable=False)),
                ('month', models.PositiveSmallIntegerField(editable=False)),
                ('year', models.PositiveSmallIntegerField(editable=False)),
            ],
            options={
                'verbose_name': 'Prepaid',
                'verbose_name_plural': 'Prepaids',
            },
        ),
    ]
