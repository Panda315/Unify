from django.contrib.auth import login,authenticate,logout
from django.core import serializers
from rest_framework.authtoken.models import Token
from django.shortcuts import render,redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt,csrf_protect
import json

@csrf_exempt
# @csrf_protect
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        user = authenticate(request,email=email,password=password)
        if user is not None:
            login(request,user)
            token, _ = Token.objects.get_or_create(user=user)
            print(user.first_name + user.last_name)
            return JsonResponse({"token": str(token),"first_name":str(user.first_name),"last_name":str(user.last_name)}, status= 200 if(user.profile.is_student) else 201)
            
        else:
            return JsonResponse({"error":"Invalid Credentials"},status=401)

    return render(request,'../frontend/src/components/login.jsx')
        

@csrf_exempt
def logout_view(request):
    logout(request)
    return JsonResponse({"message" : "Logged Out"},status=200)


