from django.shortcuts import render

from django.shortcuts import render
from main.models import Routine, Student, Faculty, User, Program, Department, Building, Administrator, Course
from rest_framework.authtoken.models import Token
from django.utils.dateparse import parse_time
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.forms.models import model_to_dict
from django.db.models import Q
from datetime import datetime
import numpy as np
from main.models import Room, Program, Course, Routine

times = [
        '7:00 AM',
        '8:00 AM',
        '9:00 AM',
        '10:00 AM',
        '11:00 AM',
        '12:00 PM',
        '1:00 PM',
        '2:00 PM',
        '3:00 PM',
        '4:00 PM'
    ]

def get_room_ids(request):
    room_ids = Room.objects.values_list('Id', flat=True)

    room_ids_list = list(room_ids)

    return JsonResponse({'room_ids': room_ids_list}, safe=False)

def get_programs(request):
    program_names = Program.objects.values_list('Name', flat=True)
    program_names_list = list(program_names)

    return JsonResponse({'programs': program_names_list}, safe=False)

@csrf_exempt
def get_course_codes(request):
    if request.method == "POST":
        data = json.loads(request.body)
        program_name = data.get("program_name")

    try:
        program = Program.objects.get(Name=program_name)
        department = program.DeptCode
        courses = Course.objects.filter(DeptCode=department)
        course_codes = list(courses.values_list('Code', flat=True))
        return JsonResponse({'courses': course_codes}, safe=False)
    except Program.DoesNotExist:
        return JsonResponse({'Error:' 'Department not found'}, status=404)

# save routine
@csrf_exempt
def save_routine(request):
    if request.method == "POST":
        data = json.loads(request.body)
        program_name = data['program']
        program = Program.objects.get(Name=program_name)
        deptCode = program.DeptCode
        batch = int(data['batch'])
        week_day = data['routine']['week_day']
        start_time = data['routine']['start_time']  # Assuming start_time is in '7:00 AM' format
        end_time = data['routine']['end_time']  # Assuming end_time is in '12:00 PM' format
        room_no = data['routine']['room_no']
        course_name = data['routine']['course']
        course = Course.objects.get(Code=course_name)

        existing_classes = Routine.objects.filter(RoomNo=int(room_no), WeekDay=week_day)

        for existing_class in existing_classes:
            if start_time < times.index(existing_class.EndTime) + 7 and end_time > times.index(existing_class.StartTime) + 7:
                return JsonResponse({'error': "Can't create class"}, status=400)

        try:
            Routine.objects.create(
                DeptCode=deptCode,
                Program=program,
                Batch=batch,
                WeekDay=week_day,
                StartTime=times[start_time - 7],
                EndTime=times[end_time - 7],
                RoomNo=room_no,
                Course=course
            )

            return JsonResponse({'message': 'success'}, status=200)
        except Exception as e:
            return JsonResponse({'error': f'Error while creating the record: {e}'}, status=400)

# extract routine
@csrf_exempt
def get_routine(request):
    if request.method=="POST":
        data  = json.loads(request.body)
        program = data.get('program') # for faculty, they will provide program. For student, we will search for their program
        token = data.get("token")
        # dept_code = data.get('dept_id') # remove later
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
                program_obj = Program.objects.get(Name=program)
                dept_code = Program.objects.get(Name=program).DeptCode
                routine = Routine.objects.filter(DeptCode=dept_code,Batch=batch,Program=program_obj)
                object = list(routine)
                object = [model_to_dict(item) for item in object]
                return JsonResponse(object,safe=False)
    except: 
        return JsonResponse({'message' : 'error'},status=500)

@csrf_exempt
def get_allocations_by_room(request):
    if request.method == "POST":
        data = json.loads(request.body)
        room_no = data['room_no']

        try:
            routine = Routine.objects.filter(RoomNo=int(room_no))
            routine_dict = [model_to_dict(item) for item in list(routine)]
            return JsonResponse(routine_dict, safe=False)
        except:
            return JsonResponse({'message': 'error'}, status=500)

@csrf_exempt
def update_routine(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            routine_data = data.get('routine')

            if routine_data:
                routine_id = routine_data.get('routine_id')
                course_name = routine_data.get('course')
                start_time = routine_data.get('start_time')
                end_time = routine_data.get('end_time')
                room_no = routine_data.get('room_no')

                routine_obj = Routine.objects.get(Id=routine_id)

                if routine_obj:
                    # Fetch the Course object by its Name
                    course_obj = Course.objects.get(Code=course_name)
                    
                    # Update the routine fields
                    routine_obj.Course = course_obj
                    routine_obj.StartTime = times[start_time - 7]
                    routine_obj.EndTime = times[end_time - 7]
                    routine_obj.RoomNo = int(room_no)
                    routine_obj.save()
                    

                    return JsonResponse({'message': 'Routine updated successfully'}, status=200)
                else:
                    return JsonResponse({'error': 'Routine not found'}, status=404)
            else:
                return JsonResponse({'error': 'Routine data not provided'}, status=400)

        except Routine.DoesNotExist:
            return JsonResponse({'error': 'Routine does not exist'}, status=404)
        except Course.DoesNotExist:
            return JsonResponse({'error': 'Course does not exist'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def delete_routine(request):
    if request.method == "DELETE":
        data = json.loads(request.body)
        program_name = data['program']
        program = Program.objects.get(Name=program_name)
        deptCode = program.DeptCode
        batch = int(data['batch'])
        week_day = data['routine']['week_day']
        start_time = times[data['routine']['start_time'] - 7]
        end_time = times[data['routine']['end_time'] - 7]
        room_no = data['routine']['room_no']
        course_name = data['routine']['course']
        course = Course.objects.get(Code=course_name)

        try:
            Routine.objects.filter(
                DeptCode = deptCode,
                Program = program,
                Batch = batch,
                WeekDay = week_day,
                StartTime= start_time,
                EndTime= end_time,
                # Hour = hours,
                # BlockNo = block_no,
                RoomNo = room_no,
                Course = course
            ).delete()

            return JsonResponse({'message': 'success'}, status=200)
        except Routine.DoesNotExist:
            return JsonResponse({'error':'routine error'}, status=400)
        except:
            return JsonResponse({'error':'Error while deleting the record.'}, status=400)

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

            
