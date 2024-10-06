from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ProfesionalViewSet

router = DefaultRouter()
router.register(r'profesionales', ProfesionalViewSet, basename='profesionales')
router.register(r'users', UserViewSet, basename='users')

urlpatterns = [
    #path ('', indexSettings, name='user_settings'),
    path('api/', include(router.urls)),
]