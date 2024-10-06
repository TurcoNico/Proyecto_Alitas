from django import forms
from .models import User, Profesionales

class CustomUserCreationForm(forms.ModelForm):
    username = forms.CharField(label='Usuario', widget=forms.TextInput(attrs={'class': 'auth-form__input-user'}))
    email = forms.EmailField(label='Correo Electrónico', widget=forms.EmailInput(attrs={'class': 'auth-form__input-user'}))
    password1 = forms.CharField(label='Contraseña', widget=forms.PasswordInput(attrs={'class': 'auth-form__input-pass'}))
    password2 = forms.CharField(label='Repetir contraseña', widget=forms.PasswordInput(attrs={'class': 'auth-form__input-pass'}))
    first_name = forms.CharField(label='Nombre', widget=forms.TextInput(attrs={'class': 'auth-form__input-user'}))
    last_name = forms.CharField(label='Apellido', widget=forms.TextInput(attrs={'class': 'auth-form__input-user'}))
    codigo_identidad = forms.CharField(label='Código de Identidad', widget=forms.TextInput(attrs={'class': 'auth-form__input-user'}))
    profesion = forms.CharField(label='Profesión', widget=forms.TextInput(attrs={'class': 'auth-form__input-user'}))

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2', 'first_name', 'last_name')

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password1'])
        if commit:
            user.save()
        return user

class CustomProfesionalesCreationForm(forms.ModelForm):
    class Meta:
        model = Profesionales
        fields = ('codigo_identidad', 'profesion')

    def save(self, commit=True):
        profesional = super().save(commit=False)
        profesional.user = self.user
        if commit:
            profesional.save()
        return profesional

class CustomUserChangeForm(forms.ModelForm):
    username = forms.CharField(label='Usuario', widget=forms.TextInput(attrs={'class': 'auth-form__input-user'}))
    email = forms.EmailField(label='Correo Electrónico', widget=forms.EmailInput(attrs={'class': 'auth-form__input-user'}))
    first_name = forms.CharField(label='Nombre', widget=forms.TextInput(attrs={'class': 'auth-form__input-user'}))
    last_name = forms.CharField(label='Apellido', widget=forms.TextInput(attrs={'class': 'auth-form__input-user'}))

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')    
        
class CustomPasswordChangeForm(forms.Form):
    old_password = forms.CharField(label='Contraseña actual', widget=forms.PasswordInput(attrs={'class': 'auth-form__input-pass'}))
    new_password1 = forms.CharField(label='Nueva contraseña', widget=forms.PasswordInput(attrs={'class': 'auth-form__input-pass'}))
    new_password2 = forms.CharField(label='Confirmar contraseña', widget=forms.PasswordInput(attrs={'class': 'auth-form__input-pass'}))

    def clean_new_password2(self):
        new_password1 = self.cleaned_data['new_password1']
        new_password2 = self.cleaned_data['new_password2']
        if new_password1 != new_password2:
            raise forms.ValidationError('Las contraseñas no coinciden')
        return new_password2

    def save(self, commit=True):
        user = self.user
        user.set_password(self.cleaned_data['new_password1'])
        if commit:
            user.save()
        return user        