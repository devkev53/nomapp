# Generated by Django 4.2.5 on 2023-09-21 16:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0020_alter_familymember_relation_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='familymember',
            name='relation',
            field=models.CharField(choices=[('Brother', 'brother'), ('Mother', 'motherr'), ('Sister', 'sister'), ('Daughter', 'daughter'), ('Wife', 'wife'), ('Father', 'father'), ('Husband', 'husband'), ('Son', 'son')], max_length=10),
        ),
        migrations.AlterField(
            model_name='historicalfamilymember',
            name='relation',
            field=models.CharField(choices=[('Brother', 'brother'), ('Mother', 'motherr'), ('Sister', 'sister'), ('Daughter', 'daughter'), ('Wife', 'wife'), ('Father', 'father'), ('Husband', 'husband'), ('Son', 'son')], max_length=10),
        ),
    ]
