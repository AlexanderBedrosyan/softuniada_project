import json
import os
from datetime import timedelta, date

import django
from django.contrib.auth.hashers import check_password

# Set up Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "softuniada_project.settings")
django.setup()

# Import your models here


from backend.models import User


# Create queries within functions


def test_validator():
    data = {'message': 'Email is already used'}
    print(json.dumps(data))

test_validator()
