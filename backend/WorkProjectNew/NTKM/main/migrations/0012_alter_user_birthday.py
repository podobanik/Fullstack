# Generated by Django 4.2.13 on 2024-09-26 05:34

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0011_alter_user_birthday'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='birthday',
            field=models.DateField(default=datetime.date(2024, 9, 26), verbose_name='День рождения'),
        ),
    ]
