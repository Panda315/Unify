from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.http import JsonResponse
#from .models import Student, Faculty
import json

# Create your views here.
@csrf_exempt
def AddStudent(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        print(data)
        print(email)
        return JsonResponse({'message':"checking"},status=200)