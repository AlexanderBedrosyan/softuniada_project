import os
from datetime import timedelta, date

import django

# Set up Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "softuniada_project.settings")
django.setup()

# Import your models here


from backend.models import User


# Create queries within functions


def test_validator():
    emails = User.objects.values_list('email', flat=True)
    print(emails)
    print('kaloqn@abv.bg' in emails)
    print('Bunaci' in emails)
    # users = User.objects.all()
    # emails = [user.email for user in users]
    # print(emails)

test_validator()
