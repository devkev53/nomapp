# Generated by Django 4.2.5 on 2023-10-21 01:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('docs', '0047_alter_employedocuments_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employedocuments',
            name='type',
            field=models.CharField(choices=[('Certificaciones', 6), ('Diplomas', 7), ('Curriculum', 2), ('Titulos', 5), ('Antecedentes Policiacos', 3), ('Identification', 1), ('Antecedentes Penales', 4)], max_length=50),
        ),
    ]
