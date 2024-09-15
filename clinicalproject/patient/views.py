from django.shortcuts import render
from django.views.generic import TemplateView

class Patient(TemplateView):
    template_name = 'patient/patient.html'