# Generated by Django 5.1.1 on 2024-10-03 08:48

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0013_alter_user_birthday'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='birthday',
            field=models.DateField(default=datetime.date(2024, 10, 3), verbose_name='День рождения'),
        ),
    ]
