from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Paises, Provincias, Localidades, Pacientes
from .serializers import PaisSerializer, ProvinciaSerializer, LocalidadSerializer, PacienteSerializer

class PacienteViewSet(ModelViewSet):
    queryset = Pacientes.objects.all()
    serializer_class = PacienteSerializer
    permission_classes = [IsAuthenticated]

def indexPatient(request):
    return render(request, 'patient/patient.html')

class PaisViewSet(ReadOnlyModelViewSet):
    """
    Vista que permite obtener todos los países.
    """
    queryset = Paises.objects.all()
    serializer_class = PaisSerializer

class ProvinciaViewSet(ReadOnlyModelViewSet):
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

class LocalidadViewSet(ReadOnlyModelViewSet):
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
