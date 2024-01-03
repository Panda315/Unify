from django.urls import path, include
from . import views

urlpatterns = [
    path('get_room_ids/', views.get_room_ids),
    path('get_programs/', views.get_programs),
    path('get_courses_codes/', views.get_course_codes),
    path('get_routine/', views.get_routine),
    path('get_course_codes/', views.get_course_codes),
    path('save_routine/', views.save_routine),
    path('update_routine/', views.update_routine),
    path('delete_routine/', views.delete_routine),
    path('get_allocations_by_room/', views.get_allocations_by_room),
]