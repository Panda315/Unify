# Generated by Django 4.2.5 on 2023-12-31 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0013_alter_classroomcontent_ishead'),
    ]

    operations = [
        migrations.AlterField(
            model_name='classroomcontent',
            name='Description',
            field=models.CharField(default=None, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='classroomcontent',
            name='IsHead',
            field=models.BooleanField(default=False),
        ),
    ]