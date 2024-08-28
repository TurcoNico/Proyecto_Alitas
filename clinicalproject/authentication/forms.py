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