# Generated by Django 3.2.7 on 2021-09-28 07:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='reports',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('project', models.IntegerField()),
                ('price', models.IntegerField()),
                ('date', models.DateField()),
            ],
        ),
    ]
