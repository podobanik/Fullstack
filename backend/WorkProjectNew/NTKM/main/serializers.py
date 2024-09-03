from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
from rest_framework import serializers

from .models import Problem, User, Sector, ProblemType, ProblemStatus, ObjectOfWork


class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = "__all__"
        read_only_fields = ('add_date', 'change_date', )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        read_only_field = 'last_login'


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user_obj = User.objects.create_user(email=validated_data['email'], password=validated_data['password'])
        user_obj.username = validated_data['username']
        user_obj.save()
        return user_obj


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def check_user(self, validated_data):
        user = authenticate(username=validated_data['email'], password=validated_data['password'])
        if not user:
            raise ValidationError('Пользователь не найден')
        return user


class UserCheckSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username')


class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        fields = '__all__'


class ProblemStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProblemStatus
        fields = '__all__'


class ProblemTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProblemType
        fields = '__all__'


class ObjectOfWorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ObjectOfWork
        fields = '__all__'
