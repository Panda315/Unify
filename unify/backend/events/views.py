from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Category
from .serializers import CategorySerializer

@csrf_exempt
@api_view(['GET'])
def category_list(request):
    if request.method == 'GET':
        categories = Category.objects.all()

        serializer = CategorySerializer(categories, context={'requeset': request}, many=True)

        return Response(serializer.data)