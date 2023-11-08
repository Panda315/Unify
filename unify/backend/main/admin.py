from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import *

admin.site.register(Course)
admin.site.register(School)
admin.site.register(Faculty)
admin.site.register(Student)
admin.site.register(Classroom)
admin.site.register(Building)
admin.site.register(Department)
admin.site.register(Program)
admin.site.register(Room)
admin.site.register(Routine)