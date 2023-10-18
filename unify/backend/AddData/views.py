from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password,check_password
from django.core import serializers
from django.http import JsonResponse
from main.models import Student, Faculty, Event, School
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
    

# save events
@csrf_exempt
def Events(request):
    if request.method == "POST":
        data = json.loads(request.body)
        title = data.get('title')
        description = data.get('description')
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        category = data.get('category')

        if category != "KU":
            refid = data.get('refid')
            try:
                Event.objects.create(Title=title,Description=description,StartDate=start_date,EndDate=end_date,Category=category,RefId=refid)
                return JsonResponse({'message':'sucessful'},status=200)
            except:
                return JsonResponse({'message':'Error'},status=500)
        
        else:
            try:
                Event.objects.create(Title=title,Description=description,StartDate=start_date,EndDate=end_date,Category=category)
                return JsonResponse({'message':'sucessful'},status=200)
            except:
                return JsonResponse({'message':'Error'},status=500)

    
# save students
@csrf_exempt
def AddStudents(request):
    if request.method == 'POST':
        print("Hello World !!!!!")
        data = json.loads(request.body)
        firstname = data.get('firstname')
        lastname = data.get('lastname')
        dob = data.get('dob')
        email = data.get('email')
        password = make_password(data.get('password'))
        dept_id = data.get('dept')

    try:
        Student.objects.create(FirstName=firstname,LastName=lastname,DOB=dob,Email=email,Password=password,DeptId=dept_id)
        return JsonResponse({'message':'sucessful'},status=200)
    except:
        return JsonResponse({'message':'Error'},status=500)
    
# save school
@csrf_exempt
def AddSchool(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        code = data.get('code')
        name = data.get('name')

    try:
        School.objects.create(Code=code,Name=name)
        return JsonResponse({'message':'sucessful'},status=200)
    except:
        return JsonResponse({'message':'Error'},status=500)