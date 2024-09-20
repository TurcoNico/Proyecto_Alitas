from rest_framework import serializers
from .models import Paises, Provincias, Localidades

class PaisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paises
        fields = ['id', 'nombre']

class ProvinciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provincias
        fields = ['id', 'nombre', 'pais']

class LocalidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Localidades
        fields = ['id', 'nombre', 'provincia']