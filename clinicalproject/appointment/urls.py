from django.urls import path
from . import views

urlpatterns = [
    path('appointment/', views.appointment_view, name='appointment'),
]