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

user = User.objects.get(username='Kaloqn')
# rating_instance = Rating.objects.create(rating=3)
# rating_instance.user.add(user)
#
# user_rating = Rating.objects.filter(user=user).first()
# average_rating = user_rating.average_rating()
print(f"{Rating.objects.filter(user=user).first()}")
