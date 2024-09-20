from django.db import models
from smart_selects.db_fields import ChainedForeignKey
    
class Paises(models.Model):  
    nombre = models.CharField(max_length=50)
    
    def __str__(self):
        return self.nombre
    
class Provincias(models.Model):  
    nombre = models.CharField(max_length=50)  
    pais = models.ForeignKey(Paises, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.nombre

class Localidades(models.Model):  
    nombre = models.CharField(max_length=55)  
    provincia = models.ForeignKey(Provincias, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.nombre

class Domicilios(models.Model):  
    pais = models.ForeignKey(Paises, on_delete=models.CASCADE)  
    provincia = models.ForeignKey(Provincias, on_delete=models.CASCADE)  
    localidad = models.ForeignKey(Localidades, on_delete=models.CASCADE)  
    calle = models.CharField(max_length=60)  
    nro = models.IntegerField()  
    detalle = models.CharField(max_length=200)

class Pacientes(models.Model):
    class SexChoices(models.TextChoices):
        MALE = 'M', 'Masculino'
        FEMALE = 'F', 'Femenino'
        
    class EstadoCivilChoices(models.TextChoices):
        SINGLE = 'Soltero/a', 'Soltero/a'
        MARRIED = 'Casado/a', 'Casado/a'
        DIVORCED = 'Divorciado/a', 'Divorciado/a'
        WIDOWED = 'Viudo/a', 'Viudo/a'
        COHABITING = 'Unido/a en Pareja de Hecho', 'Unido/a en Pareja de Hecho'
        SEPARATED = 'Separado/a', 'Separado/a'
        UNFORMALIZED = 'En una Relacion de Pareja (No Formalizada)', 'En una Relacion de Pareja (No Formalizada)'
        
    class EscolaridadChoices(models.TextChoices):
        NO_STUDIES = 'Sin Estudios', 'Sin Estudios'
        INCOMPLETE_PRIMARY = 'Primaria Incompleta', 'Primaria Incompleta'
        COMPLETE_PRIMARY = 'Primaria Completa', 'Primaria Completa'
        INCOMPLETE_SECONDARY = 'Secundaria Incompleta', 'Secundaria Incompleta'
        COMPLETE_SECONDARY = 'Secundaria Completa', 'Secundaria Completa'
        INCOMPLETE_TERTIARY = 'Terciario/Universitario Incompleto', 'Terciario/Universitario Incompleto'
        COMPLETE_TERTIARY = 'Terciario/Universitario Completo', 'Terciario/Universitario Completo'
        
    class ServicioMilitarChoices(models.TextChoices):
        YES = 'Y', 'Si'
        NO = 'N', 'No'
        
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    sexo = models.CharField(
        max_length=1,
        choices=SexChoices.choices,
    )
    nacionalidad = models.CharField(max_length=20)
    codigo_identidad = models.CharField(max_length=20)
    celular = models.CharField(max_length=20)
    ocupacion = models.CharField(max_length=60)
    estado_civil = models.CharField(max_length=50,
                                    choices=EstadoCivilChoices.choices)
    escolaridad = models.CharField(max_length=40,
                                   choices=EscolaridadChoices.choices)
    servicio_militar = models.CharField(max_length=1,
                                        choices=ServicioMilitarChoices.choices)
    fecha_nacimiento = models.DateTimeField()
    
    # Relación uno a uno con Domicilios
    residencia_habitual = models.OneToOneField(Domicilios, on_delete=models.CASCADE, related_name='residencia_habitual')
    residencia_actual = models.OneToOneField(Domicilios, on_delete=models.CASCADE, related_name='residencia_actual')

class ObrasSociales(models.Model):
    nombre = models.CharField(max_length=40)
    codigo = models.CharField(max_length=50)

class ObrasSocialesXPacientes(models.Model):
    obra_social = models.ForeignKey(ObrasSociales, on_delete=models.CASCADE)
    paciente = models.ForeignKey(Pacientes, on_delete=models.CASCADE)