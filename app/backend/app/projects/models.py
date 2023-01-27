from django.db import models

class Project(models.Model):
    title = models.CharField("Название проекта", max_length=128, default="")
    description = models.TextField("Описание")
    