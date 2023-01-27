from django import forms
from django.contrib import admin
from .models import Project


class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        # fields = []
        exclude = []

@admin.register(Project)
class ProjectModelAdmin(admin.ModelAdmin):
    form = ProjectForm