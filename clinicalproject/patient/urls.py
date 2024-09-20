from django.urls import path
from .views import PatientCollectionView, Patient

urlpatterns = [
    path('', Patient.as_view(), name='patient'),
]