from django.shortcuts import render, get_object_or_404, redirect
from .models import Contactos
from .forms import ContactosForm

def appointment_view(request):
    return render(request, 'appointment.html')

def contactos_list(request):
    contactos = Contactos.objects.all()
    return render(request, 'contactos_list.html', {'contactos': contactos})

def contactos_create(request):
    if request.method == 'POST':
        form = ContactosForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('contactos_list')
    else:
        form = ContactosForm()
    return render(request, 'contactos_form.html', {'form': form})

def contactos_update(request, pk):
    contacto = get_object_or_404(Contactos, pk=pk)
    if request.method == 'POST':
        form = ContactosForm(request.POST, instance=contacto)
        if form.is_valid():
            form.save()
            return redirect('contactos_list')
    else:
        form = ContactosForm(instance=contacto)
    return render(request, 'contactos_form.html', {'form': form})

def contactos_delete(request, pk):
    contacto = get_object_or_404(Contactos, pk=pk)
    if request.method == 'POST':
        contacto.delete()
        return redirect('contactos_list')
    return render(request, 'contactos_confirm_delete.html', {'contacto': contacto})