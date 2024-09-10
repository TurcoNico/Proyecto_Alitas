from django.views.generic import TemplateView
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from .forms import PacienteForm, TurnoForm

class PacienteTurnoView(TemplateView):
    template_name = 'appointment/appointment.html'

    def get(self, request, *args, **kwargs):
        paciente_form = PacienteForm()
        turno_form = TurnoForm()
        return self.render_to_response({
            'paciente_form': paciente_form,
            'turno_form': turno_form
        })

    def post(self, request, *args, **kwargs):
        if 'submit_paciente' in request.POST:
            paciente_form = PacienteForm(request.POST)
            turno_form = TurnoForm()  # Formulario vacío en este caso

            if paciente_form.is_valid():
                paciente_form.save()
                return redirect(reverse_lazy('nombre_del_redirect'))
        elif 'submit_turno' in request.POST:
            paciente_form = PacienteForm()  # Formulario vacío en este caso
            turno_form = TurnoForm(request.POST)

            if turno_form.is_valid():
                turno_form.save()
                return redirect(reverse_lazy('nombre_del_redirect'))

        # Si hay errores en los formularios
        return self.render_to_response({
            'paciente_form': paciente_form,
            'turno_form': turno_form
        })