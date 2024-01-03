from django.shortcuts import render, redirect
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view
from main.models import User, Faculty, Administrator
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
        token = data.get('token')

        # checking if the user is permitted or not
        userId = Token.objects.get(key=token)
        user = User.objects.get(id=userId.user_id)
        instructor = Faculty.objects.get(Email=user.Email)
        administrator = Administrator.objects.filter(Faculty_id=instructor.Id)

        if administrator is not None:
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
            
        else:
            return JsonResponse({'Error' : 'Not permitted'},status=403)

class EventListView(APIView):
    def get(self, request):
        events = Event.objects.all()

        serializer = EventSerializer(events, many=True)

        return Response(serializer.data)