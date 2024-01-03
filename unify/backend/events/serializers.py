from rest_framework import serializers
from .models import Category, Event

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    category = serializers.RelatedField(source='category.name', read_only=True)
    coverImage = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = Event
        fields = [
            'title',
            'startDate',
            'endDate',
            'category',
            'coverImage',
            'description'
        ]
    def create(self, validated_data):
        category_name = validated_data.pop('category_name', None)

        if category_name:
            category, created = Category.objects.get_or_create(name=category_name)
        else:
            category = None

        # Create the Event instance with the associated Category
        event = Event.objects.create(category=category, **validated_data)

        return event