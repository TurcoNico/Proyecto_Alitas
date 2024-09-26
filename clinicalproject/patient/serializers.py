from rest_framework import serializers
from .models import Paises, Provincias, Localidades, Domicilios, Pacientes


# Serializadores API, Get Paises, Provincias, Localidades y Domcilios
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
        
class DomiciliosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domicilios
        fields = ['pais', 'provincia', 'localidad', 'calle', 'nro', 'detalle']

       
# Serializador API, Get y Post Pacientes        
class PacienteSerializer(serializers.ModelSerializer):
    residencia_habitual = DomiciliosSerializer()
    residencia_actual = DomiciliosSerializer()

    class Meta:
        model = Pacientes
        fields = [
            'nombre', 'apellido', 'sexo', 'nacionalidad', 'codigo_identidad', 'celular',
            'ocupacion', 'estado_civil', 'escolaridad', 'servicio_militar', 'fecha_nacimiento',
            'residencia_habitual', 'residencia_actual'
        ]

    def create(self, validated_data):
        # Extraer los datos de los domicilios
        habitual_data = validated_data.pop('residencia_habitual')
        actual_data = validated_data.pop('residencia_actual')

        # Crear los domicilios
        domicilio_habitual = Domicilios.objects.create(**habitual_data)
        domicilio_actual = Domicilios.objects.create(**actual_data)

        # Crear el paciente con los domicilios
        paciente = Pacientes.objects.create(
            residencia_habitual=domicilio_habitual,
            residencia_actual=domicilio_actual,
            **validated_data
        )

        return paciente

class PacienteBasicInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pacientes
        fields = ['id', 'nombre', 'apellido', 'codigo_identidad', 'fecha_nacimiento']