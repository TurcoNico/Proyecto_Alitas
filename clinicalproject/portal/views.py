from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required
def portal(request):
    return render(request, 'portal.html')