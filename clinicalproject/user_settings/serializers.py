from rest_framework import serializers
from django.contrib.auth.models import User
from authentication.models import Profesionales
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id','username','first_name','last_name','email','is_staff','password']
    
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            is_staff=validated_data['is_staff'],
            password=make_password(validated_data['password'])
        )
        return user

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.is_staff = validated_data.get('is_staff', instance.is_staff)
        if 'password' in validated_data:
            instance.password = make_password(validated_data['password'])
        instance.save()
        return instance

    def destroy(self, instance):
        instance.delete()
        return instance


class ProfesionalSerializer(serializers.ModelSerializer):
    user = UserSerializer()  

    class Meta:
        model = Profesionales
        fields = ['user', 'codigo_identidad', 'profesion']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_serializer = UserSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        profesional = Profesionales.objects.create(user=user, **validated_data)
        return profesional

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            user_serializer = UserSerializer(instance.user, data=user_data)
            user_serializer.is_valid(raise_exception=True)
            user_serializer.save()
        instance.codigo_identidad = validated_data.get('codigo_identidad', instance.codigo_identidad)
        instance.profesion = validated_data.get('profesion', instance.profesion)
        instance.save()
        return instance

    def destroy(self, instance):
        instance.delete()
        return instance    
