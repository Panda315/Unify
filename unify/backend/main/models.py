from django.db import models
from django.contrib.postgres.fields import ArrayField

# School table
class School(models.Model):
    Code = models.CharField(primary_key=True,max_length=10)
    Name = models.CharField(max_length=50)

# Department table
class Department(models.Model):
    SchoolCode = models.ForeignKey(School,to_field="Code",on_delete=models.CASCADE)
    Name = models.CharField(max_length=100)
    Code = models.CharField(max_length=10,primary_key=True,default=None)

# Course table
class Course(models.Model):
    Id = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=30)
    code = models.CharField(max_length=8)
    CreditHour = models.IntegerField()
    Description = models.CharField(max_length = 100)
    DeptCode = models.ForeignKey(Department,to_field="Code",on_delete=models.CASCADE)

# Student table
class Student(models.Model):
    Id = models.CharField(max_length=12,primary_key=True)
    FirstName = models.CharField(max_length=50)
    LastName = models.CharField(max_length=50)
    Dob = models.DateField()
    Email = models.EmailField()
    Password = models.CharField(max_length=200)
    DeptCode = models.ForeignKey(Department,to_field="Code",on_delete=models.CASCADE)
    ClassroomId = ArrayField(models.IntegerField())

# Faculty table
class Faculty(models.Model):
    Id = models.CharField(max_length=12,primary_key=True)
    FirstName = models.CharField(max_length=50)
    LastName = models.CharField(max_length=50)
    Dob = models.DateField()
    country = models.CharField(max_length=50)
    Email = models.EmailField()
    Password = models.CharField(max_length=200)
    DeptCode = models.ForeignKey(Department,to_field="Code",on_delete=models.CASCADE,default=None)
    ClassroomId = ArrayField(models.IntegerField())

# Routine table
class Routine(models.Model):
    Id = models.AutoField(primary_key=True)
    DeptCode = models.ForeignKey(Department,to_field="Code",on_delete=models.CASCADE,default=None)
    ProgramId = models.IntegerField()
    Batch = models.IntegerField()
    WeekDay = models.CharField(max_length=10)
    StartTime = models.IntegerField()
    EndTime = models.IntegerField()
    Hour = models.IntegerField()
    RoomNo = models.IntegerField()
    BlockNo = models.IntegerField()
    Course = models.ForeignKey(Course,on_delete=models.CASCADE)

# Virtual classroom table
class Classroom(models.Model):
    Id = models.AutoField(primary_key=True)
    FacultyId = models.ForeignKey(Faculty,on_delete=models.CASCADE)
    CourseCode = models.ForeignKey(Course,on_delete=models.CASCADE)
    InstructorName = models.CharField(max_length=30)
    StudentId = ArrayField(models.CharField(max_length=12))

# Attendance table
class Attendance(models.Model):
    Id = models.AutoField(primary_key=True)
    Date = models.DateField()
    Status = models.CharField(max_length=8)
    CourseId = models.ForeignKey(Course,on_delete=models.CASCADE)
    FacultyId = models.ForeignKey(Faculty,to_field="Id",on_delete=models.CASCADE)
    StudentId = models.ForeignKey(Student,to_field="Id",on_delete=models.CASCADE)

class Program(models.Model):
    Id = models.AutoField(primary_key=True)
    DeptCode = models.ForeignKey(Department,to_field="Code",on_delete=models.CASCADE,default=None)
    SchoolCode = models.ForeignKey(School,to_field="Code",on_delete=models.CASCADE,default=None)
    Name = models.CharField(max_length=80)
    Code = models.CharField(max_length=8)
    Capacity = models.IntegerField()

# to store the conversation of classroom ( like google classroom )
class ClassroomConvo(models.Model):
    Id = models.AutoField(primary_key = True)
    Category = models.CharField(max_length=8)
    ClassroomId = models.ForeignKey(Classroom,on_delete=models.CASCADE)
    Sender = models.CharField(max_length=12)
    Message = models.TextField()

# to store the conversation of course ( like coursera )
class CourseConvo(models.Model):
    Id = models.AutoField(primary_key=True)
    Course = models.ForeignKey(Course,on_delete=models.CASCADE)
    Message = models.TextField()
    Sender = models.CharField(max_length=12)
    Like = models.IntegerField()

# table to store all the events either ku events or dept events
class Event(models.Model):
    Id = models.AutoField(primary_key=True)
    Title = models.CharField(max_length=50)
    StartDate = models.DateField()
    EndDate = models.DateField()
    Category = models.CharField(max_length=5)
    Description = models.TextField()
    RefId = models.IntegerField()

# to store the rank of faculty member in different position
class Administrator(models.Model):
    Id = models.AutoField(primary_key=True)
    Faculty = models.ForeignKey(Faculty,to_field="Id", on_delete=models.CASCADE)
    SchoolCode = models.ForeignKey(School,to_field="Code",on_delete=models.CASCADE,default=None)
    DeptCode = models.ForeignKey(Department,to_field="Code",on_delete=models.CASCADE,default=None)
    Position = models.CharField(max_length=20)

# table to store the info about the buildings of ku
class Building(models.Model):
    Id = models.AutoField(primary_key=True)
    Room = ArrayField(models.IntegerField())
    DeptCode = models.ForeignKey(Department,to_field="Code",on_delete=models.CASCADE,default=None)

# to store the information about all the rooms of ku
class Room(models.Model):
    Id = models.IntegerField()
    BuildId = models.ForeignKey(Building,on_delete=models.CASCADE)
    DeptCode = models.ForeignKey(Department,to_field="Code",on_delete=models.CASCADE,default=None)
    Capacity = models.IntegerField()
    Lab = models.BooleanField()

# to store the content of virtual classroom
class ClassroomContent(models.Model):
    Id = models.AutoField(primary_key=True)
    ObjectKey = models.CharField(max_length=200)        # to store the link of videos stored in another db
    ClassroomId = models.ForeignKey(Classroom,on_delete=models.CASCADE)
    Sender = models.CharField(max_length=12)

# to store the content of courses uploaded in open school
class CourseContent(models.Model):
    Id = models.AutoField(primary_key=True)
    ObjectKey = models.CharField(max_length=200)
    Coursecode = models.CharField(max_length=8)
    CourseBy = models.CharField(max_length=30)      # name of the educator
    Description = models.TextField()
    Like = models.IntegerField()
