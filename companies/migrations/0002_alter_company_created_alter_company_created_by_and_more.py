# Generated by Django 4.2.5 on 2023-09-19 17:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('companies', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='created',
            field=models.DateField(auto_now_add=True, null=True, verbose_name='Fecha de creación'),
        ),
        migrations.AlterField(
            model_name='company',
            name='created_by',
            field=models.ForeignKey(blank=True, editable=False, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='created_by%(app_label)s_%(class)s_related', to=settings.AUTH_USER_MODEL, verbose_name='Created by'),
        ),
        migrations.AlterField(
            model_name='company',
            name='updated_by',
            field=models.ForeignKey(blank=True, editable=False, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='updated_by%(app_label)s_%(class)s_related', to=settings.AUTH_USER_MODEL, verbose_name='Updated by'),
        ),
        migrations.AlterField(
            model_name='historicalcompany',
            name='created',
            field=models.DateField(blank=True, editable=False, null=True, verbose_name='Fecha de creación'),
        ),
        migrations.AlterField(
            model_name='historicalcompany',
            name='created_by',
            field=models.ForeignKey(blank=True, db_constraint=False, editable=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL, verbose_name='Created by'),
        ),
        migrations.AlterField(
            model_name='historicalcompany',
            name='updated_by',
            field=models.ForeignKey(blank=True, db_constraint=False, editable=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL, verbose_name='Updated by'),
        ),
    ]
