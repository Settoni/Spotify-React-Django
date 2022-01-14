from django.urls import path
from .views import index


app_name = 'frontend'

urlpatterns = [
    path('', index, name=''), #we need a name so the spotify api gets redirected here. We've redirected to (frontend:'') so we need to leave it empty
    path('join', index),
    path('create', index),
    path('room/<str:roomCode>', index),
]