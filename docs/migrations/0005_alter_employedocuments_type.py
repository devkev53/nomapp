# Generated by Django 4.2.5 on 2023-09-26 23:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('docs', '0004_alter_employedocuments_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employedocuments',
            name='type',
            field=models.CharField(choices=[('Diplomas', 7), ('Certificaciones', 6), ('Antecedentes Policiacos', 3), ('Curriculum', 2), ('Antecedentes Penales', 4), ('Identification', 1), ('Titulos', 5)], max_length=50),
        ),
    ]
