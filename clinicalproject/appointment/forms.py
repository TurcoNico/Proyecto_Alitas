from django import forms
from .models import Contactos

class ContactosForm(forms.ModelForm):
    class Meta:
        model = Contactos
        fields = ['telefono', 'celular', 'correo_electronico']