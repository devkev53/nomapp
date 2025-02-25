# Generated by Django 4.2.5 on 2023-10-06 22:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0028_alter_employee_gender_alter_familymember_gender'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='gender',
            field=models.CharField(blank=True, choices=[('F', 'Female'), ('M', 'Male')], max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='familymember',
            name='gender',
            field=models.CharField(blank=True, choices=[('F', 'Female'), ('M', 'Male')], max_length=10, null=True),
        ),
    ]
