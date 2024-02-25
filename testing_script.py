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
    all_usernames = User.objects.values_list('username', flat=True)
    if 'Pesho' in all_usernames:
        user = User.objects.get(username='Pesho')
        if check_password('BunaciBunaci*', user.password):
            print('Ima q')
        else:
            print('Nema q')

test_validator()
