from django.shortcuts import render
from main.models import CourseContent,Student,Faculty
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.forms.models import model_to_dict
import json

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
            courses = list(courses)
            courses = [model_to_dict(item) for item in courses]
            return JsonResponse(enrolled_courses,courses,safe=False)

        except:
            return JsonResponse({'message':'could not load random classes'},status=500)

    except:
        return JsonResponse({'message':'error in processing'},status=500)
    

# add course
@csrf_exempt
def AddCourse(request):
    if request.method == "POST":
        data = json.loads(request.body)
        token = data['token']
        file = data.get('file')
        course_name = data.get('course_name')
        course_by = data.get('course_by')   # ku id of the instructor
        description = data.get('description')
        cover_image = data.get('cover_image')

        # cover image and video should be uploaded

    try:
        token = Token.objects.get(key=token)    
        user = User.objects.get(id=token.user_id)
        verifier = Faculty.objects.get(Email=user.email).Id
        verifiedby = verifier.Id
        verifier_name = verifier.FirstName + ' ' + verifier.LastName
        instructor_details = Faculty.objects.get(Id=course_by)
        instructor = instructor_details.FirstName + ' ' + instructor_details.LastName
        
        CourseContent.objects.create(objectKey=file,CourseName=course_name,CourseBy=course_by,instructor=instructor,CoverImage=cover_image,VerifiedBy=verifiedby,VerifierName=verifier_name)
        return JsonResponse({'message':'sucess'},status=200)

    except:
        return JsonResponse({'message':'error'},status=500)
