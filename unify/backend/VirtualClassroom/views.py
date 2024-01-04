from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from main.models import Course,Classroom,Faculty,Student,ClassroomCompressedFile,ClassroomContent, AttendanceTable, Session
from django.http import JsonResponse,HttpResponse
import json,secrets,string
from django.shortcuts import render
from django.forms.models import model_to_dict
from django.core import serializers
import base64
from datetime import datetime
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

@csrf_exempt
def student_view(request):
    print("writing to database")
    if request.method == 'POST':
        data = json.loads(request.body)
        status = data.get('status')
        course_id = data.get('course_id')
        faculty_id= data.get('faculty_id')
        student_id = data.get('student_id')

    try:
        print("entered try block")
        date = datetime.today().strftime('%Y-%m-%d')
        
        attendance = AttendanceTable.objects.create(
            student = Student.objects.get(student_id=student_id),
            faculty = Faculty.objects.get(faculty_id=faculty_id),
            course = Course.objects.get(course_id=course_id),
            date = date,
            status = status
        )

        response = {
            'success': True,
            'status': 'Present'
        }

        return JsonResponse(response)
    except Exception as e:
        print(e)
    
    return render(request, 'build/index.html')

@csrf_exempt
def start_session(request):
    if request.method == "POST":
        data = json.loads(request.body)
        print("Received data:", data)
        classroom_id = data.get('classroom_id')
        classroom_obj = Classroom.objects.get(Id=int(classroom_id))
        start_time_str = data.get('start_time')
        start_time = datetime.strptime(start_time_str, '%Y-%m-%dT%H:%M:%S.%fZ')

    try:
        # new_session = Session()

        # new_session.classroom = classroom_obj
        # new_session.latitude = data.get('latitude')
        # new_session.longitude = data.get('longitude')
        # start_time_str = data.get('start_time')
        # start_time = datetime.strptime(start_time_str, '%Y-%m-%dT%H:%M:%S.%fZ')
        # new_session.start_time = start_time

        # new_session.save()

        Session.objects.create(
            classroom=classroom_obj,
            latitude=data.get('latitude'),
            longitude=data.get('longitude'),

        )

        return JsonResponse({'message': 'success'}, status=200)
    except Exception as e:
        print(str(e))
        return JsonResponse({'message': 'error'}, status=500)

@csrf_exempt
def get_session(request):
    if request.method == "POST":
        data = json.loads(request.body)

    try:
        session = Session.objects.filter(
            faculty_id = data.get('faculty_id'),
            program_id = data.get('program_id'),
            batch = data.get('batch')
        )

        _session = serializers.serialize('json', session)
        __session = [model_to_dict(item) for item in session]

        print(__session)

        return JsonResponse(__session, safe=False)
    except Exception as e:
        print(str(e))
        return JsonResponse({'message': 'error'}, status=500)

#return attendance
@csrf_exempt
def get_attendance(request):
    if request.method == "POST":
        data = json.loads(request.body)
        classroom_id = data['classroom_id']
        classroom_obj = Classroom.objects.get(Id=classroom_id)
    
    try:
        attendance_list = AttendanceTable.objects.filter(classroom=classroom_obj)
        # print(attendance_list)
        # print(list(attendance_list))
        # _attendance = serializers.serialize('json', attendance_list)
        __attendance = [model_to_dict(item) for item in attendance_list]
        print(__attendance)
        return JsonResponse(__attendance, safe=False)

    except:
        return JsonResponse({'message':"error"},status=500)

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
            classroom.save()

            # removing classroom from faculty ClassroomId
            instructor.ClassroomId.remove(id)
            instructor.save()

            # removing classroom from student ClassroomId
            for student in students:
                student.ClassroomId.remove(id)
                student.save()
            
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
@csrf_exempt
def RemoveFile(request):
    if request.method == "POST":
        data = json.loads(request.body)
        head = data.get('head')
        token = data.get('token')
        token = Token.objects.get(key=token)
    
    try:
        user = User.objects.get(id=token.user_id)
        student = Student.objects.get(Email=user.email)
        content = ClassroomContent.objects.get(Head=head,Sender=student.Id)
        file = ClassroomCompressedFile.objects.get(id=content.Object_Key)
        file.delete()
        file.save()
        remove_contents = ClassroomContent.objects.get(UploadFile__contains=[content.Object_Key])
        remove_contents.UploadedFiles.remove(content.Object_Key)
        remove_contents.save()
        content.delete()
        content.save()
        return JsonResponse({'message':"Sucess"},status=200)
    except Exception as e:
            print(e)
            return JsonResponse({'message':"Can not delete file"},status=500)

