# Generated by Django 4.2.14 on 2024-09-02 00:07

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_alter_user_birthday'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='birthday',
            field=models.DateField(default=datetime.date(2024, 9, 2), verbose_name='День рождения'),
        ),
    ]