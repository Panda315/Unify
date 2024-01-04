"""
URL configuration for unify project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from AddData import views as AddData_views
from UserAuthentication import views as UserAuthentication_views
from VirtualClassroom import views as VirtualClassroom_views
from Routine import views as Routine_views
from OpenSchool import views as OpenSchool_views

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('',include('main.urls')),
    path('addfaculty/',AddData_views.AddFaculty,name='addFaculty'),
    path('addstudent/',AddData_views.AddStudent,name='addStudents'),
    path('addschool/',AddData_views.AddSchool,name='addSchool'),
    path('adddepartment/',AddData_views.AddDepartment,name='addDepartment'),
    path('addcourse/',AddData_views.AddCourse,name='addCourse'),
    path('login/',UserAuthentication_views.login_view,name='login'),
    path('logout/',UserAuthentication_views.logout_view,name='logout'),
    # path('/login/token/',obtain_auth_token,name='token_obtain_pair'),
    path('events/', include('events.urls')),
    path('createclassroom/',VirtualClassroom_views.CreateClassroom,name="createClassroom"),
    path('joinclassroom/',VirtualClassroom_views.JoinClassroom,name="joinClassroom"),
    path('deleteclassroom/',VirtualClassroom_views.DeleteClassroom,name="deleteClassroom"),
    path('loadclassroom/',VirtualClassroom_views.LoadClassrooms,name='loadClassroom'),
    path('uploadclassroomfile/',VirtualClassroom_views.UploadFile,name='uploadFile'),
    path('start_session/', VirtualClassroom_views.start_session, name='startSession'),
    path('get_session/', VirtualClassroom_views.get_session, name='getSession'),
    path('get_attendance/', VirtualClassroom_views.get_attendance, name='getAttendance'),
    path('attendance/student/', VirtualClassroom_views.student_view, name='studentView'),
    path('addProgram/',AddData_views.AddProgram,name='addProgram'),
    # path('saveRoutine/',Routine_views.SaveRoutine,name="saveroutine"),
    # path('getRoutine/',Routine_views.GetRoutine,name="getroutine"),
    path('routineGenerator/',Routine_views.RoutineGenerator,name="routinegenerator"),
    path('addBuilding/',AddData_views.addBuilding,name='addbuilding'),
    path('leaveclassroom/',VirtualClassroom_views.LeaveClassroom,name='leaveclassroom'),
    path('loadcourses/',OpenSchool_views.LoadCourses,name='loadcourses'),
    path('downloadfile/',VirtualClassroom_views.DownloadCompressedFile,name='downloadfile'),
    path('removefile/',VirtualClassroom_views.RemoveFile,name='removefile'),
    path('loadfile/',VirtualClassroom_views.LoadParticularAssignment,name='loadfile'),
    path('loadall/',VirtualClassroom_views.LoadAllSubmission,name='loadallsubmission'),
    path('routine/', include('Routine.urls'))
]
