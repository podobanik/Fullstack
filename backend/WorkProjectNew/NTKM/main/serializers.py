from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
from rest_framework import serializers

from .models import Problem, User, Sector, ProblemType, ProblemStatus, ObjectOfWork, Profile


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


class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = "__all__"
        read_only_fields = ('last_login', 'date_joined',)

    def create(self, validated_data):
        user_obj = User.objects.create_user(email=validated_data['email'], password=validated_data['password'])
        user_obj.username = validated_data['username']
        if validated_data['is_active'] or validated_data['is_active'] is not None:
            user_obj.is_active = validated_data['is_active']
        else:
            raise ValidationError('Укажите активность пользователя')
        if validated_data['is_staff'] or validated_data['is_staff'] is not None:
            user_obj.is_staff = validated_data['is_staff']
        else:
            raise ValidationError('Укажите тип пользователя')
        if validated_data['profile'] or validated_data['profile'] is not None:
            user_obj.profile = validated_data['profile']

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
        read_only_fields = ('email', 'username')


class ProblemReadSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    object_of_work = ObjectOfWorkSerializer()
    problem_status = ProblemStatusSerializer()
    problem_type = ProblemTypeSerializer()

    class Meta:
        model = Problem
        fields = "__all__"
        read_only_fields = ('problem_text', 'add_date', 'change_date', 'problem_status', 'problem_type', 'object_of_work', 'profile', 'control_date', )


class ProblemWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = "__all__"
        read_only_fields = ('add_date', 'change_date',)
