from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.models import User
from django.db import IntegrityError
from .forms import CustomAuthenticationForm, CustomUserCreationForm

def signin(request):
    if request.method == 'GET':
        return render(request, 'signin.html', {
            'form': CustomAuthenticationForm()
        })
    else:
        user = authenticate(request, username=request.POST['username'], password=request.POST['password'])
        if user is None:
            print('Usuario y/o contraseña son incorrectos')
            return render(request, 'signin.html', {
                'form': CustomAuthenticationForm(),
                'error': 'El nombre de usuario y/o contraseña son incorrectos'
            })
        else:
            print('Inicio de sesión exitoso')
            login(request, user) # Inicio de sesión, se habilita las cookies de sessionid.
            return redirect('portal')

def signup(request):
    if request.method == 'GET':
        return render(request, 'signup.html', {
            'form': CustomUserCreationForm()
        })
    else:
        if request.POST['password1'] == request.POST['password2']:
            try:
                user = User.objects.create_user(username=request.POST['username'], password=request.POST['password1'])
                user.save()
                return redirect('login')
            except IntegrityError:
                return render(request, 'signup.html', {
                    'form': CustomUserCreationForm(),
                    'error': 'El nombre de usuario ya existe'
                })
        else:
            return render(request, 'signup.html', {
                'form': CustomUserCreationForm(),
                'error': 'Las contraseñas no coinciden'
            })
