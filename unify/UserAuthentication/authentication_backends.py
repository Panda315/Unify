from django.contrib.auth.backends import ModelBackend
from backend.models import Student, Faculty

class StudentFacultyBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            student = Student.objects.get(email=username)
            if student.check_password(password):
                return student
        except Student.DoesNotExist:
            pass

        try:
            faculty = Faculty.objects.get(email=username)
            if faculty.check_password(password):
                return faculty
        except Faculty.DoesNotExist:
            pass

    def get_user(self, user_id):
        try:
            return Student.objects.get(pk=user_id)
        except Student.DoesNotExist:
            try:
                return Faculty.objects.get(pk=user_id)
            except Faculty.DoesNotExist:
                return None