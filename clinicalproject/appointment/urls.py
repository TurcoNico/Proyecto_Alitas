from django.urls import path
from . import views

urlpatterns = [
    path('countries/', views.PaisesCrud.as_view(), name='Countries'),
]