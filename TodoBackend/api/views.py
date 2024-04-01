from django.shortcuts import render
from rest_framework import response
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView
from .serializers import TaskSerializer
from .models import Task

# Create your views here.

class TaskApi(ListCreateAPIView):
    queryset  = Task.objects.all()
    serializer_class = TaskSerializer

class TaskudApi(RetrieveUpdateDestroyAPIView):
    queryset  = Task.objects.all()
    serializer_class = TaskSerializer
    lookup_field='id'
