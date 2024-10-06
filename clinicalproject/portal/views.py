from authentication.models import Profesionales    
from django.contrib.auth.decorators import login_required
from django.shortcuts import render

@login_required
def portal(request):
    user = request.user
    full_name = f"{user.first_name} {user.last_name}"
    
    # Obtener el objeto Profesionales relacionado con el usuario actual
    try:
        profesional = Profesionales.objects.get(user=user)
        profesion = profesional.profesion
    except Profesionales.DoesNotExist:
        if user.is_superuser:
            profesion = 'Administrador'
        else:
            profesion = 'No Especificado' 
    # Puedes añadir 'profesional' al contexto si necesitas usarlo en la plantilla
    context = {"full_name": full_name, "profesional": profesion}
    print(context)
    
    return render(request, 'portal/portal.html', context)