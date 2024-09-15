from django.urls import path
from .views import Appointment

urlpatterns = [
    path('', Appointment.as_view(), name='appointment'),
]