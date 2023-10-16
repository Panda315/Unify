from django.shortcuts import render,redirect
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
from django.contrib.auth.views import LoginView,LogoutView

class CustomLoginView(LoginView):
    template_name = 'UserAuthentication/<login.html>' # change the <login/html> with the name of the file that contains the frontend

class CustomLogoutView(LogoutView):
    template_name = 'UserAuthentication/<logout.html>'

# def LoginUser(request):
#     return render(request,'authenticate/login.html',{})

