from django.db import models
from  django.contrib.auth.models import User
from authentication.models import Profesionales
# Create your models here.

# class Profesionales(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     codigo_identidad = models.CharField(max_length=16)
#     profesion = models.CharField(max_length=100)
    
class ObrasSociales(models.Model):
    nombre = models.CharField(max_length=40)
    codigo = models.CharField(max_length=50)

class Domicilios(models.Model):
    pais=models.CharField(max_length=50)
    provincia=models.CharField(max_length=50)
    localidad= models.CharField(max_length=50)
    calle = models.CharField(max_length=60)
    nro = models.IntegerField()
    detalle = models.CharField(max_length=200)

class Pacientes(models.Model):
    nombre = models.CharField(max_length=500)
    apellido = models.CharField(max_length=500)
    nacionalidad = models.CharField(max_length=18)
    codigo_identidad = models.CharField(max_length=16)
    sexo = models.BooleanField()
    celular = models.CharField(max_length=20)
    ocupacion = models.CharField(max_length=60)
    estado_civil = models.CharField(max_length=42, choices=[
        ('Soltero/a', 'Soltero/a'),
        ('Casado/a', 'Casado/a'),
        ('Divorciado/a', 'Divorciado/a'),
        ('Viudo/a', 'Viudo/a'),
        ('Unido/a en Pareja de Hecho', 'Unido/a en Pareja de Hecho'),
        ('Separado/a', 'Separado/a'),
        ('En una Relacion de Pareja (No Formalizada)', 'En una Relacion de Pareja (No Formalizada)'),
    ])
    escolaridad = models.CharField(max_length=34, choices=[
        ('Sin Estudios', 'Sin Estudios'),
        ('Primaria Incompleta', 'Primaria Incompleta'),
        ('Primaria Completa', 'Primaria Completa'),
        ('Secundaria Incompleta', 'Secundaria Incompleta'),
        ('Secundaria Completa', 'Secundaria Completa'),
        ('Terciario/Universitario Incompleto', 'Terciario/Universitario Incompleto'),
        ('Terciario/Universitario Completo', 'Terciario/Universitario Completo'),
    ])
    servicio_militar = models.BooleanField()
    fecha_nacimiento = models.DateTimeField()
    residencia_habitual = models.ForeignKey(Domicilios, on_delete=models.CASCADE, related_name='residencia_habitual')
    residencia_actual = models.ForeignKey(Domicilios, on_delete=models.CASCADE, related_name='residencia_actual')
    # historial_clinico = models.ForeignKey(HistorialesClinicos, on_delete=models.CASCADE)

class ObrasSocialesXPacientes(models.Model):
    obra_social = models.ForeignKey(ObrasSociales, on_delete=models.CASCADE)
    paciente = models.ForeignKey(Pacientes, on_delete=models.CASCADE)

class Turnos(models.Model):
    timestamp = models.BigIntegerField(primary_key=True)
    paciente = models.ForeignKey(Pacientes, on_delete=models.CASCADE)
    profesional = models.ForeignKey(Profesionales, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=[
        ('Pendiente', 'Pendiente'),
        ('Asistio', 'Asistio'),
        ('Cancelado', 'Cancelado'),
        ('Reprogramado','Reprogramado')
    ]) 