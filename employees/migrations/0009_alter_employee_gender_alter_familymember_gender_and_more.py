# Generated by Django 4.2.5 on 2023-09-27 22:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0008_alter_employee_gender_alter_familymember_gender_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='gender',
            field=models.CharField(choices=[('F', 'Female'), ('M', 'Male')], max_length=10),
        ),
        migrations.AlterField(
            model_name='familymember',
            name='gender',
            field=models.CharField(choices=[('F', 'Female'), ('M', 'Male')], max_length=10),
        ),
        migrations.AlterField(
            model_name='familymember',
            name='relation',
            field=models.CharField(choices=[('Sister', 'sister'), ('Mother', 'motherr'), ('Brother', 'brother'), ('Wife', 'wife'), ('Father', 'father'), ('Husband', 'husband'), ('Daughter', 'daughter'), ('Son', 'son')], max_length=10),
        ),
    ]
