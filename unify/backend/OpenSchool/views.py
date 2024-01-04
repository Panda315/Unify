from django.shortcuts import render
from main.models import CourseContent,Student,Faculty
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.forms.models import model_to_dict
import json
import base64
from django.core.serializers.json import DjangoJSONEncoder
# to send pdf to frontend
def get_base64_encoded_pdf(file_data):
    return base64.b64encode(file_data).decode('utf-8')

# randomly load the courses in the open school home page
@csrf_exempt
def LoadCourses(request):
    if request.method == "POST":
        data = json.loads(request.body)
        token = data.get('token')
        role = data.get('role')
        token = Token.objects.get(key=token)    
        user = User.objects.get(id=token.user_id)
        enrolled_courses = []

    try:
        # to catch enrolled courses
        if role == "student":
            student = Student.objects.get(Email=user.email)
            courses = student.CourseId
            enrolled_courses.append(courses)

        if role == "faculty":
            faculty = Faculty.objects.get(Email=user.email)
            courses = faculty.CourseId
            enrolled_courses.append(courses)

        try:
            # finding random courses
            courses = CourseContent.objects.exclude(Id__in=enrolled_courses)[:20]
            compressed_files = []
            for course in courses:
                file_data={
                    'id' : course.Id,
                    'uploaded_file' :  get_base64_encoded_pdf(course.CoverImage),
                    'description' : course.Description,
                    'url' : course.Url,
                    'verifier_name' : course.VerifierName,
                    'instructor_name' : course.Instructor,
                    'verifier_name' : course.VerifierName,
                    'enrolled' : course.Enrolled,
                    'like' : course.Like
                }
                compressed_files.append(file_data)
            # courses = list(courses)
            # courses = [model_to_dict(item) for item in courses]
            return JsonResponse(compressed_files,safe=False,encoder=DjangoJSONEncoder)

        except:
            return JsonResponse({'message':'could not load random classes'},status=500)

    except:
        return JsonResponse({'message':'error in processing'},status=500)
    
# load enrolled courses
@csrf_exempt
def LoadEnrolledCourses(request):
    if request.method == "POST":
        data = json.loads(request.body)
        token = data.get('token')
        role = data.get('role')
        token = Token.objects.get(key=token)    
        user = User.objects.get(id=token.user_id)
        enrolled_courses = []

    try:
        # to catch enrolled courses
        if role == "student":
            student = Student.objects.get(Email=user.email)
            courses = student.CourseId
            enrolled_courses = courses

        if role == "faculty":
            faculty = Faculty.objects.get(Email=user.email)
            courses = faculty.CourseId
            enrolled_courses = courses

        try:
            # finding random courses
            courses = CourseContent.objects.filter(Id=enrolled_courses)
            compressed_files = []
            for course in courses:
                file_data={
                    'id' : course.Id,
                    'uploaded_file' :  get_base64_encoded_pdf(course.CoverImage),
                    'description' : course.Description,
                    'url' : course.Url,
                    'verifier_name' : course.VerifierName,
                    'instructor_name' : course.Instructor,
                    'verifier_name' : course.VerifierName,
                    'enrolled' : course.Enrolled,
                    'like' : course.Like
                }
                compressed_files.append(file_data)
            # courses = list(courses)
            # courses = [model_to_dict(item) for item in courses]
            return JsonResponse(compressed_files,safe=False,encoder=DjangoJSONEncoder)

        except:
            return JsonResponse({'message':'could not load random classes'},status=500)

    except:
        return JsonResponse({'message':'error in processing'},status=500)
    

# add course
# student le course add garnu paudena, course can be only added by faculty
@csrf_exempt
def AddCourse(request):
    if request.method == "POST":
        token = request.POST.get('token')
        url = request.POST.get('url')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        course_name = request.POST.get('course_name')   
        course_by = request.POST.get('course_by')   # actual instructor of the course,ku id of the instructor
        description = request.POST.get('description')
        cover_image = request.FILES.get('cover_image')

    try:
        token = Token.objects.get(key=token)    
        user = User.objects.get(id=token.user_id)
        verifier = Faculty.objects.get(Email=user.email).Id
        verifier_name = first_name + ' ' + last_name
        instructor_details = Faculty.objects.get(Id=course_by)
        binary_data = cover_image.read()

        try:
            instructor_details = Faculty.objects.get(Id=course_by)
            instructor = instructor_details.FirstName + ' ' + instructor_details.LastName
            CourseContent.objects.create(Url=url,CourseName=course_name,CourseBy=course_by,Instructor=instructor,CoverImage=binary_data,VerifiedBy=verifier.Id,VerifierName=verifier_name)
            return JsonResponse({'message':'sucess'},status=200)
        except:
            instructor_details = Student.objects.get(Id=course_by)
            instructor = instructor_details.FirstName + ' ' + instructor_details.LastName
            CourseContent.objects.create(Url=url,CourseName=course_name,CourseBy=course_by,Instructor=instructor,CoverImage=binary_data,VerifiedBy=verifier.Id,VerifierName=verifier_name)
            return JsonResponse({'message':'sucess'},status=200)

    except:
        return JsonResponse({'message':'error'},status=500)
    

# enroll in course
@csrf_exempt
def Enroll(request):
    if request.method == "POST":
        data = json.loads(request.body)
        token = data.get('token')
        course_id = data.get('id')      # open school ko course ko id
        role = data.get('role')

    try:
        key=Token.objects.get(key=token)
        user = User.objects.get(id=key.user_id)

        if role == "student":
            student = Student.objects.get(Email=user.email)
            student.CourseId.append(course_id)
            student.save()
            course = CourseContent.objects.get(Id=course_id)
            course.Enrolled +=  1
            course.save()
            return JsonResponse({'message':'sucess'},status=200)
        else:
            faculty = Faculty.objects.get(Email=user.email)
            faculty.CourseId.append(course_id)
            faculty.save()
            course = CourseContent.objects.get(Id=course_id)
            course.Enrolled +=  1
            course.save()
            return JsonResponse({'message':'sucess'},status=200)
    except:
        return JsonResponse({'message':'not sucess'},status=500)

# like course
@csrf_exempt
def LikeCourse(request):
    if request.method == "POST":
        data = json.loads(request.body)
        course_id = data.get('course_id')

    try:
        course = CourseContent.objects.get(Id=course_id)
        course.Like += 1
        course.save()
        return JsonResponse({'message':'sucess'},status=200)
    except:
        return JsonResponse({'message':'sucess'},status=200)
    
# remove course
@csrf_exempt
def RemoveCourse(request):
    if request.method == "POST":
        data = json.loads(request.body)
        course_id = data.get('course_id')
        role = data.get('role')
        token = data.get('token')
        token = Token.objects.get(key=token)    
        user = User.objects.get(id=token.user_id)

    try:
        CourseContent.objects.delete(Id=course_id)
        if role == "student":
            student = Student.objects.get(Email=user.email)
            student.CourseId.remove(course_id)
            student.save()
        else:
            faculty = Faculty.objects.get(Email=user.email)
            faculty.CourseId.remove(course_id)
            faculty.save() 

        return JsonResponse({'message':'sucess'},status=200)
    except:
        return JsonResponse({'message':'sucess'},status=200)