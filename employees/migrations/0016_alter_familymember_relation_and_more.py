# Generated by Django 4.2.5 on 2023-09-21 14:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0015_alter_employee_gender_alter_familymember_gender_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='familymember',
            name='relation',
            field=models.CharField(choices=[('Sister', 'sister'), ('Daughter', 'daughter'), ('Brother', 'brother'), ('Husband', 'husband'), ('Son', 'son'), ('Mother', 'motherr'), ('Wife', 'wife'), ('Father', 'father')], max_length=10),
        ),
        migrations.AlterField(
            model_name='historicalfamilymember',
            name='relation',
            field=models.CharField(choices=[('Sister', 'sister'), ('Daughter', 'daughter'), ('Brother', 'brother'), ('Husband', 'husband'), ('Son', 'son'), ('Mother', 'motherr'), ('Wife', 'wife'), ('Father', 'father')], max_length=10),
        ),
    ]
