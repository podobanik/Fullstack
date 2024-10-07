from datetime import date
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from django.utils import timezone


# ТПР, ТСБ, СБИБ
class ProblemType(models.Model):
    def __str__(self):
        return self.problem_type_text

    class Meta:
        verbose_name = 'Категория задачи'
        verbose_name_plural = 'Категории задач'

    id = models.AutoField(primary_key=True)
    problem_type_text = models.CharField(max_length=200, verbose_name='Категория задачи')


# Наименование сектора
class Sector(models.Model):
    def __str__(self):
        return self.sector_text

    class Meta:
        verbose_name = 'Сектор'
        verbose_name_plural = 'Секторы'

    id = models.AutoField(primary_key=True)
    sector_text = models.CharField(max_length=200, verbose_name='Сектор сотрудника')


# Выполнено, не выполнимо, в работе
class ProblemStatus(models.Model):
    def __str__(self):
        return self.problem_status_text

    class Meta:
        verbose_name = 'Статус задачи'
        verbose_name_plural = 'Статусы задач'

    id = models.AutoField(primary_key=True)
    problem_status_text = models.CharField(max_length=200, verbose_name='Статус выполнения задачи')
    color = models.CharField(max_length=200, verbose_name='Цвет', default='gray.900')


# НПС, ТДП, РДП
class ObjectOfWork(models.Model):
    def __str__(self):
        return self.object_of_work_text

    class Meta:
        verbose_name = 'Объект АСУТП'
        verbose_name_plural = 'Объекты АСУТП'

    id = models.AutoField(primary_key=True)
    object_of_work_text = models.CharField(max_length=200, verbose_name='Объект производства работ')


class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('Необходимо ввести адрес электронной почты.')
        if not password:
            raise ValueError('Необходимо ввести пароль.')
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)

        user.save()
        return user


class Profile(models.Model):
    def __str__(self):
        description = str(self.last_name) + ' ' + str(self.first_name) + ' ' + str(self.second_name)
        return description

    class Meta:
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профили'

    first_name = models.CharField(max_length=150, verbose_name='Имя')
    last_name = models.CharField(max_length=150, verbose_name='Фамилия')
    second_name = models.CharField(max_length=150, verbose_name='Отчество')
    sector = models.ForeignKey(Sector, blank=True, null=True, on_delete=models.SET_NULL,
                               verbose_name='Сектор сотрудника')
    title = models.CharField(max_length=150, verbose_name='Должность')
    birthday = models.DateField(default=timezone.now, verbose_name='День рождения')
    phone = models.IntegerField(verbose_name='Номер телефона', blank=True, null=True)


class User(AbstractBaseUser):
    def __str__(self):
        description = self.email
        return description

    class Meta:
        verbose_name = 'Сотрудник'
        verbose_name_plural = 'Сотрудники'

    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=150, unique=True, verbose_name='Адрес электронной почты')
    username = models.CharField(max_length=150, verbose_name='Логин')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    profile = models.OneToOneField(Profile, blank=True, null=True, verbose_name="Профиль", on_delete=models.CASCADE)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = UserManager()


# Основной класс с задачами отдела
class Problem(models.Model):
    def __str__(self):
        return self.problem_text

    class Meta:
        verbose_name = 'Задача'
        verbose_name_plural = 'Задачи'

    problem_text = models.TextField(max_length=1000, verbose_name='Введите название задачи')
    problem_status = models.ForeignKey(ProblemStatus, blank=True, null=True, on_delete=models.SET_NULL,
                                       verbose_name='Выберите статус задачи')
    object_of_work = models.ForeignKey(ObjectOfWork, blank=True, null=True, on_delete=models.SET_NULL,
                                       verbose_name='Объект АСУТП')
    problem_type = models.ForeignKey(ProblemType, blank=True, null=True, on_delete=models.SET_NULL,
                                     verbose_name='Выберите тип мероприятия')
    control_date = models.DateField(default=0, verbose_name='Контрольный срок')
    add_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата добавления задачи')
    change_date = models.DateTimeField(auto_now=True, verbose_name='Дата изменения задачи')
    profile = models.ForeignKey(Profile, blank=True, null=True, verbose_name="Сотрудник", on_delete=models.SET_NULL)



