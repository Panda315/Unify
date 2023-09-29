# backend/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_data, name='get_data'),
]
