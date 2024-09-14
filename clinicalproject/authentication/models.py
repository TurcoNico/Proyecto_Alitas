from django.db import models
from  django.contrib.auth.models import User
# Create your models here.

class Profesionales(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    codigo_identidad = models.CharField(max_length=16)
    profesion = models.CharField(max_length=100)
        