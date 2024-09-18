from django.urls import reverse_lazy
from django.views.generic import CreateView
from .models import Domicilios
from .forms import DomicilioForm

class Patient(CreateView):
    model = Domicilios
    form_class = DomicilioForm
    template_name = 'patient/patient.html'
    success_url = reverse_lazy('patient')  # Cambia por la URL de éxito que prefieras

    def form_valid(self, form):
        # Aquí puedes agregar lógica adicional si es necesario
        return super().form_valid(form)