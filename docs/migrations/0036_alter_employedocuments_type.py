# Generated by Django 4.2.5 on 2023-10-08 16:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('docs', '0035_alter_employedocuments_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employedocuments',
            name='type',
            field=models.CharField(choices=[('Antecedentes Policiacos', 3), ('Curriculum', 2), ('Diplomas', 7), ('Antecedentes Penales', 4), ('Certificaciones', 6), ('Identification', 1), ('Titulos', 5)], max_length=50),
        ),
    ]
