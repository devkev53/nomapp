# Generated by Django 4.2.5 on 2023-09-19 16:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('employees', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='EmployeDocuments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=125)),
                ('document', models.FileField(upload_to='employess/docs/')),
                ('type', models.CharField(choices=[('Antecedentes Penales', 4), ('Antecedentes Policiacos', 3), ('Certificaciones', 6), ('Diplomas', 7), ('Identification', 1), ('Curriculum', 2), ('Titulos', 5)], max_length=50)),
                ('expiration_date', models.DateField()),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='employees.employee')),
            ],
            options={
                'verbose_name': 'EmployeDocuments',
                'verbose_name_plural': 'EmployeDocumentss',
            },
        ),
    ]
