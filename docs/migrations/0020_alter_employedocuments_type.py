# Generated by Django 4.2.5 on 2023-10-03 23:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('docs', '0019_alter_employedocuments_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employedocuments',
            name='type',
            field=models.CharField(choices=[('Curriculum', 2), ('Antecedentes Penales', 4), ('Identification', 1), ('Titulos', 5), ('Antecedentes Policiacos', 3), ('Certificaciones', 6), ('Diplomas', 7)], max_length=50),
        ),
    ]
