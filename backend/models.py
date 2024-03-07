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

    def __str__(self):
        return f"{self.username}"

class Rating(models.Model):

    user = models.ManyToManyField(to=User)
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )

    def average_rating(self):
        votes_count = Rating.objects.filter(user=self.user.first()).count()
        total_rating_sum = Rating.objects.filter(user=self.user.first()).aggregate(Sum('rating'))['rating__sum'] or 0
        rating = total_rating_sum / votes_count
        return rating

    def __str__(self):
        return f"Average Rating for User: {self.average_rating():.2f}"

