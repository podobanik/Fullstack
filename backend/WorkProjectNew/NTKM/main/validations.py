from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
AppUser = get_user_model()


def custom_validation(data):
    email = data['email'].strip()
    username = data['username'].strip()
    password = data['password'].strip()

    if not email or AppUser.objects.filter(email=email).exists():
        raise ValidationError('Введите другой адрес электронной почты.')

    if not password or len(password) < 8:
        raise ValidationError('Выберите другой пароль, минимальная длина пароля 8 сиволов.')

    if not username or AppUser.objects.filter(username=username).exists():
        raise ValidationError('Выберите другое имя пользователя.')

    return data


def validate_email(data):
    email = data['email'].strip()
    if not email:
        raise ValidationError('Необходимо ввести адрес электронной почты.')
    return True


def validate_username(data):
    username = data['username'].strip()
    if not username:
        raise ValidationError('Необходимо ввести имя пользователя.')
    return True


def validate_password(data):
    password = data['password'].strip()
    if not password:
        raise ValidationError('Необходимо ввести пароль.')
    return True
