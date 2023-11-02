from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from main.models import Course,Classroom,Faculty,Student
from django.http import JsonResponse
from django.db.models import F
import json,secrets,string

def generate_random_code(length=6):
    characters = string.ascii_letters + string.digits  # Alphanumeric characters
    code = ''.join(secrets.choice(characters) for _ in range(length))
    return code

def generate_unique_code():
    while True:
        code = generate_random_code()   
        # Check if the code is unique in the database
        if not Classroom.objects.filter(ClassroomCode=code).exists():
            return code


# create classroom
@csrf_exempt
def CreateClassroom(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        key = data.get('token')
        CourseCode = data.get('course_code')
    
    try:
        token = Token.objects.get(key=key)
        user = User.objects.get(id=token.user_id)   
        instructor = Faculty.objects.get(Email=user.email)
        course = Course.objects.get(Code__iexact=CourseCode)
        code = generate_unique_code()
        classroom = Classroom.objects.create(InstructorName=user.first_name+" "+user.last_name,
                                CourseCode=course,
                                CourseName=course.Name,
                                FacultyId=instructor,
                                ClassroomCode=code)
        instructor.ClassroomId.append(classroom.Id)
        instructor.save()
        return JsonResponse({"message" : "success"},status=200)
    except Exception as e:
        print(e)
        return JsonResponse({"message" : "not success"},status=500)
    

# join classroom
@csrf_exempt
def JoinClassroom(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        token = data.get('token')
        classroom_code = data.get('code')

        try:
            token = Token.objects.get(key=token)
            user = User.objects.get(id=token.user_id)
            student = Student.objects.get(Email=user.email)
            classroom = Classroom.objects.get(ClassroomCode=classroom_code)
            # Classroom.objects.filter(ClassroomCode=classroom_code).update(StudentId=F('StudentId')+student.Id)
            if student.Id in classroom.StudentId:
                return JsonResponse({'message':"Already enrolled"},status=401)
            
            else:
                classroom.StudentId.append(student.Id)
                student.ClassroomId.append(classroom.Id)
                classroom.save()
                student.save()
                return JsonResponse({'message':"Sucess"},status=200)
        except Exception as e:
            print(e)
            return JsonResponse({'message':"Can not delete classroom"},status=500)

# to delete classroom
@csrf_exempt
def DeleteClassroom(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        token = data.get('token')
        classroom_code = data.get('code')

        try:
            token = Token.objects.get(key=token)
            user = User.objects.get(id=token.user_id)   
            instructor = Faculty.objects.get(Email=user.email)
            classroom = Classroom.objects.get(ClassroomCode=classroom_code,FacultyId=instructor.Id)
            # Classroom.objects.filter(ClassroomCode=classroom_code,FacultyId=instructor.Id).delete()
            id = classroom.Id
            students = Student.objects.filter(ClassroomId__contains=[id])

            # removing classroom
            classroom.delete()

            # removing classroom from faculty ClassroomId
            instructor.ClassroomId.remove(id)

            # removing classroom from student ClassroomId
            for student in students:
                student.ClassroomId.remove(id)
                student.save()
            instructor.save()
            classroom.save()
            
            return JsonResponse({'message':"Sucess"},status=200)
        except Exception as e:
            print(e)
            return JsonResponse({'message':"Can not delete classroom"},status=500)