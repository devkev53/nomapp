# Generated by Django 4.2.5 on 2023-09-26 23:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0004_alter_familymember_relation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='familymember',
            name='relation',
            field=models.CharField(choices=[('Daughter', 'daughter'), ('Wife', 'wife'), ('Son', 'son'), ('Mother', 'motherr'), ('Father', 'father'), ('Brother', 'brother'), ('Husband', 'husband'), ('Sister', 'sister')], max_length=10),
        ),
    ]
