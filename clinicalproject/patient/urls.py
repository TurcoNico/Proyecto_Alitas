from django.urls import path
from .views import Patient

urlpatterns = [
    path('', Patient.as_view(), name='patient'),
]