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
                sector = sector_serializer.update(instance=instance.sector,
                                                  validated_data=sector_serializer.validated_data)
                validated_data['sector'] = sector

        return super().update(instance, validated_data)


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = "__all__"
        read_only_fields = ('last_login', 'date_joined',)

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create(**validated_data)
        Profile.objects.create(user=user, **profile_data)
        return user

    def update(self, instance, validated_data):
        if validated_data.get('profile'):
            profile_data = validated_data.get('profile')
            profile_serializer = ProfileSerializer(data=profile_data)

            if profile_serializer.is_valid():
                profile = profile_serializer.update(instance=instance.profile,
                                                    validated_data=profile_serializer.validated_data)
                validated_data['profile'] = profile

        return super().update(instance, validated_data)


class UserRegisterSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = '__all__'
        read_only_fields = ('last_login', 'date_joined',)

    def create(self, validated_data):
        user_obj = User.objects.create_user(email=validated_data['email'], password=validated_data['password'])
        user_obj.username = validated_data['username']
        user_obj.is_active = validated_data['is_active']
        user_obj.is_staff = validated_data['is_staff']
        user_obj.is_superuser = validated_data['is_superuser']
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


class ProblemSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    object_of_work = ObjectOfWorkSerializer()
    problem_status = ProblemStatusSerializer()
    problem_type = ProblemTypeSerializer()

    class Meta:
        model = Problem
        fields = "__all__"
        read_only_fields = ('add_date', 'change_date',)

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        problem_type_data = validated_data.pop('problem_type')
        problem_status_data = validated_data.pop('problem_status')
        object_of_work_data = validated_data.pop('object_of_work')
        sector_data = profile_data.pop('sector')

        problem = Problem.objects.create(**validated_data)
        Sector.objects.create(profile=profile_data, **sector_data)
        Profile.objects.create(problem=problem, **profile_data)
        ProblemType.objects.create(problem=problem, **problem_type_data)
        ProblemStatus.objects.create(problem=problem, **problem_status_data)
        ObjectOfWork.objects.create(problem=problem, **object_of_work_data)
        return problem

    def update(self, instance, validated_data):
        if validated_data.get('profile'):
            profile_data = validated_data.get('profile')
            profile_serializer = ProfileSerializer(data=profile_data)

            if profile_serializer.is_valid():
                profile = profile_serializer.update(instance=instance.profile,
                                                    validated_data=profile_serializer.validated_data)
                validated_data['profile'] = profile

        if validated_data.get('problem_type'):
            problem_type_data = validated_data.get('problem_type')
            problem_type_serializer = ProblemTypeSerializer(data=problem_type_data)

            if problem_type_serializer.is_valid():
                problem_type = problem_type_serializer.update(instance=instance.problem_type,
                                                              validated_data=problem_type_serializer.validated_data)
                validated_data['problem_type'] = problem_type

        if validated_data.get('problem_status'):
            problem_status_data = validated_data.get('problem_status')
            problem_status_serializer = ProblemStatusSerializer(data=problem_status_data)

            if problem_status_serializer.is_valid():
                problem_status = problem_status_serializer.update(instance=instance.problem_status,
                                                                  validated_data=problem_status_serializer.validated_data)
                validated_data['problem_status'] = problem_status

        if validated_data.get('object_of_work'):
            object_of_work_data = validated_data.get('object_of_work')
            object_of_work_serializer = ObjectOfWorkSerializer(data=object_of_work_data)

            if object_of_work_serializer.is_valid():
                object_of_work = object_of_work_serializer.update(instance=instance.object_of_work,
                                                                  validated_data=object_of_work_serializer.validated_data)
                validated_data['object_of_work'] = object_of_work

        return super().update(instance, validated_data)
