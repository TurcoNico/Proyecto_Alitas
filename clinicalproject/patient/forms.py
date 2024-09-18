from django import forms
from .models import Domicilios

class DomicilioForm(forms.ModelForm):
    class Meta:
        model = Domicilios
        fields = ['pais', 'provincia', 'localidad', 'calle', 'nro', 'detalle']