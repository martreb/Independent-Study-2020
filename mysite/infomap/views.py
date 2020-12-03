from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def index(request):
    return render(request, 'infomap/index.html')

def worker(request):
    return render(request, "infomap/worker.js", content_type='application/javascript')