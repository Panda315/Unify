from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from .models import Routine, Student, Faculty, Token, User, Program, Department,Routine, Building, Administrator
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
        routine = data.get("routine")
        dept_code = data.get("dept_id")     # needs to be valid dept code, eg: DOCSE
        program_code = data.get("program_id")
        batch = data.get("batch")
        block_no = data.get('block_no')     # block of respective department should be passed, should be asked in frontend
        week_day = data.get('week_day')
        course = data.get('course') # course needs to be correct, it should be provided in option in frontend. Eg: COMP 342

    try:
        for item in routine:
            hours = item['end_time'] - item['start_time']
            Routine.objects.create(
                DeptCode = item[dept_code],
                Program = item[program_code],
                Batch = item[batch],
                WeekDay = item[week_day],
                StartTime=item["start_time"],
                EndTime=item["end_time"],
                Hour = item[hours],
                BlockNo = item[block_no],
                Course = item[course]
            )

            return JsonResponse({'message' : 'sucess'},status=200)
    
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
        student = Student.objects.get(Email=user.email)

        if student is not None:
            # batch = student.batch
            program = student.Program
            routine = Routine.objects.filter(DeptCode=dept_code,Batch=batch,Program=program)
            object = list(routine)
            object = [model_to_dict(item) for item in object]
            return JsonResponse(object,safe=False)
        
        else:
            faculty = Faculty.objects.get(Email=user.email)
            if faculty is not None:
                dept_code = Program.objects.get(Code=program).DeptCode
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
        dept_code = data.get('dept_id')
        token = data.get('id')
        program = data.get('program') # needs to be valid program code eg: CS

    try:
        token = Token.objects.get(key=token)
        user = User.objects.get(id=token.user_id)   
        faculty_id = Faculty.objects.get(Email=user.email).id
        user = Administrator.objects.get(Faculty=faculty_id)

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
                                                Routine.objects.filter(Id=item['id']).update(RoomNo=rooms[column])
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
                except:
                    return JsonResponse({'message':'error from third try'})
            except:
                return JsonResponse({'message':'error from second try'},status=500)

    except:
        return JsonResponse({'message':'error from first try'},status=500)

            
