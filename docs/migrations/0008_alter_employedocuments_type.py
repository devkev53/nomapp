# Generated by Django 4.2.5 on 2023-09-20 14:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('docs', '0007_alter_employedocuments_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employedocuments',
            name='type',
            field=models.CharField(choices=[('Antecedentes Penales', 4), ('Diplomas', 7), ('Certificaciones', 6), ('Antecedentes Policiacos', 3), ('Curriculum', 2), ('Titulos', 5), ('Identification', 1)], max_length=50),
        ),
    ]
