# Generated by Django 4.2.5 on 2023-10-04 23:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0022_alter_familymember_relation'),
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
