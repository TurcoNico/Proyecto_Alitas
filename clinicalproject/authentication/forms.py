from django import forms
from django.contrib.auth.forms import AuthenticationForm

class CustomAuthenticationForm(AuthenticationForm):
    username = forms.CharField(
        label='',
        widget=forms.TextInput(attrs={
            'class': 'auth-form__input-user', 
            'placeholder': 'Usuario', 
        })
    )
    password = forms.CharField(
        label='',
        widget=forms.PasswordInput(attrs={
            'class': 'auth-form__input-pass', 
            'placeholder': 'Contraseña', 
        })
    )