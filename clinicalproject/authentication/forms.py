from django import forms
from django.contrib.auth.forms import AuthenticationForm

class CustomAuthenticationForm(AuthenticationForm):
    username = forms.CharField(
        label='',  # Elimina el label
        widget=forms.TextInput(attrs={
            'class': 'auth-form__input-user', 
            'placeholder': 'Nombre de usuario', 
        })
    )
    password = forms.CharField(
        label='',  # Elimina el label
        widget=forms.PasswordInput(attrs={
            'class': 'auth-form__input-pass', 
            'placeholder': 'Contraseña', 
        })
    )