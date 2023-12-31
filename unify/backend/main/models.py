from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    is_student = models.BooleanField(default=False)
    is_faculty = models.BooleanField(default=False)

    def __str__(self):
        return str(self.user)
    
# to compress the pdf for virtual classroom
class ClassroomCompressedFile(models.Model):
    uploaded_file = models.BinaryField()
    uploaded_at = models.DateTimeField(auto_now_add=True)
    file_name = models.CharField(max_length=100,default=None,blank=True)

# School table
class School(models.Model):
    Code = models.CharField(primary_key=True,max_length=10)
    Name = models.CharField(max_length=50)

# Department table
class Department(models.Model):
    SchoolCode = models.ForeignKey(School,to_field="Code",on_delete=models.CASCADE)
    Name = models.CharField(max_length=100)
    Code = models.CharField(max_length=10,primary_key=True,default=None)

class Course(models.Model):
    Name = models.CharField(max_length=50)
    Code = models.CharField(max_length=8,primary_key=True,unique=True)
    CreditHour = models.IntegerField()
    Description = models.CharField(max_length = 100)
    DeptCode = models.ForeignKey(Department,to_field="Code",on_delete=models.CASCADE)

class Program(models.Model):
    Id = models.AutoField(primary_key=True)
    DeptCode = models.ForeignKey(Department,to_field="Code",on_delete=models.CASCADE,default=None)
    SchoolCode = models.ForeignKey(School,to_field="Code",on_delete=models.CASCADE,default=None)
    Name = models.CharField(max_length=80)
    Code = models.CharField(max_length=8,unique=True)
    Capacity = models.IntegerField()

# Student table
class Student(models.Model):
    Id = models.CharField(max_length=12,primary_key=True)
    FirstName = models.CharField(max_length=50)
    LastName = models.CharField(max_length=50)
    Dob = models.DateField()
    Email = models.EmailField()
    Password = models.CharField(max_length=200)
    DeptCode = models.ForeignKey(Department,to_field="Code",on_delete=models.CASCADE)
    ClassroomId = ArrayField(models.IntegerField(null=True,blank=True),default=list)
    Batch = models.IntegerField(default=None)
    ProgramCode = models.ForeignKey(Program,to_field="Code",on_delete=models.CASCADE,default=None)
    CourseId = ArrayField(models.IntegerField(null=True,blank=True),default=list)  # to store the ids of courses enrolled in open school

# Faculty table
class Faculty(models.Model):
    Id = models.CharField(max_length=12,primary_key=True)
    FirstName = models.CharField(max_length=50)
    LastName = models.CharField(max_length=50)
    Dob = models.DateField()
    Email = models.EmailField()
    Password = models.CharField(max_length=200)
    DeptCode = models.ForeignKey(Department,to_field="Code",on_delete=models.CASCADE,default=None)
    ClassroomId = ArrayField(models.IntegerField(null=True,blank=True),default=list)
    CourseId = ArrayField(models.IntegerField(null=True,blank=True),default=list)  # to store the ids of courses enrolled in open school

# Routine table
class Routine(models.Model):
    Id = models.AutoField(primary_key=True)
    DeptCode = models.ForeignKey(Department,to_field="Code",on_delete=models.CASCADE,default=None)
    Program = models.ForeignKey(Program,to_field="Code",on_delete=models.CASCADE,default=None)
    Batch = models.IntegerField()
    WeekDay = models.CharField(max_length=10)
    StartTime = models.CharField(max_length=10)
    EndTime = models.CharField(max_length=10)
    # Hour = models.IntegerField()
    RoomNo = models.IntegerField(null=True,blank=True)
    # BlockNo = models.IntegerField()
    Course = models.ForeignKey(Course,to_field="Code",on_delete=models.CASCADE)

class Classroom(models.Model):
    Id = models.AutoField(primary_key=True)
    ClassroomCode = models.CharField(max_length=6,default=None)
    CourseName = models.CharField(max_length=50,default=None)
    FacultyId = models.ForeignKey(Faculty,to_field="Id",on_delete=models.CASCADE)
    CourseCode = models.ForeignKey(Course,to_field="Code",on_delete=models.CASCADE)
    InstructorName = models.CharField(max_length=30)
    StudentId = ArrayField(models.CharField(max_length=12,null=True,blank=True),default=list)

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
    Course = models.ForeignKey(Course,to_field="Code",on_delete=models.CASCADE)
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
    Room = ArrayField(models.IntegerField(null=True,blank=True),default=list)
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
    Object_Key = models.IntegerField(default=None,blank=True,null=True)    # to store the link of videos stored in another model
    ClassroomId = models.ForeignKey(Classroom,on_delete=models.CASCADE)
    Sender = models.CharField(max_length=12)
    IsHead = models.BooleanField(default=False)  # to check if the content is the front content ( like assignment question )
    Head = models.IntegerField(default=None)    # yo bata head pdf sanga link hanne, assignment submission ma kun assignment bhitra ko ho dekhauna help garcha
    Description = models.CharField(default=None,null=True,max_length=200)
    UploadedFiles = ArrayField(models.IntegerField(blank=True,null=True),default=list)       # to store the object key of the submitted assignments

# to store the content of courses uploaded in open school
class CourseContent(models.Model):
    Id = models.AutoField(primary_key=True)
    Url = models.CharField(max_length=100,default=None)
    CourseName = models.CharField(max_length=100,default=None)
    CourseBy = models.CharField(max_length=12)      # ku id of the educator
    Instructor = models.CharField(max_length=100,default=None)   # name of the instructor
    Description = models.CharField(max_length=200,default=None,null=True)
    Like = models.IntegerField(null=True,default=None)    
    CoverImage = models.BinaryField(default=None)        # object key id
    Enrolled = models.IntegerField(null=True,default=None)    # to store the number of users enrolled in the course
    VerifiedBy = models.CharField(max_length=12,default=None)
    VerifierName = models.CharField(max_length=100,default=None)

class AttendanceTable(models.Model):
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    # faculty = models.ForeignKey(Faculty, on_delete=models.PROTECT)
    # course = models.ForeignKey(Course, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(max_length=8)

class LocationTable(models.Model):
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE,default=None,null=True)
    latitude = models.FloatField()
    longitude = models.FloatField()

class SessionTable(models.Model):
    # faculty_id = models.CharField(max_length=12)
    # classroom_id = models.IntegerField()
    # batch = models.IntegerField()
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE,default=None,null=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    start_time = models.TimeField()

