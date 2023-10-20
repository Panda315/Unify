from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from main.models import Student, Faculty,Profile
from django.contrib.auth.hashers import check_password,make_password

User = get_user_model()  # getting the default user model

class CustomAuthenticationBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None):
        try:
            student = Student.objects.get(Email=email)
            if check_password(password,student.Password):
                try:
                    # user,created = User.objects.get_or_create(email=student.Email)[0]
                    user,created = User.objects.get_or_create(email=student.Email,first_name=student.FirstName,last_name=student.LastName)
                    Profile.objects.update_or_create(user=user,defaults={"is_student":True})
                    return user
                except Exception as e:
                    print(e)
        except Student.DoesNotExist:
            pass

        try:
            faculty = Faculty.objects.get(Email=email)
            if check_password(password,faculty.Password):
                try:
                    user,created = User.objects.get_or_create(email=faculty.Email,first_name=faculty.FirstName,last_name=faculty.LastName)
                    Profile.objects.update_or_create(user=user,defaults={"is_faculty":True})
                    return user
                except Exception as e:
                    print(e)
        except Faculty.DoesNotExist:
            pass

        return None
