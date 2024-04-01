
from django.urls import path
from . import views

urlpatterns = [
    path('task/',views.TaskApi.as_view()),
    path('task/<int:id>/',views.TaskudApi.as_view())
]