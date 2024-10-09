from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ProfesionalViewSet, PasswordChangeViewSet, indexSettings

router = DefaultRouter()
router.register(r'profesionales', ProfesionalViewSet, basename='profesionales')
router.register(r'users', UserViewSet, basename='users')
router.register(r'password', PasswordChangeViewSet, basename='password')

urlpatterns = [
    path ('', indexSettings, name='user_settings'),
    path('api/', include(router.urls)),
]