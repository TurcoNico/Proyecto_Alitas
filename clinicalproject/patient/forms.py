from django.forms.models import ModelForm, construct_instance, model_to_dict
from formset.collection import FormCollection
from .models import Domicilios, Pacientes

class DomicilioForm(ModelForm):
    class Meta:
        model = Domicilios
        fields = '__all__'
        
class PacienteForm(ModelForm):
    class Meta:
        model = Pacientes
        fields = '__all__'
        exclude = ['residencia_habitual', 'residencia_actual']
        
    def model_to_dict(self, paciente):
        try:
            # Convertir el objeto `Pacientes` a un diccionario
            paciente_data = model_to_dict(paciente, fields=self._meta.fields, exclude=self._meta.exclude)

            # Convertir los campos OneToOne (residencias) también a diccionarios
            paciente_data['residencia_habitual'] = model_to_dict(
                paciente.residencia_habitual, fields=['pais', 'provincia', 'localidad', 'calle', 'nro', 'detalle']
            )
            paciente_data['residencia_actual'] = model_to_dict(
                paciente.residencia_actual, fields=['pais', 'provincia', 'localidad', 'calle', 'nro', 'detalle']
            )

            return paciente_data
        
        except Domicilios.DoesNotExist:
            # En caso de que alguna residencia no exista
            return {}
        
    def construct_instance(self, paciente):
        # Primero manejamos la residencia habitual
        try:
            residencia_habitual = paciente.residencia_habitual
        except Domicilios.DoesNotExist:
            residencia_habitual = Domicilios()

        residencia_habitual_form = DomicilioForm(data=self.cleaned_data, instance=residencia_habitual)
        if residencia_habitual_form.is_valid():
            # Construimos la instancia sin guardarla
            construct_instance(residencia_habitual_form, residencia_habitual)
            # Guardamos la residencia habitual
            residencia_habitual_form.save()

        # Ahora manejamos la residencia actual
        try:
            residencia_actual = paciente.residencia_actual
        except Domicilios.DoesNotExist:
            residencia_actual = Domicilios()

        residencia_actual_form = DomicilioForm(data=self.cleaned_data, instance=residencia_actual)
        if residencia_actual_form.is_valid():
            # Construimos la instancia sin guardarla
            construct_instance(residencia_actual_form, residencia_actual)
            # Guardamos la residencia actual
            residencia_actual_form.save()

        # Finalmente construimos la instancia de Pacientes con los datos del formulario
        return construct_instance(self, paciente)
    
class PacienteCollection(FormCollection):
    paciente = PacienteForm()
    domicilio_habitual = DomicilioForm()
    domicilio_actual = DomicilioForm()