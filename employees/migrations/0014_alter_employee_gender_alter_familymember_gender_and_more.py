# Generated by Django 4.2.5 on 2023-10-02 14:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0013_alter_familymember_relation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='gender',
            field=models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=10),
        ),
        migrations.AlterField(
            model_name='familymember',
            name='gender',
            field=models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=10),
        ),
        migrations.AlterField(
            model_name='familymember',
            name='relation',
            field=models.CharField(choices=[('Husband', 'husband'), ('Daughter', 'daughter'), ('Wife', 'wife'), ('Brother', 'brother'), ('Sister', 'sister'), ('Father', 'father'), ('Son', 'son'), ('Mother', 'motherr')], max_length=10),
        ),
    ]
