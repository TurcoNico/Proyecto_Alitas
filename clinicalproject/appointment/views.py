from django.shortcuts import render
from django.views.generic import TemplateView

class Appointment(TemplateView):
    template_name = 'appointment/appointment.html'