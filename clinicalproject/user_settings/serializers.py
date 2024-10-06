from rest_framework import serializers
from django.contrib.auth.models import User
from authentication.models import Profesionales
from django.contrib.auth import update_session_auth_hash
import re

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = '__all__'


class ProfesionalSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # Incluye los detalles del usuario

    class Meta:
        model = Profesionales
        fields = ['user', 'codigo_identidad', 'profesion']
