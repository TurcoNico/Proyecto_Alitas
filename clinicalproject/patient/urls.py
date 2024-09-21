from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import PacienteViewSet, PaisViewSet, ProvinciaViewSet, LocalidadViewSet, indexPatient

router = DefaultRouter()
router.register(r'paises', PaisViewSet, basename='paises')
router.register(r'provincias', ProvinciaViewSet, basename='provincias')
router.register(r'localidades', LocalidadViewSet, basename='localidades')
router.register(r'pacientes', PacienteViewSet)

urlpatterns = [
    path('', indexPatient, name='patient'),
    path('api/', include(router.urls)),
]