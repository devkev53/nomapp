# Generated by Django 4.2.5 on 2023-09-26 23:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0003_alter_employee_gender_alter_familymember_gender_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='familymember',
            name='relation',
            field=models.CharField(choices=[('Brother', 'brother'), ('Sister', 'sister'), ('Wife', 'wife'), ('Daughter', 'daughter'), ('Mother', 'motherr'), ('Father', 'father'), ('Husband', 'husband'), ('Son', 'son')], max_length=10),
        ),
    ]
