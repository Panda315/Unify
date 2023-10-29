from django.contrib.auth import login,authenticate,logout
from django.contrib.auth.models import User
from django.core import serializers
from rest_framework.authtoken.models import Token
from django.shortcuts import render,redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        user = authenticate(request,email=email,password=password)
        if user is not None:
            login(request,user)
            token, _ = Token.objects.get_or_create(user=user)
            if user.profile.is_student:
                return JsonResponse({"token": str(token)}, status=200)
            elif user.profile.is_faculty:
                return JsonResponse({"token": str(token)},status=201)
            
        else:
            return JsonResponse({"error":"Invalid Credentials"},status=401)
            pass

    return render(request,'../frontend/src/components/login.jsx')
        

@csrf_exempt
def logout_view(request):
    logout(request)
    return redirect('login')