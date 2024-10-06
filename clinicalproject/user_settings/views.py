from rest_framework import viewsets, status
from rest_framework.decorators import action
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from authentication.models import Profesionales
from .serializers import UserSerializer, ProfesionalSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def cambiar_contrasena(self, request):
        user = request.user
        nueva_contrasena = request.data.get('nueva_contrasena')
        if nueva_contrasena:
            user.set_password(nueva_contrasena)
            user.save()
            return Response({'detail': 'Contraseña cambiada exitosamente.'}, status=status.HTTP_200_OK)
        return Response({'detail': 'Contraseña no proporcionada.'}, status=status.HTTP_400_BAD_REQUEST)
    
class ProfesionalViewSet(viewsets.ModelViewSet):
    queryset = Profesionales.objects.all()
    serializer_class = ProfesionalSerializer    