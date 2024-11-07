from django.urls import path, include
from .views import *
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter()
router.register(r'problems', ProblemViewSet, basename='problems')
router.register(r'users', UserViewSet, basename='users')
router.register(r'journals', JournalViewSet, basename='journals')
router.register(r'folders', FolderViewSet, basename='folders')
router.register(r'problem_status_all', ProblemStatusViewSet, basename='problem_status_all')
router.register(r'sectors', SectorViewSet, basename='sectors')
router.register(r'objects_of_work', ObjectOfWorkViewSet, basename='objects_of_work')
router.register(r'problem_type_all', ProblemTypeViewSet, basename='problem_type_all')


app_name = 'main'
urlpatterns = [
    path('user/', UserCheckView.as_view(), name='Текущий пользователь'),
    path('logout/', UserLogout.as_view(), name='Выход'),
    path('register/', UserRegister.as_view(), name='Регистрация'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
]
