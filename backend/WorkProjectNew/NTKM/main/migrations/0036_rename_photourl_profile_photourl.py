# Generated by Django 5.1.1 on 2024-10-24 07:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0035_alter_problem_file'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='photoUrl',
            new_name='photoURL',
        ),
    ]
