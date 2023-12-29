from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password,check_password
from django.core import serializers
from django.http import JsonResponse
from main.models import Student, Faculty, Event, School,Department, Course, Program, Building
import json

# Create your views here.
@csrf_exempt
def AddFaculty(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        id = data.get('id')
        firstname = data.get('firstname')
        lastname = data.get('lastname')
        dob = data.get('dob')
        email = data.get('email')
        password = make_password(data.get('password'))
        dept_id = data.get('dept')

    try:
        dept_instance = Department.objects.get(Code=dept_id)
        Faculty.objects.create(Id=id,FirstName=firstname,LastName=lastname,Dob=dob,Email=email,Password=password,DeptCode=dept_instance)
        return JsonResponse({'message':'sucessful'},status=200)
    except Exception as e:
        print(e)
        return JsonResponse({'message':'Error'},status=500)
    

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
def AddStudent(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        id = data.get('id')
        firstname = data.get('firstname')
        lastname = data.get('lastname')
        dob = data.get('dob')
        email = data.get('email')
        password = make_password(data.get('password'))
        dept_id = data.get('dept')
        batch = data.get('batch')
        program = data.get('program')

    try:
        dept_instance = Department.objects.get(Code=dept_id)
        program = Program.objects.get(Code__iexact=program)
        Student.objects.create(Id=id,FirstName=firstname,LastName=lastname,Dob=dob,Email=email,Password=password,DeptCode=dept_instance,Batch=batch,ProgramCode=program)
        return JsonResponse({'message':'sucessful'},status=200)
    except Exception as e:
        print(e)
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
    
# save department
@csrf_exempt
def AddDepartment(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        code = data.get('code')
        name = data.get('name')
        school_code = data.get('school_code')

    try:
        school_instance = School.objects.get(Code=school_code)
        Department.objects.create(Code=code,Name=name,SchoolCode=school_instance)
        return JsonResponse({'message':'sucessful'},status=200)
    except Exception as e:
        print(e)
        return JsonResponse({'message':'Error'},status=500)

# save course
@csrf_exempt
def AddCourse(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        code = data.get('code')
        name = data.get('name')
        credit_hour = data.get('credit_hour')
        description = data.get('description')
        dept_code = data.get('dept_code')

    try:
        Course.objects.create(Code=code,Name=name,CreditHour=credit_hour,Description=description,DeptCode=dept_code)
        return JsonResponse({'message':'sucessful'},status=200)
    except:
        return JsonResponse({'message':'Error'},status=500)
    

# save program
@csrf_exempt
def AddProgram(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        code = data.get('code')
        capacity = data.get('capacity')
        name = data.get('name')
        dept_code = data.get('dept_code')
        schoolcode = data.get('school_code')

    try:
        schoolcode = School.objects.get(Code=schoolcode)
        dept_code = Department.objects.get(Code=dept_code)
        Program.objects.create(Code=code,Name=name,Capacity=capacity,DeptCode=dept_code,SchoolCode=schoolcode)
        return JsonResponse({'message':'sucessful'},status=200)
    except:
        return JsonResponse({'message':'Error'},status=500)
    

@csrf_exempt
def addBuilding(request):
    if request.method == "POST":
        data = json.loads(request.body)
        block_code = data.get('block_code')
        room = data.get('room')
        block_code = Department.objects.get(Code=block_code)
        Building.objects.create(DeptCode=block_code,Room=room)
        return JsonResponse({'message':'ok'},status=200)