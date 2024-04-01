# import json
# import os
# from datetime import timedelta, date
#
# import django
# from django.contrib.auth.hashers import check_password
# from django.db.models import Avg, Sum
#
# # Set up Django
# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "softuniada_project.settings")
# django.setup()
#
# # Import your models here
#
#
# from backend.models import User, Rating, Voter
#
# users = User.objects.all()
# array_with_users = []
# for user in users:
#     current_obj = {}
#     current_obj['name'] = user.username
#     current_obj['city'] = user.city if user.city else 'Missing'
#     current_obj['email'] = user.email
#     current_obj['description'] = user.description if user.description else 'Missing'
#     current_obj['picture'] = user.picture if user.picture else 'Missing'
#     array_with_users.append(current_obj)
#
# print(type(json.dumps(array_with_users)))
#
# # Create queries within functions
#
# Avarage rating
# Rating.objects.all().delete()
#
# user = User.objects.get(username='Kaloqn')
# user1 = User.objects.get(username='Alexander')
# user2 = User.objects.get(username='Dragomir')
#
#
# rating_instance = Rating.objects.create(rating=3)
# rating_instance2 = Rating.objects.create(rating=4)
#
# Voter.objects.create(voter=user1, voted_user=rating_instance, id_voted_user=user, rating=rating_instance.rating)
# Voter.objects.create(voter=user2, voted_user=rating_instance2, id_voted_user=user, rating=rating_instance2.rating)
#
#
#
# all_ratings = Rating.objects.filter(user=user)
# print(all_ratings)
#
# rating_instance = Rating.objects.create(rating=5)
# rating_instance.user.add(user1)
#
# user_rating = Rating.objects.filter(user=user1).first().average_rating(user1)
# print(user_rating)
# average_rating = user_rating.average_rating()
# print(f"{Rating.objects.filter(user=user).first()}")
# print(user_rating.user.all())
# print(average_rating)

