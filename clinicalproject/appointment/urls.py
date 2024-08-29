from django.urls import path
from . import views

urlpatterns = [
    path('appointment/', views.appointment_view, name='appointment'),
    path('contactos/', views.contactos_list, name='contactos_list'),
    path('contactos/new/', views.contactos_create, name='contactos_create'),
    path('contactos/edit/<int:pk>/', views.contactos_update, name='contactos_update'),
    path('contactos/delete/<int:pk>/', views.contactos_delete, name='contactos_delete'),
]