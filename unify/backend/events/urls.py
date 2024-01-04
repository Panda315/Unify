from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    path('category_list/', views.category_list),
    path('event_create/', views.event_create),
    path('fetch_events/', views.EventListView.as_view(), name='event-list'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)