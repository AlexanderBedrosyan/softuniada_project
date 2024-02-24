from django.core.validators import EmailValidator
from django.db import models

# Create your models here.


class Book(models.Model):
    title = models.CharField(max_length=150)
    author = models.CharField(max_length=100)


class User(models.Model):

    username = models.CharField(max_length=100)
    email = models.EmailField(validators=[EmailValidator(message='Enter a valid email address.')])
    password = models.CharField(max_length=128)

