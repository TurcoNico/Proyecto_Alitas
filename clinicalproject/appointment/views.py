from django.shortcuts import render
from django.views import View
from django.http import HttpResponse
from .models import Paises
from django.views.decorators.csrf import csrf_exempt


class PaisesCrud(View):
    def get(self, request):
        # Maneja la solicitud GET
        paises = Paises.objects.all()
        strPaises=""
        for pais in paises:
            print(pais.nombre_pais)
            strPaises += pais.nombre_pais + "<br>"
        return HttpResponse(strPaises)
    def post(self, request):
        newPais=Paises.objects.create(nombre_pais=request.data.get("nuevoPais"))
        
        return HttpResponse("Usuario creado con éxito")

    def put(self, request, pk):
        # Maneja la solicitud PUT
        # Actualiza un usuario existente
        return HttpResponse("Usuario actualizado con éxito")

    def delete(self, request, pk):
        # Maneja la solicitud DELETE
        # Elimina un usuario existente
        return HttpResponse("Usuario eliminado con éxito")
# Create your views here.
