# Generated by Django 4.2.6 on 2023-12-30 17:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_alter_coursecontent_enrolled_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='coursecontent',
            name='Coursecode',
        ),
        migrations.AddField(
            model_name='coursecontent',
            name='CourseName',
            field=models.CharField(default=None, max_length=100),
        ),
    ]