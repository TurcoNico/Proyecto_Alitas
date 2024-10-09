from rest_framework import viewsets, status
from rest_framework.decorators import action, permission_classes
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from authentication.models import Profesionales
from .serializers import UserSerializer, ProfesionalSerializer
from django.contrib.auth.hashers import make_password
from django.shortcuts import render

class PasswordChangeViewSet(viewsets.ViewSet):
    permission_classes=[IsAuthenticated]
    
    def list(self, request):
        # Dummy para que funcione xD
        return Response([])
    
    def put(self, request):
        user = request.user  # Obtiene el usuario logeado
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')

        if not user.check_password(old_password):
            return Response({'error': 'Invalid old password'}, status=status.HTTP_400_BAD_REQUEST)

        if new_password != confirm_password:
            return Response({'error': 'New password and confirm password do not match'}, status=status.HTTP_400_BAD_REQUEST)

        user.password = make_password(new_password)
        user.save()
        return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @permission_classes([IsAuthenticated])
    def list(self, request, *args, **kwargs):
        if request.user.is_staff:
            # Devuelve todo si es administrador
            return super().list(request, *args, **kwargs)
        else:
            # Devuelve el usuario si no es administrador
            return Response(UserSerializer(request.user).data)

    @permission_classes([IsAuthenticated])
    def create(self, request, *args, **kwargs):
        if request.user.is_staff:
            return super().create(request, *args, **kwargs)
        
    @permission_classes([IsAuthenticated])
    def destroy(self, request, *args, **kwargs):
        if request.user.is_staff:
            return super().destroy(request, *args, **kwargs)
        else:
            return Response({'error': 'You do not have permission to delete this user'}, status=status.HTTP_403_FORBIDDEN)
    


class ProfesionalViewSet(viewsets.ModelViewSet):
    queryset = Profesionales.objects.all()
    serializer_class = ProfesionalSerializer  

    @permission_classes([IsAuthenticated])  # Decorador de autenticacion
    def list(self, request, *args, **kwargs):
        if request.user.is_staff:
            return super().list(request, *args, **kwargs)
        else:
            return Response(ProfesionalSerializer(request.user).data)

    @permission_classes([IsAuthenticated])
    def create(self, request, *args, **kwargs):
        if request.user.is_staff:
            return super().create(request, *args, **kwargs)
        
    @permission_classes([IsAuthenticated])
    def destroy(self, request, *args, **kwargs):
        if request.user.is_staff:
            # Solo Permisos de administrador
            return super().destroy(request, *args, **kwargs)
        else:
            return Response({'error': 'You do not have permission to delete this profesional'}, status=status.HTTP_403_FORBIDDEN)    

def indexSettings(request):
    return render(request, 'user_settings/user_settings.html')