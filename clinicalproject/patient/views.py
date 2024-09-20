from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Paises, Provincias, Localidades
from .serializers import PaisSerializer, ProvinciaSerializer, LocalidadSerializer

def indexPatient(request):
    return render(request, 'patient/patient.html')

class PaisViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Vista que permite obtener todos los países.
    """
    queryset = Paises.objects.all()
    serializer_class = PaisSerializer

class ProvinciaViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Vista que permite obtener provincias, filtrando por país si se especifica.
    """
    serializer_class = ProvinciaSerializer

    def get_queryset(self):
        queryset = Provincias.objects.all()
        pais_id = self.request.query_params.get('pais_id')
        if pais_id:
            queryset = queryset.filter(pais__id=pais_id)
        return queryset

class LocalidadViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Vista que permite obtener localidades, filtrando por provincia si se especifica.
    """
    serializer_class = LocalidadSerializer

    def get_queryset(self):
        queryset = Localidades.objects.all()
        provincia_id = self.request.query_params.get('provincia_id')
        if provincia_id:
            queryset = queryset.filter(provincia__id=provincia_id)
        return queryset
