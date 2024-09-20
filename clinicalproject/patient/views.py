from formset.views import FormCollectionView, FormView
from .models import Domicilios, Pacientes
from .forms import PacienteCollection
# Test
from django.views.generic import CreateView
from .forms import DomicilioForm
from django.urls import reverse_lazy

class PatientCollectionView(FormCollectionView):
    model = Pacientes
    collection_class = PacienteCollection
    template_name = 'patient/patient.html'
    
#Funcional    
class Patient(FormView):
    form_class = DomicilioForm
    template_name = 'patient/patient.html'
    
    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        # Puedes añadir cualquier información extra aquí
        return kwargs

    def form_valid(self, form):
        # Maneja la validación del formulario aquí
        return super().form_valid(form)
    
    