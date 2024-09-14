from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm

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
    
class CustomUserCreationForm(UserCreationForm):
    first_name = forms.CharField(
        label='',
        widget=forms.TextInput(attrs={
            'class': 'auth-form__input-user', 
            'placeholder': 'Nombre', 
        })
    )
    last_name = forms.CharField(
        label='',
        widget=forms.TextInput(attrs={
            'class': 'auth-form__input-user', 
            'placeholder': 'Apellido', 
        })
    )
    codigo_identidad= forms.CharField(
        label='',
        widget=forms.TextInput(attrs={
            'class': 'auth-form__input-user', 
            'placeholder': 'Código de Identidad', 
        })
    )
    username = forms.CharField(
        label='',
        widget=forms.TextInput(attrs={
            'class': 'auth-form__input-user', 
            'placeholder': 'Usuario', 
        })
    )
    password1 = forms.CharField(
        label='',
        widget=forms.PasswordInput(attrs={
            'class': 'auth-form__input-pass', 
            'placeholder': 'Contraseña', 
        })
    )
    password2 = forms.CharField(
        label='',
        widget=forms.PasswordInput(attrs={
            'class': 'auth-form__input-pass', 
            'placeholder': 'Repetir contraseña', 
        })
    )
    email = forms.EmailField(
        label='',
        widget=forms.EmailInput(attrs={
            'class': 'auth-form__input-user', 
            'placeholder': 'Correo Electrónico',
        })
    )
    profesion = forms.CharField(
        label='',
        widget=forms.TextInput(attrs={
            'class': 'auth-form__input-user', 
            'placeholder': 'Profesión', 
        })
    )