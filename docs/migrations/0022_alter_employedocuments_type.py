# Generated by Django 4.2.5 on 2023-09-21 20:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('docs', '0021_alter_employedocuments_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employedocuments',
            name='type',
            field=models.CharField(choices=[('Curriculum', 2), ('Certificaciones', 6), ('Antecedentes Policiacos', 3), ('Titulos', 5), ('Antecedentes Penales', 4), ('Diplomas', 7), ('Identification', 1)], max_length=50),
        ),
    ]
