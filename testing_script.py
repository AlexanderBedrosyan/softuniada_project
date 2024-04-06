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


from backend.models import User
from backend.views import Rating



# Create queries within functions



