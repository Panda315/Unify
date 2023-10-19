# Generated by Django 4.2.5 on 2023-10-19 05:31

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Building',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('Room', django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), size=None)),
            ],
        ),
        migrations.CreateModel(
            name='Classroom',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('InstructorName', models.CharField(max_length=30)),
                ('StudentId', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=12), size=None)),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('Name', models.CharField(max_length=30)),
                ('code', models.CharField(max_length=8)),
                ('CreditHour', models.IntegerField()),
                ('Description', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='CourseContent',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('ObjectKey', models.CharField(max_length=200)),
                ('Coursecode', models.CharField(max_length=8)),
                ('CourseBy', models.CharField(max_length=30)),
                ('Description', models.TextField()),
                ('Like', models.IntegerField()),
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
                ('ClassroomId', django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), size=None)),
                ('DeptCode', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.department')),
            ],
        ),
        migrations.CreateModel(
            name='Routine',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('ProgramId', models.IntegerField()),
                ('Batch', models.IntegerField()),
                ('WeekDay', models.CharField(max_length=10)),
                ('StartTime', models.IntegerField()),
                ('EndTime', models.IntegerField()),
                ('Hour', models.IntegerField()),
                ('RoomNo', models.IntegerField()),
                ('BlockNo', models.IntegerField()),
                ('Course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.course')),
                ('DeptCode', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.department')),
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
        migrations.CreateModel(
            name='Program',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('Name', models.CharField(max_length=80)),
                ('Code', models.CharField(max_length=8)),
                ('Capacity', models.IntegerField()),
                ('DeptCode', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.department')),
                ('SchoolCode', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.school')),
            ],
        ),
        migrations.CreateModel(
            name='Faculty',
            fields=[
                ('Id', models.CharField(max_length=12, primary_key=True, serialize=False)),
                ('FirstName', models.CharField(max_length=50)),
                ('LastName', models.CharField(max_length=50)),
                ('Dob', models.DateField()),
                ('country', models.CharField(max_length=50)),
                ('Email', models.EmailField(max_length=254)),
                ('Password', models.CharField(max_length=200)),
                ('ClassroomId', django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), size=None)),
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
                ('ObjectKey', models.CharField(max_length=200)),
                ('Sender', models.CharField(max_length=12)),
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
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('Date', models.DateField()),
                ('Status', models.CharField(max_length=8)),
                ('CourseId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.course')),
                ('FacultyId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.faculty')),
                ('StudentId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.student')),
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
