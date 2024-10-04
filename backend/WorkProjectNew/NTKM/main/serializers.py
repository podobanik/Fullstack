from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
from rest_framework import serializers

from .models import Problem, User, Sector, ProblemType, ProblemStatus, ObjectOfWork, Profile


class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    sector = SectorSerializer()

    class Meta:
        model = Profile
        fields = "__all__"

    def create(self, validated_data):
        sector_data = validated_data.pop('sector')
        profile = Profile.objects.create(**validated_data)
        Sector.objects.create(profile=profile, **sector_data)
        return profile

    def update(self, instance, validated_data):
        if validated_data.get('sector'):
            sector_data = validated_data.get('sector')
            sector_serializer = SectorSerializer(data=sector_data)

            if sector_serializer.is_valid():
                sector = sector_serializer.update(instance = instance.sector,
                                                  validated_data = sector_serializer.validated_data)
                validated_data['sector'] = sector

        return super().update(instance, validated_data)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        read_only_field = 'last_login'


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        read_only_fields = ('last_login', 'date_joined', )

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


class ProblemSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    object_of_work = ObjectOfWorkSerializer()
    problem_status = ProblemStatusSerializer()
    problem_type = ProblemTypeSerializer()

    class Meta:
        model = Problem
        fields = "__all__"
        read_only_fields = ('add_date', 'change_date', )

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        problem_type_data = validated_data.pop('problem_type')
        problem_status_data = validated_data.pop('problem_status')
        object_of_work_data = validated_data.pop('object_of_work')

        problem = Problem.objects.create(**validated_data)
        Profile.objects.create(problem=problem, **profile_data)
        ProblemType.objects.create(problem=problem, **problem_type_data)
        ProblemStatus.objects.get(pk=problem_status_data.id)
        return problem

    def update(self, instance, validated_data):
        if validated_data.get('sector'):
            sector_data = validated_data.get('sector')
            sector_serializer = SectorSerializer(data=sector_data)

            if sector_serializer.is_valid():
                sector = sector_serializer.update(instance = instance.sector,
                                                  validated_data = sector_serializer.validated_data)
                validated_data['sector'] = sector

        return super().update(instance, validated_data)