from django.contrib.auth import login, logout
from rest_framework.views import APIView
from rest_framework.exceptions import PermissionDenied
from rest_framework_simplejwt.authentication import JWTAuthentication

from .permissions import IsAdminOrIsOwner, IsAdmin
from .serializers import *
from rest_framework.response import Response
from rest_framework import status, viewsets, permissions
from .models import Problem, User, Sector, ProblemType, ProblemStatus, ObjectOfWork, Profile
from .validations import custom_validation, validate_email, validate_password


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (JWTAuthentication,)

    def post(self, request):
        validated_data = custom_validation(request.data)
        serializer = UserWriteSerializer(data=validated_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(validated_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (JWTAuthentication,)

    def post(self, request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (JWTAuthentication, )

    def get(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (JWTAuthentication, )

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return UserReadSerializer
        return UserWriteSerializer

    def get_queryset(self):
        pk = self.kwargs.get("pk")

        if not pk:
            return User.objects.all()

        return User.objects.filter(pk=pk)


class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (JWTAuthentication, )

    def get_queryset(self):
        pk = self.kwargs.get("pk")

        if not pk:
            return Profile.objects.all()

        return Profile.objects.filter(pk=pk)


class SectorViewSet(viewsets.ModelViewSet):
    serializer_class = SectorSerializer
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (JWTAuthentication, )

    def get_queryset(self):
        pk = self.kwargs.get("pk")

        if not pk:
            return Sector.objects.all()

        return Sector.objects.filter(pk=pk)


class ProblemStatusViewSet(viewsets.ModelViewSet):
    serializer_class = ProblemStatusSerializer
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (JWTAuthentication, )

    def get_queryset(self):
        pk = self.kwargs.get("pk")

        if not pk:
            return ProblemStatus.objects.all()

        return ProblemStatus.objects.filter(pk=pk)


class ProblemTypeViewSet(viewsets.ModelViewSet):
    serializer_class = ProblemTypeSerializer
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (JWTAuthentication, )

    def get_queryset(self):
        pk = self.kwargs.get("pk")

        if not pk:
            return ProblemType.objects.all()

        return ProblemType.objects.filter(pk=pk)


class ObjectOfWorkViewSet(viewsets.ModelViewSet):
    serializer_class = ObjectOfWorkSerializer
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (JWTAuthentication, )

    def get_queryset(self):
        pk = self.kwargs.get("pk")

        if not pk:
            return ObjectOfWork.objects.all()

        return ObjectOfWork.objects.filter(pk=pk)


class ProblemViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (JWTAuthentication, )

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ProblemReadSerializer
        return ProblemWriteSerializer

    def get_queryset(self):
        pk = self.kwargs.get("pk")

        if not pk:
            return Problem.objects.all()

        return Problem.objects.filter(pk=pk)
