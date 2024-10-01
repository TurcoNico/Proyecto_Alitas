from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Paises, Provincias, Localidades, Pacientes
from .serializers import PaisSerializer, ProvinciaSerializer, LocalidadSerializer, PacienteSerializer, PacienteBasicInfoSerializer
from .pagination.patient import PatientPagination 

class PacienteViewSet(ModelViewSet):
    queryset = Pacientes.objects.all()
    serializer_class = PacienteSerializer  # Este es el serializer por defecto
    permission_classes = [IsAuthenticated]
    pagination_class = PatientPagination # Usar la paginación personalizada

    # Acción adicional para devolver solo la información básica
    @action(detail=False, methods=['get'])
    def basico(self, request):
        paginator = self.paginator  
        pacientes = self.get_queryset()  # Obtener todos los pacientes  
        paginated_pacientes = paginator.paginate_queryset(pacientes, request)  
        serializer = PacienteBasicInfoSerializer(paginated_pacientes, many=True)  
        return paginator.get_paginated_response(serializer.data) 

    # Sobrescribir el método `retrieve` para devolver el detalle completo de un paciente
    def retrieve(self, request, pk=None):
        paciente = self.get_object()  # Obtener el paciente por el id (pk)
        serializer = PacienteSerializer(paciente)
        return Response(serializer.data)

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
