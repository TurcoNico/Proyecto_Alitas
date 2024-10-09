from django import forms
from django.contrib.auth.models import User
from authentication.models import Profesionales

class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')

class ProfesionalForm(forms.ModelForm):
    class Meta:
        model = Profesionales
        fields = '__all__'

class PasswordChangeForm(forms.Form):
    old_password = forms.CharField(widget=forms.PasswordInput)
    new_password = forms.CharField(widget=forms.PasswordInput)
    confirm_password = forms.CharField(widget=forms.PasswordInput)