from django.db import models
from patient.models import Pacientes

class Turnos(models.Model):
    class StatusChoices(models.TextChoices):
        PENDING = 'Pendiente', 'Pendiente'
        ATTENDED = 'Asistio', 'Asistio'
        CANCELLED = 'Cancelado', 'Cancelado'
        RESCHEDULED = 'Reprogramado', 'Reprogramado'

    timestamp = models.BigIntegerField(primary_key=True)
    paciente = models.ForeignKey(Pacientes, on_delete=models.CASCADE)
    profesional = models.ForeignKey('authentication.Profesionales', on_delete=models.CASCADE)
    status = models.CharField(max_length=15, choices=StatusChoices.choices)