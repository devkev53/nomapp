# Generated by Django 4.2.5 on 2023-10-06 14:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('docs', '0032_alter_employedocuments_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employedocuments',
            name='type',
            field=models.CharField(choices=[('Antecedentes Penales', 4), ('Identification', 1), ('Certificaciones', 6), ('Titulos', 5), ('Diplomas', 7), ('Curriculum', 2), ('Antecedentes Policiacos', 3)], max_length=50),
        ),
    ]
