# Generated by Django 4.2.14 on 2024-11-01 03:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0040_remove_problem_file_alter_problem_object_of_work_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='problem',
            name='profile',
        ),
        migrations.AddField(
            model_name='problem',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='Сотрудник'),
        ),
    ]