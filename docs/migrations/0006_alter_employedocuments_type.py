# Generated by Django 4.2.5 on 2023-09-27 14:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('docs', '0005_alter_employedocuments_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employedocuments',
            name='type',
            field=models.CharField(choices=[('Antecedentes Policiacos', 3), ('Antecedentes Penales', 4), ('Diplomas', 7), ('Identification', 1), ('Titulos', 5), ('Certificaciones', 6), ('Curriculum', 2)], max_length=50),
        ),
    ]
