from django import forms
from .models import Pacientes, Turnos

class PacienteForm(forms.ModelForm):
    class Meta:
        model = Pacientes
        fields = '__all__'

class TurnoForm(forms.ModelForm):
    class Meta:
        model = Turnos
        fields = '__all__'
