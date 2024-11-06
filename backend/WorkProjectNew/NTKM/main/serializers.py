from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
from django.db.models import UUIDField
from rest_framework import serializers

from .models import Problem, User, Sector, ProblemType, ProblemStatus, ObjectOfWork, Profile, File, Journal, Folder

#Приложение с сотрудниками
class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        fields = '__all__'


class ProfileReadSerializer(serializers.ModelSerializer):
    sector = SectorSerializer()
    class Meta:
        model = Profile
        fields = "__all__"
        read_only_fields = ('first_name', 'last_name', 'second_name', 'sector', 'title', 'birthday', 'phone', 'photoUrl',)


class ProfileWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"



class UserReadSerializer(serializers.ModelSerializer):
    profile = ProfileReadSerializer()

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'last_login', 'date_joined', 'is_active', 'is_staff', 'is_superuser', 'profile')
        read_only_fields = ('id', 'email', 'username', 'last_login', 'date_joined', 'is_active', 'is_staff', 'profile')


class UserWriteSerializer(serializers.ModelSerializer):
    profile = ProfileWriteSerializer()

    class Meta:
        model = User
        fields = "__all__"
        read_only_fields = ('last_login', 'date_joined',)

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        profile = Profile.objects.create(**profile_data)
        user_obj = User.objects.create_user(email=validated_data['email'], password=validated_data['password'])
        user_obj.username = validated_data['username']
        user_obj.is_active = validated_data['is_active']
        user_obj.is_staff = validated_data['is_staff']
        user_obj.is_superuser = validated_data['is_superuser']
        user_obj.profile = profile
        user_obj.save()

        return user_obj

    def update(self, instance, validated_data):
        if 'profile' in validated_data:
            nested_serializer = self.fields['profile']
            nested_instance = instance.profile
            nested_data = validated_data.pop('profile')

            nested_serializer.update(nested_instance, nested_data)

        return super(UserWriteSerializer, self).update(instance, validated_data)


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
        fields = ('id', 'email')
        read_only_fields = ('id', 'email')


#Приложение с задачами отдела
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


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = "__all__"


class ProblemReadSerializer(serializers.ModelSerializer):
    user = UserReadSerializer()
    problem_status = ProblemStatusSerializer()
    file = FileSerializer()
    object_of_work = ObjectOfWorkSerializer()
    problem_type = ProblemTypeSerializer()

    class Meta:
        model = Problem
        fields = "__all__"
        read_only_fields = ('id', 'problem_text', 'add_date', 'change_date', 'problem_status', 'problem_type', 'object_of_work', 'user', 'control_date', 'file', )


class ProblemWriteSerializer(serializers.ModelSerializer):
    file = FileSerializer(many=True)

    class Meta:
        model = Problem
        fields = "__all__"
        read_only_fields = ('add_date', 'change_date',)

    def create(self, validated_data):
        file_data = validated_data.pop('file')
        file = File.objects.create(**file_data)
        problem = Problem.objects.create(**validated_data)
        problem.file = file
        return problem

    def update(self, instance, validated_data):
        if 'file' in validated_data:
            nested_serializer = self.fields['file']
            nested_instance = instance.file
            nested_data = validated_data.pop('file')

            nested_serializer.update(nested_instance, nested_data)

        return super(ProblemWriteSerializer, self).update(instance, validated_data)


#Приложение с заметками
class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = "__all__"


class JournalReadSerializer(serializers.ModelSerializer):
    folder = FolderSerializer()
    user = UserReadSerializer()

    class Meta:
        model = Journal
        fields = "__all__"
        read_only_fields = ('id', 'title', 'add_date', 'change_date', 'folder', 'post', 'user',)


class JournalWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Journal
        fields = "__all__"
        read_only_fields = ('add_date', 'change_date', )

