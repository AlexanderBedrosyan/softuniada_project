from django.core.validators import EmailValidator
from django.db import models
from django.db.models import Avg, Sum

from .information.cities import information_cities
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.


class Book(models.Model):
    title = models.CharField(max_length=150)
    author = models.CharField(max_length=100)

    def __str__(self):
        return f"'{self.title}', author: {self.author}"


class User(models.Model):
    CITIES = information_cities()

    username = models.CharField(max_length=100)
    email = models.EmailField(validators=[EmailValidator(message='Enter a valid email address.')], unique=True)
    password = models.CharField(max_length=128)
    city = models.CharField(max_length=120, choices=CITIES, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    picture = models.TextField(blank=True, null=True, default='https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg')
    rating = models.IntegerField(blank=True, null=True)
    voters = models.TextField(blank=True, null=True)

    def avg_rating(self):
        all_voters = 0
        if self.voters:
            all_voters = len(self.voters.split(',')) - 1

        if all_voters > 0 and self.rating > 0:
            return round(self.rating / all_voters)
        return 0

    def __str__(self):
        return f"{self.username}"

