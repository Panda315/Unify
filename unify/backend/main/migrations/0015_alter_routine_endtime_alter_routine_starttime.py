# Generated by Django 4.2.6 on 2024-01-02 18:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0014_alter_classroomcontent_description_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='routine',
            name='EndTime',
            field=models.CharField(max_length=10),
        ),
        migrations.AlterField(
            model_name='routine',
            name='StartTime',
            field=models.CharField(max_length=10),
        ),
    ]
