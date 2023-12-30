from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from main.models import Routine, Student, Faculty, User, Program, Department, Building, Administrator, Course
from rest_framework.authtoken.models import Token
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict
import numpy as np

# save routine
@csrf_exempt
def SaveRoutine(request):
    if request.method == "POST":
        data = json.loads(request.body)
        print(data)
        routine = data.get("routine")
        dept_code = data.get("dept_id")     # needs to be valid dept code, eg: DOCSE
        program_code = data.get("program_id")
        batch = data.get("batch")
        block_no = data.get('block_no')     # block of respective department should be passed, should be asked in frontend

    try:
        program = Program.objects.get(Code=program_code)
        dept = Department.objects.get(Code=dept_code)
        for item in routine:
            course = Course.objects.get(Code__iexact=item["course"])
            hours = item["end_time"] - item["start_time"]
            Routine.objects.create(
                DeptCode = dept,
                Program = program,
                Batch = batch,
                WeekDay = item["week_day"],
                StartTime=item["start_time"],
                EndTime=item["end_time"],
                Hour = hours,
                BlockNo = block_no,
                Course = course
            )
        return JsonResponse({'message' : 'sucess'},status=200)
    except Routine.DoesNotExist:
        return JsonResponse({'error':'routine error'}, status=400)
    except:
        return JsonResponse({'error':'Error while creating the record.'}, status=400)
    
# extract routine
@csrf_exempt
def GetRoutine(request):
    if request.method=="POST":
        data  = json.loads(request.body)
        program = data.get('program') # for faculty, they will provide program. For student, we will search for their program
        token = data.get("token")
        dept_code = data.get('dept_id') # remove later
        batch = data.get('batch') # for faculty, send from frontend : for student, they don't need to provide

    try:
        token = Token.objects.get(key=token)
        user = User.objects.get(id=token.user_id)  
        try:
            student = Student.objects.get(Email=user.email)
            if student is not None:
                program = student.ProgramCode
                routine = Routine.objects.filter(DeptCode=dept_code,Batch=batch,Program=program)
                object = list(routine)
                object = [model_to_dict(item) for item in object]
                return JsonResponse(object,safe=False)
        except:
                dept_code = Program.objects.get(Code__iexact=program).DeptCode
                routine = Routine.objects.filter(DeptCode=dept_code,Batch=batch,Program=program)
                object = list(routine)
                object = [model_to_dict(item) for item in object]
                return JsonResponse(object,safe=False)
    except: 
        return JsonResponse({'message' : 'error'},status=500)
    

# classroom allocation
@csrf_exempt
def RoutineGenerator(request):
    if request.method == "POST":
        data = json.loads(request.body)
        token = data.get('id')

    try:
        token = Token.objects.get(key=token)
        user = User.objects.get(id=token.user_id)   
        faculty_id = Faculty.objects.get(Email=user.email).Id
        user = Administrator.objects.get(Faculty=faculty_id)
        dept_code = Department.objects.get(Code=data.get('dept_id'))

        if user is not None:
            # fetching rooms in the block assigned for that department
            rooms = Building.objects.get(DeptCode=dept_code).Room
            # list of time
            time = [7,8,9,10,11,12,13,14,15]

            # list of days 
            days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"]

            # dictionary of routine for each day
            routine_of_each_day = {"Sunday":[],"Monday":[],"Tuesday":[],"Wednesday":[],"Thursday":[],"Friday":[]}

            try:
                for day in days:
                    for routine_of_day in routine_of_each_day:
                        get_value = Routine.objects.filter(DeptCode=dept_code,WeekDay=day)
                        routine_of_each_day[day] = [model_to_dict(item) for item in get_value]
                
                #actually allocating classroom
                try:
                    for day in days:
                        routine_of_given_day = routine_of_each_day[day]
                        classrooms = np.zeros((9,len(rooms)))

                        for x in range(7,16):
                            for item in routine_of_given_day:
                                if item['StartTime'] == x:
                                    hours = item['Hour']
                                    val = 1
                                    column = 0  # column refers to classroom
                                    row = x     # row refers to time

                                    while val <= hours:
                                        if classrooms[time.index(row)][column] == 0:
                                            if val == hours:
                                                Routine.objects.filter(Id=item['Id']).update(RoomNo=rooms[column])
                                                val += 1
                                                for i in range(hours):
                                                    classrooms[time.index(row-i)][column] = 1
                                            else:
                                                if classrooms[time.index(row+1)][column] == 0:
                                                    val += 1
                                                    row += 1
                                                else:
                                                    column += 1
                                                    val = 1
                                                    row = x
                                        else:
                 
                                           column += 1
                    return JsonResponse({'message':'sucess'},status=200)
                except:
                    return JsonResponse({'message':'error from third try'},status=500)
            except:
                return JsonResponse({'message':'error from second try'},status=500)

    except:
        return JsonResponse({'message':'error from first try'},status=500)

            
