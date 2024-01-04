# Generated by Django 4.2.5 on 2024-01-04 01:58

from django.conf import settings
import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Building',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('Room', django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(blank=True, null=True), default=list, size=None)),
            ],
        ),
        migrations.CreateModel(
            name='Classroom',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('ClassroomCode', models.CharField(default=None, max_length=6)),
                ('CourseName', models.CharField(default=None, max_length=50)),
                ('InstructorName', models.CharField(max_length=30)),
                ('StudentId', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=12, null=True), default=list, size=None)),
            ],
        ),
        migrations.CreateModel(
            name='ClassroomCompressedFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uploaded_file', models.BinaryField()),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
                ('file_name', models.CharField(blank=True, default=None, max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('Name', models.CharField(max_length=50)),
                ('Code', models.CharField(max_length=8, primary_key=True, serialize=False, unique=True)),
                ('CreditHour', models.IntegerField()),
                ('Description', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='CourseContent',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('Url', models.CharField(default=None, max_length=100)),
                ('CourseName', models.CharField(default=None, max_length=100)),
                ('CourseBy', models.CharField(max_length=12)),
                ('Instructor', models.CharField(default=None, max_length=100)),
                ('Description', models.CharField(default=None, max_length=200, null=True)),
                ('Like', models.IntegerField(default=None, null=True)),
                ('CoverImage', models.BinaryField(default=None)),
                ('Enrolled', models.IntegerField(default=None, null=True)),
                ('VerifiedBy', models.CharField(default=None, max_length=12)),
                ('VerifierName', models.CharField(default=None, max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('Name', models.CharField(max_length=100)),
                ('Code', models.CharField(default=None, max_length=10, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('Title', models.CharField(max_length=50)),
                ('StartDate', models.DateField()),
                ('EndDate', models.DateField()),
                ('Category', models.CharField(max_length=5)),
                ('Description', models.TextField()),
                ('RefId', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Program',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('Name', models.CharField(max_length=80)),
                ('Code', models.CharField(max_length=8, unique=True)),
                ('Capacity', models.IntegerField()),
                ('DeptCode', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.department')),
            ],
        ),
        migrations.CreateModel(
            name='School',
            fields=[
                ('Code', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('Name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('Id', models.CharField(max_length=12, primary_key=True, serialize=False)),
                ('FirstName', models.CharField(max_length=50)),
                ('LastName', models.CharField(max_length=50)),
                ('Dob', models.DateField()),
                ('Email', models.EmailField(max_length=254)),
                ('Password', models.CharField(max_length=200)),
                ('ClassroomId', django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(blank=True, null=True), default=list, size=None)),
                ('Batch', models.IntegerField(default=None)),
                ('CourseId', django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(blank=True, null=True), default=list, size=None)),
                ('DeptCode', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.department')),
                ('ProgramCode', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.program', to_field='Code')),
            ],
        ),
        migrations.CreateModel(
            name='Session',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('start_time', models.TimeField()),
                ('classroom', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='main.classroom')),
            ],
        ),
        migrations.CreateModel(
            name='Routine',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('Batch', models.IntegerField()),
                ('WeekDay', models.CharField(max_length=10)),
                ('StartTime', models.CharField(max_length=10)),
                ('EndTime', models.CharField(max_length=10)),
                ('RoomNo', models.IntegerField(blank=True, null=True)),
                ('Course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.course')),
                ('DeptCode', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.department')),
                ('Program', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.program', to_field='Code')),
            ],
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Id', models.IntegerField()),
                ('Capacity', models.IntegerField()),
                ('Lab', models.BooleanField()),
                ('BuildId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.building')),
                ('DeptCode', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.department')),
            ],
        ),
        migrations.AddField(
            model_name='program',
            name='SchoolCode',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.school'),
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_student', models.BooleanField(default=False)),
                ('is_faculty', models.BooleanField(default=False)),
                ('user', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('classroom', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='main.classroom')),
            ],
        ),
        migrations.CreateModel(
            name='Faculty',
            fields=[
                ('Id', models.CharField(max_length=12, primary_key=True, serialize=False)),
                ('FirstName', models.CharField(max_length=50)),
                ('LastName', models.CharField(max_length=50)),
                ('Dob', models.DateField()),
                ('Email', models.EmailField(max_length=254)),
                ('Password', models.CharField(max_length=200)),
                ('ClassroomId', django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(blank=True, null=True), default=list, size=None)),
                ('CourseId', django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(blank=True, null=True), default=list, size=None)),
                ('DeptCode', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.department')),
            ],
        ),
        migrations.AddField(
            model_name='department',
            name='SchoolCode',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.school'),
        ),
        migrations.CreateModel(
            name='CourseConvo',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('Message', models.TextField()),
                ('Sender', models.CharField(max_length=12)),
                ('Like', models.IntegerField()),
                ('Course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.course')),
            ],
        ),
        migrations.AddField(
            model_name='course',
            name='DeptCode',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.department'),
        ),
        migrations.CreateModel(
            name='ClassroomConvo',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('Category', models.CharField(max_length=8)),
                ('Sender', models.CharField(max_length=12)),
                ('Message', models.TextField()),
                ('ClassroomId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.classroom')),
            ],
        ),
        migrations.CreateModel(
            name='ClassroomContent',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('Object_Key', models.IntegerField(blank=True, default=None, null=True)),
                ('Sender', models.CharField(max_length=12)),
                ('IsHead', models.BooleanField(default=False)),
                ('Head', models.IntegerField(default=None)),
                ('Description', models.CharField(default=None, max_length=200, null=True)),
                ('UploadedFiles', django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(blank=True, null=True), default=list, size=None)),
                ('ClassroomId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.classroom')),
            ],
        ),
        migrations.AddField(
            model_name='classroom',
            name='CourseCode',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.course'),
        ),
        migrations.AddField(
            model_name='classroom',
            name='FacultyId',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.faculty'),
        ),
        migrations.AddField(
            model_name='building',
            name='DeptCode',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.department'),
        ),
        migrations.CreateModel(
            name='Attendance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('status', models.CharField(max_length=8)),
                ('classroom', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.classroom')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.student')),
            ],
        ),
        migrations.CreateModel(
            name='Administrator',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('Position', models.CharField(max_length=20)),
                ('DeptCode', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.department')),
                ('Faculty', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.faculty')),
                ('SchoolCode', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.school')),
            ],
        ),
    ]
