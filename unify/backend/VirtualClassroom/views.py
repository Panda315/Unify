from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from main.models import Course,Classroom,Faculty,Student,ClassroomCompressedFile,ClassroomContent
from django.http import JsonResponse
import json,secrets,string


# to generate random code for classroom
def generate_random_code(length=6):
    characters = string.ascii_letters + string.digits  # Alphanumeric characters
    code = ''.join(secrets.choice(characters) for _ in range(length))
    return code

# to check whether the code exists or not already
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
        

# fetch classroom for students
@csrf_exempt
def LoadClassrooms(request):
    data = json.loads(request.body)
    token = data.get('token')
    role = data.get('role')
    token = Token.objects.get(key=token)
    user = User.objects.get(id=token.user_id)
            
    try:
        if role == "student":
            student = Student.objects.get(Email=user.email)
            classrooms = Classroom.objects.filter(Id__in=student.ClassroomId)
            classroom_data = classrooms.values('Id','ClassroomCode','CourseName','CourseCode','InstructorName')
            response = list(classroom_data)
            return JsonResponse(response,safe=False,status=200)
        else:
            instructor = Faculty.objects.get(Email=user.email)
            classrooms = Classroom.objects.filter(Id__in=instructor.ClassroomId)
            classroom_data = classrooms.values('Id','ClassroomCode','CourseName','CourseCode','InstructorName')
            response = list(classroom_data)
            return JsonResponse(response,safe=False,status=200)
    except Exception as e:
        return JsonResponse({'message':'not sucess'},status=500)

# save pdfs(for assignments)
@csrf_exempt
def UploadFile(request):
    if request.method == 'POST':
        print(request.body.formData)
        data = json.loads(request.body)
        file_path = data.get('file')
        # file_path = file_path
        print(file_path)

        if file_path:
            with open(file_path, 'rb') as file:
                binary_data = file.read()

            # creating a new instance and storing the binary data in the database
            ClassroomCompressedFile.objects.create(uploaded_file=binary_data)
            return JsonResponse({'message':'success'},status=200)
        
        else:
            return JsonResponse({'message':'file not uploaded'},status=500)
        
    return JsonResponse({'error': 'Invalid request method.'}, status=400)
    

# load assignment
# leave classroom
@csrf_exempt
def LeaveClassroom(request):
    if request.method == "POST":
        data = json.loads(request.body)
        token = data['token']
        classroom_id = data["classroom_id"]

    try:
        token = Token.objects.get(key=token)
        user = User.objects.get(id=token.user_id)
        student = Student.objects.get(Email=user.email)

        if student is not None:
            # removing from student from the classroom
            classroom = Classroom.objects.get(Id=classroom_id)
            classroom.StudentId.remove(student.Id)
            classroom.save()

            # removing the classroom from classroom array
            student.ClassroomId.remove(classroom_id)
            student.save()

            # removing the contents having the student in that particular class
            classroom_content = ClassroomContent.objects.filter(ClassroomId=classroom_id,Sender=student.Id)
            classroom_content.delete()

            return JsonResponse({'message':'Sucess'},status=200)
    except:
        return JsonResponse({'message':'Error'},status=500)