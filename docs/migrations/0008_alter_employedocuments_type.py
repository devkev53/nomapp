# Generated by Django 4.2.5 on 2023-09-27 22:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('docs', '0007_alter_employedocuments_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employedocuments',
            name='type',
            field=models.CharField(choices=[('Certificaciones', 6), ('Diplomas', 7), ('Antecedentes Penales', 4), ('Titulos', 5), ('Antecedentes Policiacos', 3), ('Identification', 1), ('Curriculum', 2)], max_length=50),
        ),
    ]
