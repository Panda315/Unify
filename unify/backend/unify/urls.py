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
from django.urls import path,include
from AddData import views as AddData_views
from UserAuthentication import views as UserAuthentication_views

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

    path('events/', include('events.urls')),
]
