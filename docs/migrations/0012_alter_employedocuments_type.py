# Generated by Django 4.2.5 on 2023-09-30 13:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('docs', '0011_alter_employedocuments_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employedocuments',
            name='type',
            field=models.CharField(choices=[('Titulos', 5), ('Antecedentes Penales', 4), ('Certificaciones', 6), ('Diplomas', 7), ('Identification', 1), ('Curriculum', 2), ('Antecedentes Policiacos', 3)], max_length=50),
        ),
    ]
