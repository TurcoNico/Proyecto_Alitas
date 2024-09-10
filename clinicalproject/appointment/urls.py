from django.urls import path
from . import views

urlpatterns = [
    path('', views.PacienteTurnoView.as_view(), name='create_pacient_appointment'),
]