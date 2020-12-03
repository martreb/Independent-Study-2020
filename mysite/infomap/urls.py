from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),

    # need to include service worker for url rendering
    path('worker.js', views.worker, name='worker.js'),

    # path('service-worker.js', views.service_worker, name='service-worker.js')


] 