# Generated by Django 2.0.2 on 2018-03-03 19:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='organization',
            name='data',
            field=models.ManyToManyField(blank=True, to='api.OrganizationData'),
        ),
        migrations.AlterField(
            model_name='organization',
            name='last_iegh',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='organization',
            name='siret',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