# classroom delete garda sab content delete hunu paryo
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
        token = Token.objects.get(key=token)
        user = User.objects.get(id=token.user_id)
        
    try:

        if file != "":
            binary_data = file.read()
            # creating a new instance and storing the binary data in the database
            id = ClassroomCompressedFile.objects.create(uploaded_file=binary_data,file_name=file.name).id
            classroom_id = Classroom.objects.get(Id=classroom_id)
            if role == "student":
                student = Student.objects.get(Email=user.email)
                ClassroomContent.objects.create(Object_Key=id,ClassroomId=classroom_id,Sender=student.Id,IsHead=False,Head=head,Description=description)
                classroom_content = ClassroomContent.objects.get(Id=head)
                classroom_content.UploadedFiles.append(id)
                classroom_content.save()
                return JsonResponse({'message':'success'},status=200)
                
            else:
                faculty = Faculty.objects.get(Email=user.email)
                classroom_content = ClassroomContent.objects.create(
                        Object_Key=id,
                        ClassroomId=classroom_id,
                        Sender=faculty.Id,
                        IsHead=True,
                        Head=0,
                        Description=description
                    )

                classroom_content.Head = classroom_content.Id
                classroom_content.save()
                return JsonResponse({'message':'success'},status=200)
            
        else:
            classroom_id = Classroom.objects.get(Id=classroom_id)
            if role == "student":
                student = Student.objects.get(Email=user.email)
                ClassroomContent.objects.create(Object_Key=id,ClassroomId=classroom_id,Sender=student.Id,IsHead=False,Head=head,Description=description)
                classroom_content = ClassroomContent.objects.get(Id=head)
                classroom_content.UploadedFiles.append(id)
                classroom_content.save()
                return JsonResponse({'message':'success'},status=200)
                
            else:
                faculty = Faculty.objects.get(Email=user.email)
                classroom_content = ClassroomContent.objects.create(
                        Object_Key=id,
                        ClassroomId=classroom_id,
                        Sender=faculty.Id,
                        IsHead=True,
                        Head=0,
                        Description=description
                    )

                classroom_content.Head = classroom_content.Id
                classroom_content.save()
                return JsonResponse({'message':'success'},status=200)
    except:
        return JsonResponse({'error': 'Invalid request method.'}, status=400)
    

# load particular assignment in the classroom ( for students )
@csrf_exempt
def LoadParticularAssignment(request):
    if request.method == "POST":
        data = json.loads(request.body)
        head = data.get('head')
        token = data.get('token')
        token = Token.objects.get(key=token)
        user = User.objects.get(id=token.user_id)

    try:
        student = Student.objects.get(Email=user.email)
        classroom_content = ClassroomContent.objects.get(Head=head,Sender=student.Id)
        multiple_to_single_file = []
        file = ClassroomCompressedFile.objects.get(id=classroom_content.Object_Key)
        file_data={
            'id' : file.id,
            'uploaded_file' :  get_base64_encoded_pdf(file.uploaded_file),
            'uploaded_at' : file.uploaded_at,
            'file_name' : file.file_name,
            'description' : classroom_content.Description
        }
        multiple_to_single_file.append(file_data)
        return JsonResponse(multiple_to_single_file,safe=False,encoder=DjangoJSONEncoder)
    except:
        return JsonResponse({'message':'error'},status=500)



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
                file = ClassroomCompressedFile.objects.get(id=content.Object_Key)
                file_data={
                    'id' : file.id,
                    'uploaded_file' :  get_base64_encoded_pdf(file.uploaded_file),
                    'uploaded_at' : file.uploaded_at,
                    'file_name' : file.file_name,
                    'description' : content.Description
                }
                multiple_to_single_file.append(file_data)
            
            compressed_files.append(multiple_to_single_file)
            return JsonResponse(compressed_files,safe=False,encoder=DjangoJSONEncoder)
    except:
        return JsonResponse({'message':'error'},status=500)



#Load all submissions
@csrf_exempt
def LoadAllSubmission(request):
    if request.method == "POST":
        data = json.loads(request.body)
        head = data['head']
        print(head)

    try:
        content = ClassroomContent.objects.get(Id=head)
        multiple_to_single_file = []
        compressed_files = []
        for id in content.UploadedFiles:
            file = ClassroomCompressedFile.objects.get(id=id)
            file_data={
                'id' : file.id,
                'uploaded_file' :  get_base64_encoded_pdf(file.uploaded_file),
                'uploaded_at' : file.uploaded_at,
                'file_name' : file.file_name,
            }
            multiple_to_single_file.append(file_data)
        compressed_files.append(multiple_to_single_file)
        return JsonResponse(compressed_files,safe=False,encoder=DjangoJSONEncoder)
    except:
        return JsonResponse({'message':'Error'},status=500)


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