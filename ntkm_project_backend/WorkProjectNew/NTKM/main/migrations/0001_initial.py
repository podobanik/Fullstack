# Generated by Django 4.2.14 on 2024-11-07 00:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=150, unique=True, verbose_name='Адрес электронной почты')),
                ('username', models.CharField(max_length=150, verbose_name='Логин')),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
            ],
            options={
                'verbose_name': 'Сотрудник',
                'verbose_name_plural': 'Сотрудники',
            },
        ),
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, verbose_name='Название файла')),
                ('upload', models.FileField(blank=True, null=True, upload_to='files', verbose_name='Прикреплённый файл')),
            ],
            options={
                'verbose_name': 'Вложение',
                'verbose_name_plural': 'Вложения',
            },
        ),
        migrations.CreateModel(
            name='Folder',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, verbose_name='Название папки')),
                ('color', models.CharField(default='gray.900', max_length=200, verbose_name='Цвет')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Папка')),
            ],
            options={
                'verbose_name': 'Название папки',
                'verbose_name_plural': 'Названия папок',
            },
        ),
        migrations.CreateModel(
            name='ObjectOfWork',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('object_of_work_text', models.CharField(max_length=200, verbose_name='Объект производства работ')),
            ],
            options={
                'verbose_name': 'Объект АСУТП',
                'verbose_name_plural': 'Объекты АСУТП',
            },
        ),
        migrations.CreateModel(
            name='ProblemStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('problem_status_text', models.CharField(max_length=200, verbose_name='Статус выполнения задачи')),
                ('color', models.CharField(default='gray.900', max_length=200, verbose_name='Цвет')),
            ],
            options={
                'verbose_name': 'Статус задачи',
                'verbose_name_plural': 'Статусы задач',
            },
        ),
        migrations.CreateModel(
            name='ProblemType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('problem_type_text', models.CharField(max_length=200, verbose_name='Категория задачи')),
            ],
            options={
                'verbose_name': 'Категория задачи',
                'verbose_name_plural': 'Категории задач',
            },
        ),
        migrations.CreateModel(
            name='Sector',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sector_text', models.CharField(max_length=200, verbose_name='Сектор сотрудника')),
            ],
            options={
                'verbose_name': 'Сектор',
                'verbose_name_plural': 'Секторы',
            },
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=150, verbose_name='Имя')),
                ('last_name', models.CharField(max_length=150, verbose_name='Фамилия')),
                ('second_name', models.CharField(max_length=150, verbose_name='Отчество')),
                ('title', models.CharField(max_length=150, verbose_name='Должность')),
                ('birthday', models.DateField(default=django.utils.timezone.now, verbose_name='День рождения')),
                ('phone', models.CharField(default='', max_length=11, verbose_name='Номер телефона')),
                ('photoURL', models.ImageField(blank=True, null=True, upload_to='images', verbose_name='Фото')),
                ('sector', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.sector', verbose_name='Сектор сотрудника')),
            ],
            options={
                'verbose_name': 'Профиль',
                'verbose_name_plural': 'Профили',
            },
        ),
        migrations.CreateModel(
            name='Problem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('problem_text', models.TextField(max_length=200, verbose_name='Введите название задачи')),
                ('problem_text_expand', models.TextField(default='', max_length=5000, verbose_name='Введите подробное описание задачи')),
                ('control_date', models.DateField(default=0, verbose_name='Контрольный срок')),
                ('add_date', models.DateTimeField(auto_now_add=True, verbose_name='Дата добавления задачи')),
                ('accept_date', models.DateTimeField(auto_now=True, verbose_name='Дата принятия задачи')),
                ('change_date', models.DateTimeField(auto_now=True, verbose_name='Дата изменения задачи')),
                ('file', models.ManyToManyField(to='main.file', verbose_name='Вложения')),
                ('object_of_work', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.objectofwork', verbose_name='Объект производства работ')),
                ('problem_status', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.problemstatus', verbose_name='Выберите статус задачи')),
                ('problem_type', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.problemtype', verbose_name='Категория задачи')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='Сотрудник')),
            ],
            options={
                'verbose_name': 'Задача',
                'verbose_name_plural': 'Задачи',
            },
        ),
        migrations.CreateModel(
            name='Journal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150, verbose_name='Введите название заметки')),
                ('add_date', models.DateTimeField(auto_now_add=True, verbose_name='Дата добавления заметки')),
                ('change_date', models.DateTimeField(auto_now=True, verbose_name='Дата изменения заметки')),
                ('post', models.TextField(max_length=1000, verbose_name='Текст заметки')),
                ('folder', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='main.folder', verbose_name='Папка')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Папка')),
            ],
            options={
                'verbose_name': 'Заметка',
                'verbose_name_plural': 'Заметки',
            },
        ),
        migrations.AddField(
            model_name='user',
            name='profile',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='main.profile', verbose_name='Профиль'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions'),
        ),
    ]
