# Generated by Django 4.2.14 on 2024-10-07 00:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0017_remove_user_groups_remove_user_is_superuser_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sector',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
