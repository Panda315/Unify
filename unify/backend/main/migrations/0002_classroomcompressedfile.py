# Generated by Django 4.2.5 on 2023-11-03 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ClassroomCompressedFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uploaded_file', models.BinaryField()),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]