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
    picture = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.username}"


class Rating(models.Model):

    user = models.ManyToManyField(User, through='Voter', related_name='ratings', through_fields=('voted_user', 'voter'))
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )

    def average_rating(self, user):
        all_ratings = Rating.objects.filter(user=user)
        total_rating_sum = sum(rating.rating for rating in all_ratings)
        votes_count = all_ratings.count()
        average_rating = total_rating_sum / votes_count if votes_count > 0 else 0
        # all_users = self.user.through
        # ratings_by_user = all_users.objects.filter(user=self)
        # voters = [rating.user for rating in ratings_by_user]
        #
        # votes_count = Rating.objects.filter(user=self.user.first()).count()
        # total_rating_sum = Rating.objects.filter(user=self.user.first()).aggregate(Sum('rating'))['rating__sum'] or 0
        # rating = total_rating_sum / votes_count
        return average_rating

    def __str__(self):
        return f"Average Rating for User: {3:.2f}"


class Voter(models.Model):
    voter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='voters')
    voted_user = models.ForeignKey(Rating, on_delete=models.CASCADE, related_name='voted_users')
    id_voted_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='id_voted_user')
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
