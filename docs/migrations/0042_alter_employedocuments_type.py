# Generated by Django 4.2.5 on 2023-10-10 03:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('docs', '0041_alter_employedocuments_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employedocuments',
            name='type',
            field=models.CharField(choices=[('Titulos', 5), ('Curriculum', 2), ('Identification', 1), ('Certificaciones', 6), ('Antecedentes Policiacos', 3), ('Diplomas', 7), ('Antecedentes Penales', 4)], max_length=50),
        ),
    ]
