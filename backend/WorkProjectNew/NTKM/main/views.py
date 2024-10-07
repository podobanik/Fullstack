from django.http import HttpResponseRedirect
from rest_framework.authentication import SessionAuthentication
from django.contrib.auth import get_user_model, login, logout
from rest_framework.views import APIView


from .permissions import IsAdminOrIsOwner
from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from rest_framework import status, generics, viewsets, permissions
from .models import Problem, User, Sector, ProblemType, ProblemStatus, ObjectOfWork, Profile
from .validations import custom_validation, validate_email, validate_password


class UserRegister(APIView):
    #permission_classes = (permissions.AllowAny, )

    def post(self, request):
        validated_data = custom_validation(request.data)
        serializer = UserSerializer(data=validated_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(validated_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    #permission_classes = (permissions.AllowAny, )

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
    #authentication_classes = (SessionAuthentication,)

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserCheckView(APIView):
    #authentication_classes = (SessionAuthentication, )

    def get(self, request):
        serializer = UserCheckSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    #authentication_classes = (SessionAuthentication,)

    def get_queryset(self):
        pk = self.kwargs.get("pk")

        if not pk:
            return User.objects.all()

        return User.objects.filter(pk=pk)


class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    #authentication_classes = (SessionAuthentication,)

    def get_queryset(self):
        pk = self.kwargs.get("pk")

        if not pk:
            return Profile.objects.all()

        return Profile.objects.filter(pk=pk)


class SectorViewSet(viewsets.ModelViewSet):
    serializer_class = SectorSerializer
    #authentication_classes = (SessionAuthentication, )

    def get_queryset(self):
        pk = self.kwargs.get("pk")

        if not pk:
            return Sector.objects.all()

        return Sector.objects.filter(pk=pk)


class ProblemStatusViewSet(viewsets.ModelViewSet):
    serializer_class = ProblemStatusSerializer
    #authentication_classes = (SessionAuthentication, )

    def get_queryset(self):
        pk = self.kwargs.get("pk")

        if not pk:
            return ProblemStatus.objects.all()

        return ProblemStatus.objects.filter(pk=pk)


class ProblemTypeViewSet(viewsets.ModelViewSet):
    serializer_class = ProblemTypeSerializer
    #authentication_classes = (SessionAuthentication, )

    def get_queryset(self):
        pk = self.kwargs.get("pk")

        if not pk:
            return ProblemType.objects.all()

        return ProblemType.objects.filter(pk=pk)


class ObjectOfWorkViewSet(viewsets.ModelViewSet):
    serializer_class = ObjectOfWorkSerializer
    #authentication_classes = (SessionAuthentication, )

    def get_queryset(self):
        pk = self.kwargs.get("pk")

        if not pk:
            return ObjectOfWork.objects.all()

        return ObjectOfWork.objects.filter(pk=pk)


class ProblemViewSet(viewsets.ModelViewSet):
    #authentication_classes = (SessionAuthentication,)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ProblemReadSerializer
        return ProblemWriteSerializer

    def get_queryset(self):
        pk = self.kwargs.get("pk")

        if not pk:
            return Problem.objects.all()

        return Problem.objects.filter(pk=pk)
