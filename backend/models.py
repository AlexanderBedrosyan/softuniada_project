from django.core.validators import EmailValidator
from django.db import models
from .information.cities import information_cities

# Create your models here.


class Book(models.Model):
    title = models.CharField(max_length=150)
    author = models.CharField(max_length=100)

    def __str__(self):
        return f"'{self.title}', author: {self.author}"


class User(models.Model):
    CITIES = information_cities()

    username = models.CharField(max_length=100)
    email = models.EmailField(validators=[EmailValidator(message='Enter a valid email address.')])
    password = models.CharField(max_length=128)
    city = models.CharField(max_length=120, choices=CITIES, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username