from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets, permissions
from .models import Project
from . import serializers
# from  import ReadOnly

# def index(request, path=''):
#     return render(request, 'index.html')

class UserViewSet(viewsets.ModelViewSet):
    """
    Provides basic CRUD functions for the User model
    """
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    # permission_classes = (permissions., )

class ProjectViewSet(viewsets.ModelViewSet):
    """
    Provides basic CRUD functions for the Project model
    """
    queryset = Project.objects.all()
    serializer_class = serializers.ProjectSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)