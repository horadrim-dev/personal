from rest_framework import serializers
from .models import Project
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name')


class ProjectSerializer(serializers.ModelSerializer):
    # user = serializers.StringRelatedField(many=False)

    class Meta:
        model = Project
        fields = ('id', 'title', 'description')