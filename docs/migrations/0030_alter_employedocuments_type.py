# Generated by Django 4.2.5 on 2023-10-05 20:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('docs', '0029_alter_employedocuments_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employedocuments',
            name='type',
            field=models.CharField(choices=[('Titulos', 5), ('Antecedentes Penales', 4), ('Antecedentes Policiacos', 3), ('Certificaciones', 6), ('Diplomas', 7), ('Curriculum', 2), ('Identification', 1)], max_length=50),
        ),
    ]
