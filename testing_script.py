import json
import os
from datetime import timedelta, date

import django
from django.contrib.auth.hashers import check_password
from django.db.models import Avg, Sum

# Set up Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "softuniada_project.settings")
django.setup()

# Import your models here


from backend.models import User, Rating

# Create queries within functions

# Avarage rating
# user = User.objects.get(username='Kaloqn')
# user1 = User.objects.get(username='Alexander')
# rating_instance = Rating.objects.create(rating=5)
# rating_instance.user.add(user1)
#
# user_rating = Rating.objects.filter(user=user1).first().average_rating(user1)
# print(user_rating)
# average_rating = user_rating.average_rating()
# print(f"{Rating.objects.filter(user=user).first()}")
# print(user_rating.user.all())
# print(average_rating)
Rating.objects.all()
