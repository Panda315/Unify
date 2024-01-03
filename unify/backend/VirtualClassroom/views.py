from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from main.models import Course,Classroom,Faculty,Student,ClassroomCompressedFile,ClassroomContent
from django.http import JsonResponse,HttpResponse
import json,secrets,string
import base64
from django.core.serializers.json import DjangoJSONEncoder

# to send pdf to frontend
def get_base64_encoded_pdf(file_data):
    return base64.b64encode(file_data).decode('utf-8')

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
        return JsonResponse({"message" : "success","joiningCode":code},status=200)
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
                classroom.save()
                student.ClassroomId.append(classroom.Id)
                student.save()
                return JsonResponse({'message':"Sucess"},status=200)
        except Exception as e:
            print(e)
            return JsonResponse({'message':"Can not join classroom"},status=500)

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

# to remove the content
# save pdfs(for assignments)
@csrf_exempt
def UploadFile(request):
    if request.method == 'POST':
        token = request.POST.get('token')
        classroom_id = request.POST.get('classroom_id')
        description = request.POST.get('description')
        isHead = request.POST.get('is_head') == "true"   # frontend bata sir le assignment question/ notice submission ho bhane true bhanera pathaunu, esko lagi frontend ma add notice bhanera halne ani tyo notice ko beklai upload function banaune
        role = request.POST.get("role")
        head = request.POST.get('head')         # principle notice ko classroom_content ko id
        file = request.FILES.get('file')
        
    try:
        token = Token.objects.get(key=token)
        user = User.objects.get(id=token.user_id)

        binary_data = file.read()
        # creating a new instance and storing the binary data in the database
        id = ClassroomCompressedFile.objects.create(uploaded_file=binary_data).id

        if role == "student":
            student = Student.objects.get(Email=user.email)
            try:
                has_previous_submission = ClassroomContent.objects.get(Sender=student.Id,Head=head)
                has_previous_submission.ObjectKey.append(id)
                has_previous_submission.save()

                classroom_content = ClassroomContent.objects.get(Id=head)
                classroom_content.UploadedFiles.append(id)
                classroom_content.save()
                JsonResponse({'message':'success'},status=200)

            except:
                classroom_id = Classroom.objects.get(Id=classroom_id)
                ClassroomContent.objects.create(ObjectKey=[id],ClassroomId=classroom_id,Sender=student.Id,IsHead=False,Head=head,Description=description)
                classroom_content = ClassroomContent.objects.get(Id=head)
                classroom_content.UploadedFiles.append(id)
                classroom_content.save()
                return JsonResponse({'message':'success'},status=200)
            
        else:
            faculty = Faculty.objects.get(Email=user.email)
            if isHead:
                classroom_id = Classroom.objects.get(Id=classroom_id)
                classroom_content = ClassroomContent.objects.create(
                    ObjectKey=[id],
                    ClassroomId=classroom_id,
                    Sender=faculty.Id,
                    IsHead=True,
                    Head=0,
                    Description=description
                )

                classroom_content.Head = classroom_content.Id
                classroom_content.save()

            else:
                # send isHead false if question post garda if first pdf bahek aru pdf edit garera haldai cha bhane
                try:
                    has_previous_submission = ClassroomContent.objects.get(Sender=faculty.Id,Head=head,IsHead=True)
                    has_previous_submission.ObjectKey.append(id)
                    has_previous_submission.save()
                    return JsonResponse({'message':'success'},status=200) 
                except:
                    return JsonResponse({'message':'error from faculty.isHead else block'},status=500)
            return JsonResponse({'message':'success'},status=200)
            
    except:
        return JsonResponse({'error': 'Invalid request method.'}, status=400)
    

# load assignment
@csrf_exempt
def DownloadCompressedFile(request):
    if request.method == "POST":
        data = json.loads(request.body)
        classroom_id = data.get('id')
        token = data.get('token')
        token = Token.objects.get(key=token)

    try:
        if token is not None:
            classroom = Classroom.objects.get(Id=classroom_id)
            contents = ClassroomContent.objects.filter(ClassroomId=classroom,IsHead=True)
            compressed_files = []
            multiple_to_single_file = []

            for content in contents:
                for id in content.ObjectKey:
                    file = ClassroomCompressedFile.objects.get(id=id)
                    file_data={
                        'id' : file.id,
                        'uploaded_file' :  get_base64_encoded_pdf(file.uploaded_file),
                        'uploaded_at' : file.uploaded_at
                    }
                    multiple_to_single_file.append(file_data)
            
                compressed_files.append(multiple_to_single_file)
            return JsonResponse(compressed_files,safe=False,encoder=DjangoJSONEncoder)
    except:
        return JsonResponse({'message':'error'},status=500)


# leave classroom
@csrf_exempt
def LeaveClassroom(request):
    if request.method == "POST":
        data = json.loads(request.body)
        token = data['token']
        classroom_id = data.get("classroom_id")

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
            student.ClassroomId.remove(classroom.Id)
            student.save()

            # removing the contents having the student in that particular class
            classroom_content = ClassroomContent.objects.filter(ClassroomId=classroom_id,Sender=student.Id)
            classroom_content.delete()          # head notice ko uploaded files bata remove garnu parne
            print(classroom_content.Id)

            return JsonResponse({'message':'Sucess'},status=200)
    except:
        return JsonResponse({'message':'Error'},status=500)