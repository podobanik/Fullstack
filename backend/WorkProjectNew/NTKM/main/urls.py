from django.urls import path, include
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'problems', ProblemViewSet, basename='problems')
router.register(r'users', UserViewSet, basename='users')
router.register(r'problem_status_all', ProblemStatusViewSet, basename='problem_status_all')
router.register(r'problem_type_all', ProblemTypeViewSet, basename='problem_type_all')
router.register(r'sectors', SectorViewSet, basename='sectors')
router.register(r'objects_of_work', ObjectOfWorkViewSet, basename='objects_of_work')


app_name = 'main'
urlpatterns = [
    path('register/', UserRegister.as_view(), name='Регистрация'),
    path('login/', UserLogin.as_view(), name='Вход'),
    path('logout/', UserLogout.as_view(), name='Выход'),
    path('user/', UserCheckView.as_view(), name='Текущий пользователь'),
    path('', include(router.urls)),
]
