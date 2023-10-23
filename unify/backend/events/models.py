from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
    
class Event(models.Model):
    title = models.CharField(max_length=100)
    startDate = models.DateField()
    endDate = models.DateField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    coverImage = models.ImageField(upload_to='cover_images/', default='no_cover.png')
    description = models.CharField(max_length=1000)

    def __str__(self):
        return self.title