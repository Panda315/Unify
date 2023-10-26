from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Category, Event
from .serializers import CategorySerializer, EventSerializer

@csrf_exempt
@api_view(['GET'])
def category_list(request):
    if request.method == 'GET':
        categories = Category.objects.all()

        serializer = CategorySerializer(categories, context={'requeset': request}, many=True)

        return Response(serializer.data)
    
@csrf_exempt
@api_view(['POST'])
def event_create(request):
    if request.method == 'POST':
        print("POST Event")
        data = request.data

        title = data.get('title')
        startDate = data.get('startDate')
        endDate = data.get('endDate')
        category = Category.objects.get(name=data.get('category'))
        coverImage = data.get('coverImage')
        description = data.get('description')
        
        try:
            event = Event.objects.create(
                title=title,
                startDate=startDate,
                endDate=endDate,
                category=category,
                coverImage=coverImage,
                description=description
            )
            event.save()
            return JsonResponse({'message': 'Event Creation Successful'}, status=200)
        except Exception as e:
            return JsonResponse({'Error': 'Event Creation Failed'}, status=500)