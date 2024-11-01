from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import *
from rest_framework.response import Response
from rest_framework import status, viewsets, permissions
from .models import Problem, User, Journal, Folder, ProblemStatus
from .validations import custom_validation


# Приложение с сотрудниками
class UserRegister(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (JWTAuthentication,)

    @staticmethod
    def post(request):
        validated_data = custom_validation(request.data)
        serializer = UserWriteSerializer(data=validated_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(validated_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogout(APIView):
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (JWTAuthentication, )

    @staticmethod
    def get(request):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


class UserCheckView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)

    @staticmethod
    def get(request):
        serializer = UserCheckSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


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


# Приложение с задачами отдела
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


# Приложение с заметками
class JournalViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (JWTAuthentication, )

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return JournalReadSerializer
        return JournalWriteSerializer

    def get_queryset(self):
        pk = self.kwargs.get("pk")

        if not pk:
            return Journal.objects.all()

        return Journal.objects.filter(pk=pk)


#
class FolderViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (JWTAuthentication, )
    serializer_class = FolderSerializer

    def get_queryset(self):
        pk = self.kwargs.get("pk")

        if not pk:
            return Folder.objects.all()

        return Folder.objects.filter(pk=pk)


class ProblemStatusViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (JWTAuthentication, )
    serializer_class = ProblemStatusSerializer

    def get_queryset(self):
        pk = self.kwargs.get("pk")

        if not pk:
            return ProblemStatus.objects.all()

        return ProblemStatus.objects.filter(pk=pk)