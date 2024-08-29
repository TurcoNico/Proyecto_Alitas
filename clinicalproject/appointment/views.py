from django.shortcuts import render

def appointment_view(request):
    return render(request, 'appointment.html')